import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/API";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

interface Booking {
  roomId: {
    roomType: string;
    price: number;
  };
  totalGuests: number;
  checkIn: string;
  checkOut: string;
  status: "pending" | "confirmed" | "cancelled";
  _id: string;
}

export const Dashboard = () => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading , setLoading] = useState<boolean>(true);

  // 📌 Calculate days between checkin & checkout
  const calculateDays = (checkIn: string, checkOut: string) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return diff / (1000 * 60 * 60 * 24);
  };

  // 📌 Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/all-bookings`
      );

      if (res.data.success) {
        const bookings = res.data.bookings;

        setAllBookings(bookings);
        setTotalBookings(bookings.length);

        // 💰 Revenue calculation (price × days)
        const revenue = bookings.reduce(
          (total: number, booking: Booking) => {
            const days = calculateDays(
              booking.checkIn,
              booking.checkOut
            );

            return total + booking.roomId.price * days;
          },
          0
        );

        setTotalRevenue(revenue);
      } else {
        toast.error(res.data.message);
      }
    } catch (error:any) {
      toast.error(error.message);
    } finally{
      setLoading(false)
    }
  };

  // 📌 Update booking status
  const updateBookingStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/update-booking-status/${id}`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchBookings();
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

   if(loading){
    return <div className="w-full h-screen flex items-center justify-center">
              <Loader/>
          </div>
   }

  return (
    <div className="sm:px-20 px-3 mt-10">
      {/* HEADER */}
      <h1 className="font-bold text-3xl bg-linear-to-r from-cyan-300 via-purple-400 to-green-600 text-transparent bg-clip-text">
        Dashboard
      </h1>

      <p className="pt-4 text-gray-600">
        Monitor your room listings, track bookings and analyze revenue.
      </p>

      {/* STATS */}
      <div className="flex sm:flex-row flex-col gap-5 mt-10">
        <div className="bg-blue-50 px-4 py-2 w-60 border border-blue-500">
          <h1 className="font-bold text-blue-600">
            Total Bookings
          </h1>
          <p className="text-gray-600">{totalBookings}</p>
        </div>

        <div className="bg-blue-50 px-4 py-2 w-60 border border-blue-500">
          <h1 className="font-bold text-blue-600">
            Total Revenue
          </h1>
          <p className="text-gray-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* TABLE TITLE */}
      <h1 className="font-bold mt-10 text-3xl bg-linear-to-r from-cyan-300 via-purple-400 to-green-600 text-transparent bg-clip-text">
        Recent Bookings
      </h1>

      {/* TABLE */}
      <div className="w-full mt-5 overflow-x-auto pb-3">
        <table className="sm:min-w-[600px] w-full border border-gray-300 rounded-lg text-center">
          <thead className="border-b border-gray-300 bg-gray-100">
            <tr>
              <th className="p-2">Guests</th>
              <th className="p-2">Room Type</th>
              <th className="p-2">Price / Night</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {allBookings.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-300"
              >
                {/* Guests */}
                <td className="p-2">
                  {item.totalGuests}
                </td>

                {/* Room */}
                <td className="p-2">
                  {item.roomId?.roomType}
                </td>

                {/* Price */}
                <td className="p-2">
                  ${item.roomId?.price}
                </td>

                {/* STATUS */}
                <td className="p-2">
                  <span
                    className={
                      item.status === "confirmed"
                        ? "text-green-600 font-bold"
                        : item.status === "cancelled"
                        ? "text-red-600 font-bold"
                        : "text-yellow-600 font-bold"
                    }
                  >
                    {item.status}
                  </span>

                  {/* Dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateBookingStatus(
                        item._id,
                        e.target.value
                      )
                    }
                    className="ml-2 border px-2 py-1 rounded"
                  >
                    <option value="pending">
                      Pending
                    </option>
                    <option value="confirmed">
                      Confirmed
                    </option>
                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};