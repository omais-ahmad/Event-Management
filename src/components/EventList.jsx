export default function EventList({ entries, onView }) {
  return (
    <table className="w-full table-auto text-sm rounded-lg border">
      <thead>
        <tr className="text-left border-b border-gray-200 bg-gray-50">
          <th className="p-3">ID #</th>
          <th className="p-3">Title</th>
          <th className="p-3">Description</th>
          <th className="p-3">Date (UTC)</th>
          <th className="p-3">Timezone</th>
          <th className="p-3">Image</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((ev) => (
          <tr key={ev.id} className="border-b border-gray-100">
            <td className="p-3 bg-gray-50">{ev.id}</td>
            <td className="p-3">{ev.title}</td>
            <td className="p-3">{ev.description}</td>
            <td className="p-3">{ev.date}</td>
            <td className="p-3">{ev.timezone}</td>
            <td className="p-3">
              {ev.imageUrl ? (
                <img
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="h-10 w-10 object-cover rounded"
                />
              ) : (
                "—"
              )}
            </td>
            <td className="p-3">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onView(ev.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
