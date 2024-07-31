"use client";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import {
  faArrowRightFromBracket,
  faBars,
  faHouse,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleSidebarFunction } from "@/lib/features/sidebarSlice";
import { signOut } from "next-auth/react";
import ForumIcon from "@mui/icons-material/Forum";
import EchoConfig from "@/lib/chatsync/echo";
import { updateGlobalArray } from "@/lib/features/tutorchat/updateMergedTutorSlice";
import { getProfile } from "@/lib/features/profile/profileSlice";

export function InstructorSidebar() {
  let userId = localStorage.getItem("userid");
  let userType = localStorage.getItem("usertype");

  const messageType = userType === "tutor" ? "TutorMessage" : "StudentMessage";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const dispatch = useAppDispatch();
  const selectedChatId = useAppSelector((state) => state.SelectedChatId);
  const mergedMessage = useAppSelector(
    (state) => state?.Mergedfortutor?.globalArray
  );

  const profileData = useSelector((state) => state.profile.profileData);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState("/instructor/mydashboard");
  var usertype = localStorage.getItem("usertype")
    ? localStorage.getItem("usertype") + ""
    : "";

  const isSidebar = useAppSelector((state) => state?.sidebarToggle.isOpen);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebarFunction());
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsActive(window.location.pathname);
    usertype = localStorage.getItem("usertype")
      ? localStorage.getItem("usertype") + ""
      : "";
  }, []);

  useEffect(() => {
    EchoConfig();
    window.Echo.private(`chat_${userId}`).listen(messageType, (e) => {
      dispatch(updateGlobalArray(e));
      console.log(e, "instructor_echo");
    });

    setOpen(true);
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (mergedMessage && mergedMessage.length > 0) {
      const mostRecentMessage = mergedMessage[mergedMessage.length - 1];
      setMessage(mostRecentMessage);
      setOpen(true);
    }
  }, [mergedMessage]);

  const handleLogout = () => {
    // Clear cookies
    document?.cookie &&
      document?.cookie?.split(";")?.forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

    localStorage.clear();
    signOut();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {selectedChatId.selectedChat_Id !==
        mergedMessage[mergedMessage?.length - 1]?.chat_id &&
        mergedMessage.length > 0 &&
        mergedMessage[mergedMessage.length - 1]?.sender?.id !=
          JSON.parse(userId) && (
          <>
            {mergedMessage?.length > 0 && (
              <Snackbar
                open={open}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={handleClose}
                className="custom-snackbar"
              >
                <div onClose={handleClose} className="custom-alert">
                  <div className="">
                    <div className="d-flex gap-2">
                      <div>
                        <p className="recent-message-heading">
                          You have a new message from
                          <span className="recent_msg_popup">
                            {
                              mergedMessage[mergedMessage.length - 1]?.sender
                                ?.name
                            }
                          </span>
                        </p>
                        <p className="recent-message-act">
                          {mergedMessage[mergedMessage.length - 1]?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Snackbar>
            )}
          </>
        )}

      <div className={`sidebar ${isSidebar ? "active" : ""}`}>
        <ul className="nav-links">
          <li
            className={`nav-item ${
              isActive === "/instructor/mydashboard" ? "active" : ""
            }`}
            onClick={(e) => setIsActive("/instructor/mydashboard")}
          >
            <Link href="/instructor/mydashboard" className="nav-link">
              <i className="feather-home">
                <FontAwesomeIcon icon={faHouse} />
              </i>
              <span
                className={`links_name ${isSidebar ? "remove_link_name" : ""} `}
              >
                My Dashboard
              </span>
            </Link>
          </li>

          <li
            className={`nav-item ${
              isActive === "/instructor/chat" ? "active" : ""
            }`}
            onClick={(e) => setIsActive("/instructor/chat")}
          >
            <Link href="/instructor/chat" className="nav-link">
              <i className="feather-book">
                {" "}
                <ForumIcon />{" "}
              </i>
              <span
                className={`links_name ${isSidebar ? "remove_link_name" : ""} `}
              >
                Chat
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i onClick={() => handleSidebarToggle()}>
              <FontAwesomeIcon icon={faBars} />
            </i>
            <Link href="/" className="navbar-brand logo">
              <Image
                width={200}
                height={300}
                src="/logo.svg"
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>
          <ul className="nav header-navbar-rht">
            <li className="nav-item user-nav">
              <Link
                href="#"
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                onClick={handleProfileClick}
              >
                <span className="user-img">
                  <Image
                    width={50}
                    height={50}
                    src={
                      profileData?.profile_pic
                        ? profileData.profile_pic
                        : "/profile-avatar.jpg"
                    }
                    alt=""
                  />
                  <span className="status online"></span>
                </span>
              </Link>
              <div
                className={`users dropdown-menu dropdown-menu-right ${
                  isDropdownOpen ? "open" : ""
                }`}
                data-popper-placement="bottom-end"
              >
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <Image
                      width={50}
                      height={50}
                      src={
                        profileData?.profile_pic
                          ? profileData.profile_pic
                          : "/userrr.svg"
                      }
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>{profileData && profileData?.name}</h6>
                    <p className="text-muted mb-0">
                      {usertype === "tutor"
                        ? "Instructor"
                        : usertype.charAt(0).toUpperCase() + usertype.slice(1)}
                    </p>
                  </div>
                </div>

                <Link className="dropdown-item" href="" onClick={handleLogout}>
                  <i className="feather-log-out me-1">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </i>{" "}
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default InstructorSidebar;
