import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RoomComp from './pages/RoomComp';
import HomeComp from './pages/HomeComp';
import UsageComp from './pages/UsageComp';
import EduComp from './pages/EduComp';
import EquipComp from './pages/EquipComp';
import EduTwoComp from './pages/EduTwoComp';
import EquipTwoComp from './pages/EquipTwoComp';
import RoomTwoComp from './pages/RoomTwoComp';

function App() {
  return (
    <>
      <div className="container mx-auto h-full relative px-6 py-6">
        <nav className="absolute right-0 z-10 hidden">
          <ul className="flex justify-center items-center gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/room">room</Link>
            </li>
            <li>
              <Link to="/equip">equip</Link>
            </li>
            <li>
              <Link to="/usage">usage</Link>
            </li>
            <li>
              <Link to="/edu">edu</Link>
            </li>
            <li>
              <Link to="/equip1">equip1</Link>
            </li>
            <li>
              <Link to="/room1">room1</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeComp />}></Route>
          <Route path="/room" element={<RoomComp />}></Route>
          <Route path="/equip" element={<EquipComp />}></Route>
          <Route path="/usage" element={<UsageComp />}></Route>
          <Route path="/edu" element={<EduComp />}></Route>
          <Route path="/equip1" element={<EquipTwoComp />}></Route>
          <Route path="/room1" element={<RoomTwoComp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
