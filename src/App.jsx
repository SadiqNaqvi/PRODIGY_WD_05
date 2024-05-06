import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import WelcomePage from "./Pages/WelcomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {

  const [location, setLocation] = useState();

  const getIPAddress = () => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => getLocationFromIP(data.ip))
      .catch(error => {
        console.error('Error fetching IP:', error);
      });
  }

  const getLocationFromIP = (ip) => {
    fetch(`http://www.geoplugin.net/json.gp?ip=${ip}&json`)
      .then(res => res.json())
      .then(resp => setLocation(resp.geoplugin_city))
      .catch(err => console.log(err));
  }

  useEffect(getIPAddress, []);


  return (
    <BrowserRouter>
      <main className="h-full w-full flex bg-gray-900">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage location={location} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}