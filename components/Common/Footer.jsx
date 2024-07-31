"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-top aos" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-4  mr-4 col-sm-6">
                <div className="footer-widget footer-about">
                  <Link href="/" className="footer-logo">
                    <Image width={200} height={60} src="/logo.svg" alt="logo" />
                  </Link>
                  <div className="footer-about-content">
                    <p>Dynamic community for the various Indian languages.</p>
                  </div>

                  <div className="Footer_email">
                    <span>Info@fluentie.com</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-sm-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">Navigation</h2>
                  <ul>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/register">Sign Up</Link>
                    </li>

                    <li>
                      <Link href="/findtutor">Find a tutor</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-12">
                  <div className="copyright-text">
                    <p className="mb-0 text-center">
                      &copy;2024 Fluentie. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
