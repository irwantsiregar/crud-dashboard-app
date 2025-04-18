import DashboardLayout from "@/components/layouts/DashboardLayout";
import Carts from "@/components/views/Carts";

function CartsPage() {
  return (
    <DashboardLayout
      title="Carts"
      description="List of all product and manage existing products in carts"
      type="admin"
    >
      <Carts />
    </DashboardLayout>
  );
}

export default CartsPage;
