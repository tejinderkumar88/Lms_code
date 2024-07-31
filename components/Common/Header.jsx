"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerclick, setHamburgerclick] = useState(true);
  const userType = localStorage.getItem("usertype");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  let currentPath = pathname;
  let dashboardLink = "/";
  if (userType === "student") {
    dashboardLink = "/student/dashboard";
  } else if (userType === "admin") {
    dashboardLink = "/admin/dashboard";
  } else if (userType === "tutor") {
    dashboardLink = "/instructor/mydashboard";
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
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
  const toggleMenu = () => {
    setHamburgerclick(!hamburgerclick);
  };

  console.log(pathname, "pathname");
  console.log(localStorage.getItem("usertype"), "usertype");

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const userRoleFromStorage = await localStorage.getItem("usertype");
        setUserRole(userRoleFromStorage);

        // Check if user is logged in (for illustration purposes)
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // This checks if token exists and converts it to boolean
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    }

    fetchUserRole();
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <header className="header">
          <div className={`header-fixed ${scrolled ? "scrolled" : ""} `}>
            <nav className="navbar navbar-expand-lg header-nav scroll-sticky mt-0">
              <div className="container">
                <div className="navbar-header d-flex align-items-center">
                  <div id="mobile_btn" href="">
                    <span className="bar-icon" onClick={toggleMenu}>
                      <FontAwesomeIcon
                        icon={faBars}
                        size="2xl"
                        style={{ color: "#F79838" }}
                      />
                    </span>
                  </div>
                  <Link href="/" className="navbar-brand logo">
                    <Image
                      src="/logo.svg"
                      className="img-fluid"
                      alt="Logo"
                      width={200}
                      height={300}
                    />
                  </Link>
                </div>
                <div
                  className={`main-menu-wrapper ${
                    hamburgerclick ? "" : "show"
                  }`}
                >
                  <div className="menu-header">
                    <Link href="index.html" className="menu-logo">
                      <Image
                        src="/logo.svg"
                        className="img-fluid"
                        alt="Logo"
                        width={50}
                        height={50}
                      />
                    </Link>
                    <div
                      id="menu_close"
                      className="menu-close"
                      href="#"
                      onClick={toggleMenu}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </div>
                  <ul className="main-nav">
                    <li
                      className={
                        currentPath === "/"
                          ? "has-submenu active"
                          : "has-submenu"
                      }
                      onClick={toggleMenu}
                    >
                      <Link href="/">Home </Link>
                    </li>
                    <li
                      className={
                        currentPath === "/findtutor"
                          ? "has-submenu active"
                          : "has-submenu"
                      }
                      onClick={toggleMenu}
                    >
                      <Link href="/findtutor">Find Tutor </Link>
                    </li>
                  
                   

                    <li className="login-link">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="login-link">
                      <Link href="/register">SignUp</Link>
                    </li>
                    {isLoggedIn && (
                      <li className="login-link">
                        {userRole === "tutor" && (
                          <Link href="/instructor/profile">Profile</Link>
                        )}
                        {userRole === "admin" && (
                          <Link href="/admin/profile">Profile</Link>
                        )}
                        {userRole === "student" && (
                          <Link href="/student/profile">Profile</Link>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
                {localStorage.getItem("token") ? (
                  <ul className="nav header-navbar-rht">
                    <li className="nav-item">
                      <Link
                        className="nav-link header-sign"
                        href={dashboardLink}
                      >
                        My Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login"
                        href={"/"}
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav header-navbar-rht">
                    <li className="nav-item">
                      <Link
                        className="nav-link header-sign"
                        href="/login"
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link header-login"
                        href="/register"
                        onClick={toggleMenu}
                      >
                        SignUp
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
          <ToastContainer />
        </header>
      </div>
    </>
  );
};

export default Header;