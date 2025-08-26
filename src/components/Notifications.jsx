export default function Notifications({ list }) {
  return (
    <div className="fixed top-4 right-4 space-y-2">
      {list.map((n) => (
        <div
          key={n.id}
          className="bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded shadow"
        >
          {n.msg}
        </div>
      ))}
    </div>
  );
}
