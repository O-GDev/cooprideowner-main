import { Toaster } from "../node_modules/react-hot-toast/dist/index"
import Sidebar from "./components/sidebar"
import { useAppState } from "./context/AppContext"
import ProtectedRoutes from "./ProtectedRoute"
import Dashboard from "./screens/dashboard"
import { Index } from "./screens/index"
import Settings from "./screens/settings"
import Signin from "./screens/signin"
import Signup from "./screens/signup"
import TransactionHistory from "./screens/transactionHistory"
import Vehicles from "./screens/vehicles"
import VerifyEmail from "./screens/verifyemail"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { user } = useAppState();

  return (
    <>
      <BrowserRouter>
        {user.id &&
      <Sidebar />}
        <Routes>
          <Route index path="" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="verifyotp" element={<VerifyEmail />} />
          <Route path="vehicles" element={<Vehicles />} />  

          <Route element={<ProtectedRoutes isAuthenticated = {user.id} />} >
          <Route path="dashboard" element={<Dashboard />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="transactionhistory" element={<TransactionHistory />} />
        <Route path="settings" element={<Settings />} />
    </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
