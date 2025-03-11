import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  InboxArrowDownIcon,
  PowerIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars2Icon,
  Bars3Icon,
  UserIcon
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";


function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const logoutHandler = () => {

    dispatch(logoutUser());
    setIsMenuOpen(false);
    window.location.reload();

  }
  const goToProfile = () => {
    navigate('/admin/profile');
  }
  // profile menu component
  const profileMenuItems = [
    {
      label: "Profile",
      icon: UserIcon,
      onPress: goToProfile
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Logout",
      icon: ArrowLeftStartOnRectangleIcon,
      onPress: logoutHandler
    },
  ];


  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-2 lg:ml-auto"
        >
          {/* <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          /> */}
          <Bars3Icon className="h-6 w-6 p-0.5" strokeWidth={2.5} />
          {/* <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          /> */}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onPress }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onPress}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar({ pageTitle }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="top-0 z-10 mx-auto max-w-full p-2 rounded-none lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            {pageTitle}
          </Typography>
        </div>





        <ProfileMenu />
      </div>

    </Navbar>
  );
}