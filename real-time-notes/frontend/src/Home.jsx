import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room.trim()) {
      navigate(`/room/${room}`);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Real-Time Notes</h2>
      <input
        type="text"
        placeholder="Enter room name..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="border p-2 mt-3"
      />
      <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Join Room
      </button>
    </div>
  );
};

export default Home;
