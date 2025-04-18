import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login/Login";

function LoginPage() {
  return (
    <AuthLayout title="Acara | Login">
      <Login />
    </AuthLayout>
  );
}

export default LoginPage;
