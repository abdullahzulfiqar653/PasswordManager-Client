import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
