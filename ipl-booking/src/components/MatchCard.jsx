
function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <span className="match-no">
        Match {match.id}
      </span>

      <h3>{match.team1} vs {match.team2}</h3>

      <p>
        <strong>Date:</strong> {match.date}
      </p>

      <p>
        <strong>Venue:</strong> {match.venue}
      </p>

      <h4>Ticket Details</h4>

      <ul className="price-list">
        <li>Ticket Price: ₹{match.price}</li>
        <li>Available Seats: {match.available_seats}</li>
      </ul>

      <button
        type="button"
        onClick={() => onBook(match)}
        disabled={match.available_seats <= 0}
      >
        {match.available_seats <= 0 ? "Sold Out" : "Book Now"}
      </button>
    </div>
  );
}

export default MatchCard;
