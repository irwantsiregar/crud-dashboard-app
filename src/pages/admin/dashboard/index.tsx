import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainDashboard from "@/components/views/MainDashboard";

const Dashboard = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Summary results from event, category and products, carts, recipes, posts"
      type="admin"
    >
      <MainDashboard />
    </DashboardLayout>
  );
};

export default Dashboard;
