import { useState } from "react";

function BookingForm({ selectedMatch }) {
  const [name, setName] = useState("");
  const [stand, setStand] = useState("general");
  const [tickets, setTickets] = useState(1);

  const price = selectedMatch
    ? Number(selectedMatch[stand])
    : 0;

  const total = price * Number(tickets);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedMatch) {
      alert("Please select a match first!");
      return;
    }

    alert(
      `Booking Successful!\nName: ${name}\nMatch: ${selectedMatch.team1} vs ${selectedMatch.team2}\nTotal: ₹${total}`
    );

    setName("");
    setStand("general");
    setTickets(1);
  }

  return (
    <section id="booking">
      <h2>Book Your Tickets</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Select Match:</label>
        <input
          type="text"
          value={
            selectedMatch
              ? `${selectedMatch.team1} vs ${selectedMatch.team2}`
              : "Please select a match"
          }
          readOnly
        />

        <label>Select Stand:</label>
        <select
          value={stand}
          onChange={(e) => setStand(e.target.value)}
        >
          <option value="general">General</option>
          <option value="premium">Premium</option>
          <option value="vip">VIP</option>
        </select>

        <label>Number of Tickets:</label>
        <input
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
          <h3>Total Amount: ₹{total}</h3>
        </div>

        <button type="submit" disabled={!selectedMatch}>
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

export default BookingForm;