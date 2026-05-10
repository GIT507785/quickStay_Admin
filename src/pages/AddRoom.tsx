import axios from "axios";
import { UploadCloudIcon } from "lucide-react";
import React, { useState } from "react";
import { API_BASE_URL } from "../constants/API";
import { toast } from "react-toastify";

interface Amenities {
  wifi: boolean;
  ac: boolean;
  tv: boolean;
  minibar: boolean;
  roomService: boolean;
}

interface RoomInput {
  roomType: string;
  price: string;
  priceOff:string
  amenities: Amenities;
}

const AddRoom = () => {
  const [images, setImages] = useState<{ [key: number]: File }>({});

  const [input, setInput] = useState<RoomInput>({
    roomType: "",
    price: "",
    priceOff:"",
    amenities: {
      wifi: false,
      ac: false,
      tv: false,
      minibar: false,
      roomService: false,
    },
  });

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstImage = Object.values(images)[0];

    if (!firstImage) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("roomType", input.roomType);
    formData.append("price", input.price);
    formData.append("amenities", JSON.stringify(input.amenities));
    formData.append("image", firstImage);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/add-room`,
        formData
      );

      if (res.data.success) {
        toast.success("Room Added Successfully");
         console.log(res.data)  
        // reset form
        setInput({
          roomType: "",
          price: "",
          priceOff:"",
          amenities: {
            wifi: false,
            ac: false,
            tv: false,
            minibar: false,
            roomService: false,
          },
        });

        setImages({});
      } else {
        toast.error(res.data.message || "Failed to add room");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:px-20 px-4 mt-10">
        <h1 className="text-3xl font-bold font-serif">Add Room</h1>

        {/* 🔥 Images */}
        <h2 className="mt-6 text-xl font-semibold">Upload Images</h2>

        <div className="flex mt-10 gap-4 flex-wrap">
          {[0, 1, 2, 3].map((item) => (
            <label
              key={item}
              htmlFor={`input-image-${item}`}
              className="cursor-pointer"
            >
              <input
                type="file"
                id={`input-image-${item}`}
                hidden
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    setImages((prev) => ({
                      ...prev,
                      [item]: files[0],
                    }));
                  }
                }}
              />

              <div className="flex items-center justify-center w-32 h-20 bg-gray-100 border border-gray-400 rounded-lg hover:bg-gray-200 transition">
                {images[item] ? (
                  <img
                    src={URL.createObjectURL(images[item])}
                    alt="preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <UploadCloudIcon className="text-gray-500" />
                )}
              </div>
            </label>
          ))}
        </div>

        {/* 🔥 Room Type & Price */}
        <div className="mt-8 flex gap-4 flex-wrap">
          <select
            className="px-3 py-2 border rounded"
            value={input.roomType}
            onChange={(e) =>
              setInput({ ...input, roomType: e.target.value })
            }
          >
            <option value="">Select Room Type</option>
            <option value="single">Single Bed</option>
            <option value="double">Double Bed</option>
            <option value="family">Family Room</option>
          </select>
            
           <input type="number" className="border border-gray-400 px-3 py-2 rounded outline-none" placeholder="price off"
             value={input.priceOff}

            onChange={(e)=>setInput({...input , priceOff:e.target.value})} />  
            


          <input
            type="number"
            placeholder="Price per night"
            className="px-3 py-2 border rounded"
            value={input.price}
            onChange={(e) =>
              setInput({ ...input, price: e.target.value })
            }
          />
        </div>

        {/* 🔥 Amenities */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Amenities</h2>

          {Object.keys(input.amenities).map((key) => (
            <div key={key} className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={input.amenities[key as keyof Amenities]}
                onChange={(e) =>
                  setInput({
                    ...input,
                    amenities: {
                      ...input.amenities,
                      [key]: e.target.checked,
                    },
                  })
                }
              />
              <label className="capitalize">{key}</label>
            </div>
          ))}
        </div>

        {/* 🔥 Submit */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full mt-6 hover:bg-blue-700 transition">
          Add Room
        </button>
      </div>
    </form>
  );
};

export default AddRoom;