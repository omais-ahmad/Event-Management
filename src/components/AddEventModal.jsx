import { useEffect, useState } from "react";

export const AddEventModal = ({ isOpen, onClose, entry, onAdd }) => {
  const [project, setProject] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("Bug fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(12);

  useEffect(() => {
    if (isOpen && entry) {
      setProject("");
      setTypeOfWork("Bug fixes");
      setDescription("");
      setHours(12);
    }
  }, [isOpen, entry]);

  const handleAddEntry = () => {
    const newData = { project, typeOfWork, description, hours };
    onAdd(newData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:w-[646px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#111928]">
            Add New Entry
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#111928]">
              Select Project *
            </label>
            <select
              className="w-full border border-gray-300 text-sm rounded-lg px-3 py-2 text-gray-500 font-normal"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="">Project Name</option>
              <option value="Project A">Project A</option>
              <option value="Project B">Project B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#111928]">
              Type of Work *
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 text-sm font-normal"
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
            >
              <option value="Bug fixes">Bug fixes</option>
              <option value="Feature development">Feature development</option>
              <option value="Code review">Code review</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#111928]">
              Task description *
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg  px-3 py-2 max-h-24 text-gray-500 text-sm font-normal "
              placeholder="Write text here ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">A note for extra info</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#111928]">
              Hours *
            </label>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg w-fit">
              <button
                className="px-2 py-1 bg-gray-100 rounded-l-lg border border-gray-300"
                onClick={() => setHours((prev) => Math.max(0, prev - 1))}
              >
                –
              </button>
              <span className="px-3 text-gray-500 text-sm font-normal">
                {hours}
              </span>
              <button
                className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-lg"
                onClick={() => setHours((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-6 space-x-2">
          <button
            onClick={handleAddEntry}
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700"
          >
            Add entry
          </button>
          <button
            onClick={onClose}
            className="w-1/2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
