import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import AuthenticationRequestDTO from './../../api/dto/request/authentication/AuthenticationRequestDTO';

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  const { isLoading, data } = useApiMutation(APIEndpoint.LOGIN, new AuthenticationRequestDTO("admin", "admin"), {
    queryKey: "token"
  });
  
  const result = isLoading ? "Loading..." : JSON.stringify(data);

  return (
    <>
      <h2>Home</h2>
      <p>{result}</p>
    </>
  );
}
