"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import "react-toastify/dist/ReactToastify.css";


function page() {
  const isSidebar = useAppSelector((state) => state?.sidebarToggle.isOpen);


  return (
    <div>
      <section className={`${isSidebar ? "sidebartoleft" : "sidebartoleft2"}`}>
        <div className="home-content">
          <div className="row sales-boxes">
            <h4 className="page-title">Tutor Dashboard</h4>
            <p>
             This is the Student dashboard , this panel can be only accessed through student credentials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
