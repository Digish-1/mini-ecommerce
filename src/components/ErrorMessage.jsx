export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <span className="state-icon" aria-hidden="true">⚠️</span>
      <h2>Oops!</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
