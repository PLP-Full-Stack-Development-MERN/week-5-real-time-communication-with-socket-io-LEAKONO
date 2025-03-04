import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NoteRoom from "./NoteRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<NoteRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
