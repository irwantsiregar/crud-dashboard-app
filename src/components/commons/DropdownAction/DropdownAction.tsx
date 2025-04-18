import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface IDropdownActionPropTypes {
  onPressButtonDetail: () => void;
  onPressButtonUpdate: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction = (props: IDropdownActionPropTypes) => {
  const { onPressButtonDelete, onPressButtonUpdate, onPressButtonDetail } =
    props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-500" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>

        <DropdownItem key="update-event-button" onPress={onPressButtonUpdate}>
          Edit
        </DropdownItem>

        <DropdownItem
          key="delete-event"
          className="text-danger-500"
          color="danger"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
