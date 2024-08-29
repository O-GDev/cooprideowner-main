import { Toaster } from "../node_modules/react-hot-toast/dist/index"
import Sidebar from "./components/sidebar"
import Dashboard from "./screens/dashboard"
import Settings from "./screens/settings"
import Signin from "./screens/signin"
import Signup from "./screens/signup"
import TransactionHistory from "./screens/transactionHistory"
import Vehicles from "./screens/vehicles"
import VerifyEmail from "./screens/verifyemail"
import { BrowserRouter, Routes, HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Signup />}  > */}
          <Route index path="" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="verifyotp" element={<VerifyEmail />} />
        </Routes>

        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
    </>
    // <Signup />
    // <Signin />
    // <VerifyEmail />
  );
}

export default App;
