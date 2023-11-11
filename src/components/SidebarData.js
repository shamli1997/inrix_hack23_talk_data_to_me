import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Chat",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  // {
  //   title: "Reports",
  //   path: "/reports",
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: "nav-text",
  // },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  }
];
