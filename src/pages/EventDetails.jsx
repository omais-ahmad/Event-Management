import { useState } from "react";

export const EventDetails = () => {
  const [entries, setEntries] = useState([]);
  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-6 mt-4 rounded-[8px] bg-white shadow">
        {/* Header */}
        <h2 className="font-bold text-[24px] text-[#111928]">
          This week’s timesheet
        </h2>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
