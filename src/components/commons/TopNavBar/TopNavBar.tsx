import ThemeSwitcher from "@/components/ui/ThemeSwitcher/ThemeSwithcher";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from "@heroui/react";
import { ReactNode } from "react";
import { BsBell, BsCart3 } from "react-icons/bs";

export default function TopNavBar({ children }: { children: ReactNode }) {
  return (
    <Navbar
      isBlurred
      maxWidth="full"
      position="static"
      className="border-b-1 border-default-200 pr-2"
    >
      {children}

      <NavbarContent as="div" justify="end">
        <div className="flex items-center justify-center gap-x-3 pr-2">
          <ThemeSwitcher />

          <CartAndNotif />
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Badge color="danger" content="new" size="sm">
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                radius="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Badge>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

const CartAndNotif = () => {
  return (
    <div className="flex gap-3">
      <Badge color="secondary" content="5" placement="top-right" size="sm">
        <Button
          isIconOnly
          variant="bordered"
          aria-label="Shopping Cart"
          className="border-1 border-default-200"
        >
          <BsCart3 className="text-xl" />
        </Button>
      </Badge>

      <Badge color="danger" content="9+" shape="circle" size="sm">
        <Button
          isIconOnly
          variant="bordered"
          aria-label="Notification"
          className="border-1 border-default-200"
        >
          <BsBell className="text-xl" />
        </Button>
      </Badge>
    </div>
  );
};
