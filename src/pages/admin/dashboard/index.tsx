import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

function DashboardAdminPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="dashboard Admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
}

export default DashboardAdminPage;
