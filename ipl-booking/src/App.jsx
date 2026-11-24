
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import { getSupabaseClient } from "./supabase";

import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedMatch =
    matches.find((match) => match.id === selectedMatchId) || null;

  // Fetch matches from Supabase
  const fetchMatches = useCallback(async () => {
    try {
      const { data, error } = await getSupabaseClient()
        .from("matches")
        .select("*")
        .order("id");

      if (error) throw error;

      setMatches(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and realtime subscription
  useEffect(() => {
    const supabase = getSupabaseClient();

    fetchMatches();

    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches"
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMatches]);

  function handleBook(match) {
    setSelectedMatchId(match.id);

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

          {loading && <p>Loading matches...</p>}

          {error && (
            <p className="booking-status error">
              {error}
            </p>
          )}

          {!loading && !error && matches.length === 0 && (
            <p>No matches available.</p>
          )}

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

        <BookingForm
          selectedMatch={selectedMatch}
          onBookingSuccess={fetchMatches}
        />

        <section id="guidelines">
          <h2>Booking Guidelines</h2>
          <p>
            Select a match, choose the number of tickets,
            and confirm your booking.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
