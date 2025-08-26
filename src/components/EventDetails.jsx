import { DateTime } from "luxon";

export default function EventDetails({ event }) {
  if (!event) return null;

  const localTime = DateTime.fromISO(event.date, { zone: "utc" })
    .setZone(event.timezone)
    .toFormat("ff");

  return (
    <div className="p-4 max-w-5xl mx-auto mt-8 bg-white p-6 rounded-md shadow">
      <h3 className="font-bold text-lg mb-2">Event: {event.title}</h3>
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
