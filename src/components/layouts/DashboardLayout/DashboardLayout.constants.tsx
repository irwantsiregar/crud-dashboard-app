import {
  CiFries,
  CiGrid41,
  CiShop,
  CiShoppingCart,
  CiViewList,
} from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "products",
    label: "Products",
    href: "/products",
    icon: <CiShop />,
  },
  {
    key: "carts",
    label: "Carts",
    href: "/carts",
    icon: <CiShoppingCart />,
  },
  {
    key: "recipes",
    label: "Recipes",
    href: "/recipes",
    icon: <CiFries />,
  },
  {
    key: "posts",
    label: "Posts",
    href: "/posts",
    icon: <CiViewList />,
  },
];

export { SIDEBAR_ADMIN };
