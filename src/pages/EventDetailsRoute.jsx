import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails";
import { fetchEventById } from "../utils/api";

export default function EventDetailsRoute() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchEventById(id);
      setEvent(data);
    }
    load();
  }, [id]);

  if (!event) return <p className="p-4">Loading...</p>;

  return <EventDetails event={event} />;
}
