import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RoomComp from "./pages/RoomComp";
import HomeComp from "./pages/HomeComp";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-center items-center gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/room">room</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeComp />}></Route>
          <Route path="/room" element={<RoomComp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
