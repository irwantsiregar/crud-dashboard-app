import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Category";

function CategoryAdminPage() {
  return (
    <DashboardLayout
      title="Category"
      description="List of all Category, create new category, and manage existing category"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
}

export default CategoryAdminPage;
