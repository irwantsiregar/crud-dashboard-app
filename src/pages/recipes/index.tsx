import DashboardLayout from "@/components/layouts/DashboardLayout";
import Recipes from "@/components/views/Recipes";

function RecipesPage() {
  return (
    <DashboardLayout
      title="Recipes"
      description="List of all recipes and manage existing recipes"
      type="admin"
    >
      <Recipes />
    </DashboardLayout>
  );
}

export default RecipesPage;
