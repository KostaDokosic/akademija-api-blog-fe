import UserProvider from "./provider/UserProvider";
import Router from "./router";

export default function App() {
  return (
    <UserProvider>
      <Router />;
    </UserProvider>
  );
}
