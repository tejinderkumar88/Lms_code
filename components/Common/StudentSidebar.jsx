"use client";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

import {
  faArrowRightFromBracket,
  faBars,
  faDollarSign,
  faHouse,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleSidebarFunction } from "@/lib/features/sidebarSlice";
import ClassIcon from "@mui/icons-material/Class";
import RestoreIcon from "@mui/icons-material/Restore";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import { signOut } from "next-auth/react";

import { getProfile } from "@/lib/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

import EchoConfig from "@/lib/chatsync/echo";
import { updateForTutor_Merged_Array } from "@/lib/features/studentchat/updateMergedStudentSlice";
import { updateMessageCounts } from "@/lib/features/studentchat/messagecountSlice";
export function StudentSidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState("/student/dashboard");
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);

  const profileData = useSelector((state) => state.profile.profileData);

  const mergedMessage = useAppSelector(
    (state) => state?.tutorMergedMesage?.MergedMessage_For_Student
  );
  const dispatch = useAppDispatch();
  const isSidebar = useAppSelector((state) => state?.sidebarToggle.isOpen);
  const selectedChatId = useAppSelector(
    (state) => state?.SelectedChatByStudentReducer.selectedChat_Idby_student
  );

  const handleSidebarToggle = () => {
    dispatch(toggleSidebarFunction());
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let userId = localStorage.getItem("userid");

  const messageType =
    localStorage.getItem("usertype") === "tutor"
      ? "TutorMessage"
      : "StudentMessage";

  var usertype = localStorage.getItem("usertype")
    ? localStorage.getItem("usertype") + ""
    : "";

  useEffect(() => {
    setIsActive(window.location.pathname);
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    EchoConfig();
    window.Echo.private(`chat_${userId}`).listen(messageType, (e) => {
      dispatch(updateForTutor_Merged_Array(e));
    });
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
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Clear local storage
    localStorage.clear();
    signOut();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (mergedMessage.length > 0) {
      let countMap = {};
      mergedMessage.forEach((message) => {
        const chatId = message.chat_id;
        countMap[chatId] = (countMap[chatId] || 0) + 1;
      });
      dispatch(updateMessageCounts(countMap));
    } else {
      dispatch(updateMessageCounts({}));
    }
  }, [dispatch, mergedMessage]);

  console.log(
    mergedMessage[mergedMessage.length - 1]?.chat_id,
    userId && userId
  );
  console.log(
    mergedMessage[mergedMessage.length - 1]?.chat_id,
    "humming",
    JSON.parse(userId)
  );

  console.log(mergedMessage, "mergedmsg");
  return (
    <div>
      {selectedChatId !== mergedMessage[mergedMessage.length - 1]?.chat_id &&
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
                    <div className="d-flex gap-2  ">
                      <div>
                        <p className="recent-message-heading">
                          You have a new message from
                          <span className="r-chat_persnName">
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
              isActive === "/student/mydashboard" ? "active" : ""
            }`}
            onClick={(e) => setIsActive("/student/mydashboard")}
          >
            <Link href="/student/mydashboard" className="nav-link">
              <i className="feather-dollar-sign">
                <ForumIcon />
              </i>
              <span className="links_name">My Dashboard</span>
            </Link>
          </li>
          <li
            className={`nav-item ${
              isActive === "/student/chat" ? "active" : ""
            }`}
            onClick={(e) => setIsActive("/student/chat")}
          >
            <Link href="/student/chat" className="nav-link">
              <i className="feather-dollar-sign">
                <ForumIcon />
              </i>
              <span className="links_name">Chat</span>
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
                        : "/nouserrr.svg"
                    }
                    alt=""
                    className="avatar-img "
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

export default StudentSidebar;
