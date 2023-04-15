import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import routes from "./components/routes/Routes";
import "./App.css";
const App = () => {
  return useRoutes(routes);
};

export default App;
