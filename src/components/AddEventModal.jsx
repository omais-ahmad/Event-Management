import { useState } from "react";
import { createEvent } from "../utils/api";
import { DateTime } from "luxon";

export default function AddEventModal({
  isOpen,
  onClose,
  onCreated,
  onNotify,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dt = DateTime.fromISO(`${date}T${time}`, { zone: timezone });
      const utcDate = dt.toUTC().toISO();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", utcDate);
      formData.append("timezone", timezone);
      if (image) formData.append("image", image);

      await createEvent(formData);

      onNotify("Event created successfully");
      onCreated();
      onClose();
    } catch {
      onNotify("Error creating event");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[400px] space-y-3"
      >
        <h2 className="font-semibold text-lg">Create Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
        </div>

        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="border p-2 w-full rounded"
        >
          {Intl.supportedValuesOf("timeZone").map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
