import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import routes from "./components/routes/Routes";
const App = () => {
  return useRoutes(routes);
};

export default App;
