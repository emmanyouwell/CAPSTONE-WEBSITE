import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";


function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, userDetails } = useSelector(state => state.users);
  const closeMenu = () => setIsMenuOpen(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
    setIsMenuOpen(false);
  }
  const goToProfile = () => {
    navigate('/dashboard/profile');
  }
  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])
  // profile menu component
  const profileMenuItems = [
    {
      label: "Profile",
      icon: UserIcon,
      onPress: goToProfile
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
          className="flex items-center gap-1 p-3 lg:ml-auto"
        >

          Welcome, {userDetails ? (userDetails.name.first + " " + userDetails.name.last) : "Guest"} <ChevronDown />

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

export function ComplexNavbar({ pageTitle, isNavOpen, setIsNavOpen }) {


  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && toggleIsNavOpen(),
    );
  }, []);
  return (
    <Navbar className="top-0 z-10 mx-auto max-w-full p-2 rounded-none lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          {/* <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton> */}
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            {/* {pageTitle} */} Dashboard
          </Typography>
        </div>





        <ProfileMenu />
      </div>

    </Navbar>
  );
}