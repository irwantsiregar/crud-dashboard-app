import {
  CiFries,
  CiGrid41,
  CiShop,
  CiShoppingCart,
  CiShoppingTag,
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
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <CiViewList />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />,
  },

  // Pages for Public API
  {
    key: "products",
    label: "Products",
    href: "/admin/products",
    icon: <CiShop />,
  },
  {
    key: "carts",
    label: "Carts",
    href: "/admin/carts",
    icon: <CiShoppingCart />,
  },
  {
    key: "recipes",
    label: "Recipes",
    href: "/admin/recipes",
    icon: <CiFries />,
  },
  {
    key: "posts",
    label: "Posts",
    href: "/admin/posts",
    icon: <CiViewList />,
  },
];

export { SIDEBAR_ADMIN };
