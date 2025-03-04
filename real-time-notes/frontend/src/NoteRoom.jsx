import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "./socket";
import axios from "axios";

const NoteRoom = () => {
  const { roomId } = useParams();
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join_room", roomId);

    // Fetch the existing note
    axios.get(`http://localhost:5000/notes/${roomId}`).then((res) => {
      setNote(res.data.content);
    });

    socket.on("receive_update", (content) => {
      setNote(content);
    });

    socket.on("update_users", (userList) => {
      setUsers(userList);
    });

    socket.on("user_joined", (msg) => {
      setNotification(msg);
      setTimeout(() => setNotification(""), 3000);
    });

    socket.on("user_left", (msg) => {
      setNotification(msg);
      setTimeout(() => setNotification(""), 3000);
    });

    return () => {
      socket.off("receive_update");
      socket.off("update_users");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, [roomId]);

  const handleChange = (e) => {
    setNote(e.target.value);
    setSaved(false);
    socket.emit("update_note", { room: roomId, content: e.target.value });
  };

  const saveNote = () => {
    axios.post("http://localhost:5000/notes", { room: roomId, content: note }).then(() => {
      setSaved(true);
    });
  };

  const deleteNote = () => {
    axios.delete(`http://localhost:5000/notes/${roomId}`).then(() => {
      setNote("");
      setSaved(false);
      navigate("/");
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Room: {roomId}</h2>

      {notification && <p className="text-blue-500">{notification}</p>}

      <div className="mb-3">
        <h3 className="text-lg font-bold">Online Users:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="text-green-600">
              {user}
            </li>
          ))}
        </ul>
      </div>

      <textarea
        className="w-full h-60 p-2 border"
        value={note}
        onChange={handleChange}
      />

      <div className="mt-3 flex gap-2">
        <button onClick={saveNote} className="bg-green-500 text-white px-4 py-2">
          Save Note
        </button>
        <button onClick={deleteNote} className="bg-red-500 text-white px-4 py-2">
          Delete Note
        </button>
      </div>

      {saved && <p className="text-green-600 mt-2">Note saved successfully!</p>}
    </div>
  );
};

export default NoteRoom;
