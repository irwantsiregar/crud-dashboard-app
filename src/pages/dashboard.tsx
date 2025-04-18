import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainDashboard from "@/components/views/MainDashboard";

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Summary results from products, carts, recipes, posts"
      type="admin"
    >
      <MainDashboard />
    </DashboardLayout>
  );
}
