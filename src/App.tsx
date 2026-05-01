import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen w-full">
        <AppRoutes />
      </div>
    </HashRouter>
  );
}

export default App;
