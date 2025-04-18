import DashboardLayout from "@/components/layouts/DashboardLayout";
import Posts from "@/components/views/Posts";

function PostsPage() {
  return (
    <DashboardLayout
      title="Posts"
      description="List of all post, create new new, and manage existing posts"
      type="admin"
    >
      <Posts />
    </DashboardLayout>
  );
}

export default PostsPage;
