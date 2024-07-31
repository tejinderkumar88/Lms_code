"use client";
import { loginUserData } from "@/lib/features/auth/authSlice";
import { hideLoader, showLoader } from "@/lib/features/loaderSlice";
import { useAppDispatch, useAppSelector, useCustomRouter } from "@/lib/hooks";
import { loginFieldsValidator, tostifyAlert } from "@/lib/utils";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useCookies } from "next-client-cookies";
import { signIn, useSession } from "next-auth/react";
function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    login_id: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const router = useCustomRouter();
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const cookies = useCookies();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleGoogleSignin() {
    const result = await signIn("google");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoader());

    dispatch(loginUserData(formData))
      .then((res) => {
        if (res.payload.success === true) {
          localStorage.setItem(
            "token",
            res?.payload?.data?.access_token?.token
          );
          const user = res?.payload?.data?.user;
          const token = res?.payload?.data?.access_token?.token;
          const isgooglelogin = res?.payload?.data?.isgooglelogin;

          const route =
            user?.user_type === "student"
              ? "/student/dashboard"
              : user?.user_type === "admin"
              ? "/admin/dashboard"
              : user?.user_type === "tutor"
              ? "/instructor/mydashboard"
              : "/";

          cookies.set("token", token);
          cookies.set("usertype", user?.user_type);
          localStorage.setItem("usertype", user?.user_type);
          localStorage.setItem("isgooglelogin", isgooglelogin);
          localStorage.setItem("userid", user?.id);
          localStorage.setItem("username", user?.name);
          console.log("first", cookies.get("token"), res);
          tostifyAlert(res, router, route);
        } else {
          toast.error(res?.payload?.message, { position: "bottom-right" });
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="main-wrapper log-wrap">
        <div className="row">
          <div className="col-md-6 login-bg">
            <div className="owl-carousel login-slide owl-theme">
              <div className="welcome-login">
                <div className="login-banner">
                  <Image
                    src="/login.svg"
                    className="img-fluid"
                    alt="Logo"
                    width={430}
                    height={430}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="w-100">
                  <Link href="/" className="img-logo">
                    <Image
                      src="/logo.svg"
                      className="img-fluid"
                      alt="Logo"
                      width={100}
                      height={50}
                    />
                  </Link>
                  <h1>Sign Into Your Account</h1>
                  <ValidatorForm onSubmit={handleSubmit}>
                    <div className="input-block">
                      <label className="form-control-label">Email</label>
                      <div className="pass-group">
                        <TextValidator
                          type="input"
                          name="login_id"
                          value={formData.login_id}
                          onChange={handleChange}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "Email  is required",
                            "Email is not valid",
                          ]}
                          className="form-control pass-input"
                          placeholder="Enter your Email"
                        />
                      </div>
                    </div>

                    <div className="input-block">
                      <label className="form-control-label">Password</label>
                      <div className="pass-group">
                        <TextValidator
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control pass-input"
                          placeholder="Enter your password"
                          validators={["required"]}
                          InputProps={{
                            endAdornment: (
                              <button
                                className="toggle-password"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </button>
                            ),
                          }}
                          errorMessages={["Password  is required"]}
                        />
                      </div>
                    </div>
                    <div className="forgot">
                      <span>
                        <Link className="forgot-link" href="/forgetpassword">
                          Forgot Password ?
                        </Link>
                      </span>
                    </div>

                    <div className="d-grid">
                      <button
                        disabled={isLoading}
                        className="btn btn-primary btn-start"
                        type="submit"
                      >
                        {isLoading ? (
                          <CircularProgress size={21} color="inherit" />
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </ValidatorForm>
                </div>
              </div>
              <div className="google-bg text-center">
                <span>
                  <Link href="#">Or sign in with</Link>
                </span>
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
                        />
                        Sign In using Google
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="mb-0">
                  New User ? <Link href="/register">Create an Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
