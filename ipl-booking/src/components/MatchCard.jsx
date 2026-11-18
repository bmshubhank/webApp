function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <span className="match-no">Match {match.id}</span>

      <h3>{match.team1} vs {match.team2}</h3>

      <p><strong>Date:</strong> {match.date}</p>
      <p><strong>Time:</strong> {match.time}</p>
      <p><strong>Venue:</strong> {match.venue}</p>

      <h4>Ticket Prices</h4>

      <ul className="price-list">
        <li>General: ₹{match.general}</li>
        <li>Premium: ₹{match.premium}</li>
        <li>VIP: ₹{match.vip}</li>
      </ul>

      <button onClick={() => onBook(match)}>
        Book Now
      </button>
    </div>
  );
}

export default MatchCard;