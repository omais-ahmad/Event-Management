import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddEventModal } from "../components/AddEventModal";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <>
      <div
        className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow"
        style={{
          boxShadow: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
        }}
      >
        <h2 className="text-lg font-bold mb-4 font-gray-900">Your Events</h2>

        <table
          className="w-full table-auto text-sm rounded-lg"
          style={{
            boxShadow: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
          }}
        >
          <thead>
            <tr className="text-left border-b border-gray-200 bg-gray-50 ">
              <th className="p-3 w-[100px] ">ID #</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">DESCRIPTION</th>
              <th className="p-3">DATE</th>
              <th className="p-3">TIMEZONE</th>
              <th className="p-3">IMAGE</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((events, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-3 bg-gray-50">{events.id}</td>
                <td className="p-3">{events.title}</td>
                <td className="p-3">{events.description}</td>
                <td className="p-3">{events.date}</td>
                <td className="p-3">{events.timezone}</td>
                <td className="p-3">{events.image}</td>
                <td className="p-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedEntry(events);
                      setShowModal(true);
                    }}
                  >
                    Create
                  </button>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      navigate(`/dashboard/details/${events.id}`);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        entry={selectedEntry}
        onAdd={(data) => {
          const updated = entries.map((entry) =>
            entry === selectedEntry
              ? {
                  ...entry,
                  ...data,
                  action: "View",
                  status: deriveStatusFromHours(data.hours),
                }
              : entry
          );
          setEntries(updated);
          setShowModal(false);
        }}
      />
    </>
  );
};
