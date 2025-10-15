import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/bank" element={<BankList />} />
          <Route path="/agent" element={<AgentList />} />
          <Route path="/depositcode" element={<DepositCodeList />} />
          <Route path="/smstemplate" element={<SmsTemplateLists />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/forgotpassword" element={< ForgotPassword/>} />
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
