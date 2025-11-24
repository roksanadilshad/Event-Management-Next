"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

// Event interface
interface EventItem {
  _id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  imageUrl: string;
  userId?: string;
}

// Add Event Form component
function AddEventForm({ onAdd }: { onAdd: (event: EventItem) => void }) {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) return <p className="p-6">Checking authentication...</p>;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title,
           shortDesc,
            fullDesc,
             price,
              imageUrl ,
              userId: user.uid,
            }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to add event");
        return;
      }

      toast.success("Event added successfully!");

      // Clear form
      setTitle("");
      setShortDesc("");
      setFullDesc("");
      setPrice("");
      setImageUrl("");

      // Add new event to parent list
      onAdd(data.event);
      router.push("/items");
      
    } catch (err) {
      console.error(err);
      toast.error("Error adding event");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Full Description"
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

// Main Dashboard Page
export default function EventsDashboard() {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Auth protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.shortDesc.toLowerCase().includes(term) ||
        e.fullDesc.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((e) => e._id !== id));
      setFilteredEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  if (checkingAuth) return <p className="p-6">Checking authentication...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">All Events</h1>
      <p className="text-gray-600 mb-4">Manage your events</p>

      {/* Add Event Form */}
      <AddEventForm onAdd={(newEvent) => {
        setEvents((prev) => [...prev, newEvent]);
        setFilteredEvents((prev) => [...prev, newEvent]);
      }} />

      {/* Search */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event._id} className="border rounded p-4 shadow">
            {event?.imageUrl && (
              <img
                src={event.imageUrl}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <h2 className="font-semibold mt-2">{event?.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{event.shortDesc}</p>
            <p className="font-semibold text-blue-600 mt-2">${event.price}</p>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/events/${event._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Details
              </Link>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No events found.</p>
      )}
    </div>
  );
}
