import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BankList from "./pages/banks/BankList";
import AgentList from "./pages/agents/AgentList";
import DepositCodeList from "./pages/depositcodes/DepositCodeList";
import SmsTemplateLists from "./pages/sms_templates/SmsTemplateList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from "./pages/users/UsersList";
import { LoginForm } from "./components/forms/LoginForm";
import ResetPassword from "./components/forms/ResetPasswordForm";
import { ForgotPassword } from "./components/forms/ForgotPasswordForm";
import BuserList from "./pages/buser/BuserList";
import Dashboard from "./pages/dashboard";

// blocks access if no valid tokens
export const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");


  if (!accessToken && !refreshToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
// prevent showing login if already logged in
export const LoginRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken || refreshToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};



export default function App() {


  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<LoginRoute><LoginForm /></LoginRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bank" element={<ProtectedRoute><BankList /></ProtectedRoute>} />
          <Route path="/agent" element={<ProtectedRoute><AgentList /></ProtectedRoute>} />
          <Route path="/depositcode" element={<ProtectedRoute><DepositCodeList /></ProtectedRoute>} />
          <Route path="/smstemplate" element={<ProtectedRoute><SmsTemplateLists /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/buser" element={<ProtectedRoute><BuserList /></ProtectedRoute>} />
          <Route path="/forgotpassword" element={< ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />


        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="colored"
      />

    </>
  );
}
