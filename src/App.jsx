import { Toaster } from "../node_modules/react-hot-toast/dist/index"
import { useAppState } from "./context/AppContext"
import ProtectedRoutes from "./ProtectedRoute"
import Signin from "./screens/signin"
import Signup from "./screens/signup"
import VerifyEmail from "./screens/verifyemail"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { user } = useAppState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="verifyotp" element={<VerifyEmail />} />
        </Routes>

        <ProtectedRoutes isAuthenticated={user.id} />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
