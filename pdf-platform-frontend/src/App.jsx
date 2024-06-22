
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from './pages/admin/AdminPanel'
import UserPanel from "./pages/user/UserPanel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/user" element={<UserPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

