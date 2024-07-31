"use client";
import { registerUserData } from "@/lib/features/auth/authSlice";
import { hideLoader, showLoader } from "@/lib/features/loaderSlice";
import { useAppDispatch, useAppSelector, useCustomRouter } from "@/lib/hooks";
import { signIn, useSession } from "next-auth/react";

import {
  getPublicIpAddress,
  handleSubmitValidation,
} from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    password_confirmation: "",
    user_type: "student",
  });
  const [errors, setErrors] = useState({});
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  async function handleGoogleSignin() {
    const result = await signIn("google");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await handleSubmitValidation(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        dispatch(showLoader());
        const res = await dispatch(registerUserData(formData));

        if (res?.payload?.success == true) {
          localStorage.setItem(
            "token",
            JSON.stringify(res?.payload?.data.access_token?.token)
          );
          localStorage.setItem(
            "usertype",
            JSON.stringify(res?.payload?.data.user?.user_type)
          );

          const l = localStorage.getItem("token");

          router.push("/login");
          toast.success(res.payload.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          // Redirect to /login
        } else {
          toast.error(res?.payload?.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          Object.keys(res.payload.data).forEach((key) => {
            res.payload.data[key].forEach((error) => {
              toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
              });
            });
          });
        }

        dispatch(hideLoader());
      } catch (error) {
        dispatch(hideLoader());
        console.error("API request failed:", error);
      } finally {
        dispatch(hideLoader());
      }
    } else {
      toast.error("Please fill all the required fields correctly", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    const fetchIpAddress = async () => {
      const rs = await getPublicIpAddress();
      const ip = localStorage.getItem("publicIPAddress");
      setFormData((prevFormData) => ({
        ...prevFormData,
        ip: ip, // Assign the fetched IP address, not the value from localStorage
      }));
    };
    fetchIpAddress();
  }, []);

  console.log(formData);

  return (
    <div className="main-wrapper log-wrap">
      <div className="row">
        {/* Login Banner */}
        <div className="col-md-6 login-bg">
          <div className="owl-carousel login-slide owl-theme">
            <div className="welcome-login">
              <div className="login-banner">
                <Image
                  src="/login.svg"
                  className="img-fluid"
                  alt="Logo"
                  width={800}
                  height={800}
                  priority
                />
              </div>
              
            </div>
          </div>
        </div>
        {/* /Login Banner */}

        <div className="col-md-6 login-wrap-bg">
          {/* Login */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="img-logo">
                <Image src="/logo.svg" alt="Logo" width={100} height={50} />
                <div className="back-home">
                  <Link href="/">Back to Home</Link>
                </div>
              </div>
              <h1>Sign up</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label className="form-control-label">Full Name</label>
                  <div className="pass-group">
                    <input
                      type="input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control pass-input"
                      placeholder="Enter your Full Name"
                    />
                    <span className="feather-eye toggle-password"></span>
                  </div>
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="input-block">
                  <label className="form-control-label">Email</label>
                  <div className="pass-group">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control pass-input"
                      placeholder="Enter your Email"
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="input-block">
                  <label className="form-control-label">Phone Number</label>
                  <div className="pass-group">
                    <input
                      type="input"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      className="form-control pass-input phoneinput"
                      placeholder="Enter your Phone no"
                    />
                    <span className="feather-eye toggle-password"></span>
                  </div>
                  {errors.phone_no && (
                    <span className="error-message">{errors.phone_no}</span>
                  )}
                </div>

                <div className="input-block">
                  <label className="form-control-label">Password</label>
                  <div className="pass-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control pass-input"
                      placeholder="Enter your password"
                    />
                    <span
                      className="feather-eye toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="input-block">
                  <label className="form-control-label">Confirm Password</label>
                  <div className="pass-group">
                    <input
                      type={confirmPassword ? "text" : "password"}
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className="form-control pass-input"
                      placeholder="Enter your password"
                    />
                    <span
                      className="feather-eye toggle-password"
                      onClick={() => setconfirmPassword(!confirmPassword)}
                    >
                      {confirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                  {errors.password_confirmation && (
                    <span className="error-message">
                      {errors.password_confirmation}
                    </span>
                  )}
                </div>

                <div className="form-check remember-me"></div>
                <div className="d-grid">
                  <button
                    disabled={isLoading}
                    className="btn btn-primary btn-start"
                    type="submit"
                  >
                    {isLoading ? (
                      <CircularProgress size={21} color="inherit" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="google-bg text-center">
              <span>Or sign Up with</span>
              <div className="sign-google">
                <ul>
                  <li>
                    <Link href="#" onClick={() => handleGoogleSignin()}>
                      <Image
                        src="/net-icon-01.png"
                        className="img-fluid"
                        alt="Logo"
                        width={30}
                        height={30}
                      />{" "}
                      Sign Up using Google
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="mb-0">
                Already have an account?<Link href="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default page;
