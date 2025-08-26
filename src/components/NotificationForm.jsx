import { useState } from "react";
import { sendNotification } from "../utils/api";

export default function NotificationForm({ events, onSent, onNotify }) {
  const [eventId, setEventId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!eventId || !message) return;
    try {
      setLoading(true);
      await sendNotification({ message, eventId });
      onNotify?.("Notification sent");
      setMessage("");
      setEventId("");
      onSent?.();
    } catch (e) {
      onNotify?.("Failed to send notification");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white space-y-2">
      <h3 className="font-semibold">Send Notification</h3>
      <select
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="border border-gray-200 rounded-md p-3 hover:shadow-sm bg-white w-full"
      >
        <option value="">Select event…</option>
        {events.map((ev) => (
          <option key={ev.id || ev._id} value={ev.id || ev._id}>
            {ev.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="border border-gray-200 rounded-md p-3 hover:shadow-sm bg-white w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full items-center justify-center text-sm border border-gray-200 rounded-md p-3 bg-white text-[#1A56DB] hover:shadow-sm hover:bg-[#E1EFFE]"
      >
        {loading ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
