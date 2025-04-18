import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Event";

function EventAdminPage() {
  return (
    <DashboardLayout
      title="Event"
      description="List of all event, create new event, and manage existing event"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
}

export default EventAdminPage;
