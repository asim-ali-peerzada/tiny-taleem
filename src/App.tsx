import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
