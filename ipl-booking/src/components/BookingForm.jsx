
import { useState } from "react";
import { getSupabaseClient } from "../supabase";

function BookingForm({ selectedMatch, onBookingSuccess }) {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const price = selectedMatch
    ? Number(selectedMatch.price)
    : 0;

  const total = price * Number(tickets);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!selectedMatch) {
      setStatus({
        type: "error",
        message: "Please select a match first."
      });
      return;
    }

    const ticketCount = Number(tickets);

    if (!name.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your name."
      });
      return;
    }

    if (
      !Number.isInteger(ticketCount) ||
      ticketCount < 1 ||
      ticketCount > 10
    ) {
      setStatus({
        type: "error",
        message: "Choose between 1 and 10 tickets."
      });
      return;
    }

    if (ticketCount > selectedMatch.available_seats) {
      setStatus({
        type: "error",
        message: "Not enough seats available."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await getSupabaseClient()
        .rpc("book_match", {
          p_match_id: selectedMatch.id,
          p_user_name: name.trim(),
          p_tickets: ticketCount
        });

      if (error) throw error;

      setStatus({
        type: "success",
        message: "Booking saved successfully!"
      });

      setName("");
      setTickets(1);

      if (onBookingSuccess) {
        await onBookingSuccess();
      }

    } catch (error) {
      setStatus({
        type: "error",
        message: `Booking could not be saved: ${error.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="booking">
      <h2>Book Your Tickets</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="booking-name">
          Name:
        </label>

        <input
          id="booking-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />

        <label htmlFor="booking-match">
          Select Match:
        </label>

        <input
          id="booking-match"
          type="text"
          value={
            selectedMatch
              ? `${selectedMatch.team1} vs ${selectedMatch.team2}`
              : "Please select a match"
          }
          readOnly
        />

        <label htmlFor="booking-tickets">
          Number of Tickets:
        </label>

        <input
          id="booking-tickets"
          type="number"
          min="1"
          max="10"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          required
        />

        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <p>Price per ticket: ₹{price}</p>

          <p>Number of tickets: {tickets}</p>

          <p>
            Available seats: {selectedMatch?.available_seats ?? 0}
          </p>

          <h3>Total Amount: ₹{total}</h3>
        </div>

        {status && (
          <p
            className={`booking-status ${status.type}`}
            role="status"
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={
            !selectedMatch ||
            isSubmitting ||
            selectedMatch.available_seats <= 0
          }
        >
          {isSubmitting ? "Saving..." : "Confirm Booking"}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
