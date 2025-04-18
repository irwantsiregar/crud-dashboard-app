import { useState } from "react";

const useToggleMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenToggle = () => setOpen(true);

  const onCloseToggle = () => setOpen(false);

  const onToggle = () => setOpen(!open);

  return { open, onOpenToggle, onCloseToggle, onToggle };
};

export default useToggleMenu;
