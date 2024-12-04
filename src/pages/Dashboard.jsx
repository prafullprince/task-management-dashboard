import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { FaTasks } from "react-icons/fa";
import userImage from "../assets/mine4.jpg"


export default function Dashboard() {

  // hook
  const [open, setOpen] = useState(false);

  // sidebarLinks
  const links = [
    {
      id: 1,
      label: "Tasks",
      href: "/tasks",
      icon: <FaTasks className=" text-2xl" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border-l-[0.5px] min-h-screen border-richblack-500 overflow-y-auto overflow-x-hidden",
      )}
    >

      {/* sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 py-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-16 mb-2 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Prafull Prince",
                href: "#",
                icon: (
                  <img
                    src={userImage}
                    className="h-7 w-7 flex-shrink-0 rounded-full bg-center bg-cover"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* nested pages */}
      <div className={`min-h-[calc(100vh-3.5rem)] flex-1 overflow-y-auto overflow-x-hidden border-l-[0.5px] border-richblack-500 rounded-t-lg ${open ? "w-0" : ""}`}>
        <div className="mx-auto py-10 w-[80%] overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

// logo
export const Logo = () => {
  return (
    <Link
      to={"/"}
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Task Management
      </motion.span>
    </Link>
  );
};

// logoIcon
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
