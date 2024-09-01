import { faBullhorn, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

export const LinksSidebar = [
  {
    title: "Users",
    icon: faUser,
    link: "users",
    role: ["admin"],
  },
  {
    title: "Seller Request",
    icon: faBullhorn,
    link: "seller_req",
    role: ["admin"],
  },
  {
    title: "Categories",
    icon: faList,
    link: "categories",
    role: ["admin"],
  },
  {
    title: "Products",
    icon: faProductHunt,
    link: "products",
    role: ["admin", "seller"],
  },
];
