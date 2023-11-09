import { Link } from "react-router-dom";

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <Link to="/login">Login</Link>
    </>
  );
}
