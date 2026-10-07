export default function EmptyState({ icon = "🔍", title, message, action }) {
  return (
    <div className="state">
      <span className="state-icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
