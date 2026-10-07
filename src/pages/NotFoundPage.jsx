import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function NotFoundPage() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      message="The page you're looking for doesn't exist."
      action={<Link to="/" className="btn btn-primary">Go home</Link>}
    />
  );
}
