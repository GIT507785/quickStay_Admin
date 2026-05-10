import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/API";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

interface Room {
  _id: string;
  name: string;
  amenities: string;
  price: number;
  status: string;
  roomType: string;
  priceOff: number;
  isAvailable: boolean;
}

const ListRoom: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  // ✅ Fetch Rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/get-all-rooms`
      );

      if (res.data.success) {
        setRooms(res.data.rooms);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Room
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/admin/delete-room/${id}`
      );

      if (res.data.success) {
        setRooms((prev) =>
          prev.filter((room) => room._id !== id)
        );

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ✅ Toggle Availability
  const toggleRoom = async (roomId: string) => {
    // Optimistic UI Update
    setRooms((prev) =>
      prev.map((room) =>
        room._id === roomId
          ? {
              ...room,
              isAvailable: !room.isAvailable,
            }
          : room
      )
    );

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/toggle-availability/${roomId}`
      );

      if (!res.data.success) {
        toast.error(res.data.message);

        // rollback
        fetchRooms();
      }
    } catch (error: any) {
      toast.error(error.message);

      // rollback
      fetchRooms();
    }
  };

  // ✅ Loading
  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        All Rooms
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-3">Room Type</th>
              <th className="border px-4 py-3">Facilities</th>
              <th className="border px-4 py-3">Price</th>
              <th className="border px-4 py-3">Price Off</th>
              <th className="border px-4 py-3">Delete</th>
              <th className="border px-4 py-3">Available</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id} className="text-center">
                  <td className="border px-4 py-3">
                    {room.roomType}
                  </td>

                  <td
                    className="border px-4 py-3"
                    dangerouslySetInnerHTML={{
                      __html: room.amenities,
                    }}
                  />

                  <td className="border px-4 py-3">
                    ${room.price}
                  </td>

                  <td className="border px-4 py-3">
                    ${room.priceOff}
                  </td>

                  <td className="border px-4 py-3">
                    <button
                      onClick={() =>
                        handleDelete(room._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>

                  {/* ✅ Toggle Switch */}
                  <td className="border px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={room.isAvailable}
                        onChange={() =>
                          toggleRoom(room._id)
                        }
                        className="sr-only peer"
                      />

                      {/* Track */}
                      <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-300"></div>

                      {/* Circle */}
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No Rooms Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;