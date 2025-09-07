import './App.css';
import ShlokaForm from "./components/shlokaForm";
import ShlokaViewer from "./components/ShlokaViewer";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />

        <Routes>
          <Route path="/" element={<h2 className="welcome-heading">Welcome to 📜 Dasoasmi</h2>} />
          {/* <Route path="/" element={<h2 className="welcome-heading">Welcome to 🕉️ Dasoasmi</h2>} /> */}
          <Route path="/add-shloka" element={<ShlokaForm />} />
          <Route path="/view-shlokas" element={<ShlokaViewer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
