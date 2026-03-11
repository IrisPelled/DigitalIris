import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./app/HomePage";
import ContactPage from "./app/ContactPage";
import RegisteredUsersPage from "./app/RegisteredUsersPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/registrants" element={<RegisteredUsersPage />} />
        <Route path="/registered-users" element={<Navigate to="/registrants" replace />} />
        <Route path="/login" element={<Navigate to="/registrants" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
