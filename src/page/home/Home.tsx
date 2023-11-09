import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import AuthenticationRequestDTO from './../../api/dto/request/authentication/AuthenticationRequestDTO';
import { Link } from "react-router-dom";

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  const { isLoading, data, mutate } = useApiMutation(APIEndpoint.LOGIN, new AuthenticationRequestDTO("admin", "admin"));

  const result = isLoading ? "Loading..." : JSON.stringify(data);

  return (
    <>
      <h2>Home</h2>
      <p>{result}</p>
      <button onClick={() => mutate(null)}>click</button>
      <Link to="/login">Login</Link>
    </>
  );
}
