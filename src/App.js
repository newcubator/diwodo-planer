import "./App.css";
import icsToJson from "./lib/icsToJson";
import React, { useState, useEffect } from "react";
import Event from "./components/Event";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const icsRes = await fetch("https://eh9ecze6ae.execute-api.eu-central-1.amazonaws.com/dev/diwodo-ical-proxy");
      const icsData = await icsRes.text();
      const data = icsToJson(icsData);
      const events = data.map((entry) => ({
        isFavorite: isFavorite(entry.url),
        ...entry,
      }));

      // console.log(events);
      setEvents(events);
    }
    fetchData();
  }, []);

  const toggleFavorite = (url) => {
    console.log(`Toggle favorite '${url}'`);

    const currentState = window.localStorage.getItem(url);
    if (currentState) {
      window.localStorage.removeItem(url);
    } else {
      window.localStorage.setItem(url, "true");
    }

    updateEvents();
  };

  const updateEvents = () => {
    setEvents(
      events.map((event) => {
        event.isFavorite = isFavorite(event.url);
        return event;
      })
    );
  };

  const isFavorite = (url) => {
    return !!window.localStorage.getItem(url);
  };

  return (
    <div id="app">
      <header>
        <img src="/logo.svg" />
        <h1>Diwodo Planer</h1>
      </header>
      <main>
        {events.map((event, i) => (
          <Event {...event} toggleFavorite={toggleFavorite} key={i} />
        ))}
      </main>
    </div>
  );
}

export default App;
