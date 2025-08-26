import { DateTime } from "luxon";

export default function EventDetails({ event }) {
  if (!event) return null;

  const localTime = DateTime.fromISO(event.date, { zone: "utc" })
    .setZone(event.timezone)
    .toFormat("ff");

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <p>{event.description}</p>
      <p>
        <strong>When:</strong> {localTime} ({event.timezone})
      </p>
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="mt-2 max-h-48 rounded object-cover"
        />
      )}
    </div>
  );
}
