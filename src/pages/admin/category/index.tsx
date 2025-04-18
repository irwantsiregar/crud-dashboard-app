import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

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
