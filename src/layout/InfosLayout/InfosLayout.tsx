/**
 * Layout adding a home button when the route isn't "/".
 */
export function InfosLayout() {
  return (
    <>
      {
        localStorage.getItem("token") !== null &&
        <p>{localStorage.getItem("token")}</p>
      }
    </>
  )
}