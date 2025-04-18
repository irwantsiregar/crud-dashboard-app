import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register/Register";

function RegisterPage() {
  return (
    <AuthLayout title="Acara | Register">
      <Register />
    </AuthLayout>
  );
}

export default RegisterPage;
