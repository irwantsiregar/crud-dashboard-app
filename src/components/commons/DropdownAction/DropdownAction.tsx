import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuBurger } from "react-icons/ci";

interface DropdownActionPropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction = (props: DropdownActionPropTypes) => {
  const { onPressButtonDelete, onPressButtonDetail } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuBurger className="text-default-700" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>

        <DropdownItem
          key="delete-event"
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
