import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import AddEventModal from "../components/AddEventModal";
import Notifications from "../components/Notifications";
import { addNotificationGlobal } from "../utils/notifyBus";
import NotificationForm from "../components/NotificationForm";
import { deleteEvent, fetchEvents } from "../utils/api";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await fetchEvents();
    setEntries(data);
  }

  async function handleDelete(id) {
    try {
      await deleteEvent(id);
      addNotification("Event deleted");
      loadEvents();
    } catch (e) {
      addNotification("Failed to delete event");
    }
  }

  function addNotification(msg) {
    setNotifications((prev) => [...prev, { id: Date.now(), msg }]);
    addNotificationGlobal(msg);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  }

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Your Events</h2>

          <button
            onClick={() => setShowModal(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>

        <EventList
          entries={entries}
          onView={(id) => navigate(`/dashboard/details/${id}`)}
          onDelete={handleDelete}
        />
      </div>

      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-md shadow">
        <NotificationForm
          events={entries}
          onSent={loadEvents}
          onNotify={addNotification}
        />
      </div>

      <AddEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={loadEvents}
        onNotify={addNotification}
      />

      <Notifications list={notifications} />
    </>
  );
};
