import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsBrightnessHigh, BsMoonStars } from "react-icons/bs";

const actionTheme = {
  dark: "dark",
  light: "light",
};

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {theme === actionTheme.light && (
        <Button
          isIconOnly
          variant="bordered"
          aria-label="Switch to dark"
          className="border-1 border-default-200"
          onPress={() => setTheme(actionTheme.dark)}
        >
          <BsMoonStars className="text-xl" />
        </Button>
      )}

      {theme === actionTheme.dark && (
        <Button
          isIconOnly
          variant="bordered"
          aria-label="Switch to light"
          className="border-1 border-default-200"
          onPress={() => setTheme(actionTheme.light)}
        >
          <BsBrightnessHigh className="text-xl" />
        </Button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
