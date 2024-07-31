"use client";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function page() {
  const isSidebar = useSelector((state) => state?.sidebarToggle.isOpen);

  return (
    <div>
      <ToastContainer />
      <section className={`${isSidebar ? "sidebartoleft" : "sidebartoleft2"}`}>
        <div className="home-content">
          <div className="row sales-boxes">
            <h4 className="page-title">Tutor Dashboard</h4>
            <p>
              This is the instructor dashboard , this panel can be only accessed
              through tutor credentials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
