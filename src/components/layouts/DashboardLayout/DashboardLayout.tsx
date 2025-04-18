import PageHead from "@/components/commons/PageHead";
import TopNavBar from "@/components/commons/TopNavBar";
import useToggleMenu from "@/hooks/useToggleMenu";
import { NavbarMenuToggle } from "@heroui/react";
import { Fragment, ReactNode } from "react";
import { SIDEBAR_ADMIN } from "./DashboardLayout.constants";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;

  const { open, onToggle } = useToggleMenu();

  return (
    <Fragment>
      <PageHead title={title} />

      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_ADMIN}
          isOpen={open}
        />

        <div className="h-screen w-full overflow-auto">
          <TopNavBar>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onPress={onToggle}
            />
          </TopNavBar>

          <div
            className="relative px-6 py-2"
            onClick={() => {
              if (open) onToggle();
            }}
          >
            <div className="flex w-full flex-col gap-y-2 pt-2">
              <h1 className="text-3xl font-bold">{title}</h1>

              <p className="mb-4 text-small">{description}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
