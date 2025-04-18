import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

interface PropTypes {
  children: ReactNode;
}

const AppShell = ({ children }: PropTypes) => {
  return <main className={cn(inter.className,)}>{children}</main>;
};

export default AppShell;
