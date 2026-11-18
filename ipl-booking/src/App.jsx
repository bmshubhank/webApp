
import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Sample match data
  const matches = [
    {
      id: 1,
      team1: "Chennai Super Kings",
      team2: "Mumbai Indians",
      date: "20 April 2026",
      time: "7:30 PM",
      venue: "M. A. Chidambaram Stadium",
      general: 500,
      premium: 1200,
      vip: 2500
    },
    {
      id: 2,
      team1: "Royal Challengers Bengaluru",
      team2: "Kolkata Knight Riders",
      date: "22 April 2026",
      time: "7:30 PM",
      venue: "M. Chinnaswamy Stadium",
      general: 600,
      premium: 1500,
      vip: 3000
    },
    {
      id: 3,
      team1: "Rajasthan Royals",
      team2: "Sunrisers Hyderabad",
      date: "24 April 2026",
      time: "3:30 PM",
      venue: "Sawai Mansingh Stadium",
      general: 400,
      premium: 1000,
      vip: 2200
    },
    {
      id: 4,
      team1: "Delhi Capitals",
      team2: "Punjab Kings",
      date: "26 April 2026",
      time: "7:30 PM",
      venue: "Arun Jaitley Stadium",
      general: 500,
      premium: 1300,
      vip: 2800
    }
  ];

  function handleBook(match) {
    setSelectedMatch(match);

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  return (
    <>
      <Navbar />

      <Hero />

      <main>
        <section id="matches" className="matches-section">
          <h2>IPL 2026 Match Schedule</h2>

          <div className="match-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onBook={handleBook}
              />
            ))}
          </div>
        </section>

        <BookingForm selectedMatch={selectedMatch} />

        <section id="guidelines">
          <h2>Booking Guidelines</h2>
          <p>Select a match, choose your preferred stand, and confirm your booking.</p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
