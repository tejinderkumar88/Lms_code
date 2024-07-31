import { NextResponse } from "next/server";

export function middleware(request) {
  // Ensure request.cookies is defined before accessing its properties
  if (request.cookies) {
    const tokenCookie = request.cookies.get("token");
    const userTypeCookie = request.cookies.get("usertype");

    // Check if token cookie and user type cookie exist and have values
    if (
      tokenCookie &&
      tokenCookie.value &&
      userTypeCookie &&
      userTypeCookie.value
    ) { 
      const token = tokenCookie.value;
      const userType = userTypeCookie.value;

      console.log(`Token: ${token}`);
      console.log(`User Type: ${userType}`);
      console.log(`Requested Path: ${request.nextUrl.pathname}`);

      // Check if the user is not a tutor and trying to access the instructor panel
      if (
        userType !== "tutor" &&
        request.nextUrl.pathname.startsWith("/instructor") &&
        request.nextUrl.pathname !== "/instructor"
      ) {
        console.log("Redirecting non-tutor user from instructor panel");
        return NextResponse.redirect(new URL("/", request.url));
      } else if (
        userType !== "admin" &&
        request.nextUrl.pathname.startsWith("/admin")
      ) {
        console.log("Redirecting non-admin user from admin panel");
        return NextResponse.redirect(new URL("/", request.url));
      } else if (
        userType !== "student" &&
        (
          request.nextUrl.pathname.startsWith("/student") ||
          request.nextUrl.pathname === "/bookingslot" ||
          request.nextUrl.pathname === "/packages"
        )
      ) {
        console.log("Redirecting non-student user from student panel");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If the user type is correct, allow the request to proceed
      console.log("User type is correct, allowing the request to proceed");
      return NextResponse.next();
    } else {
      console.error("Token cookie or user type cookie is not available.");
      // Handle the absence of token cookie or user type cookie
      if (
        (request.nextUrl.pathname.startsWith("/instructor") &&
          request.nextUrl.pathname !== "/instructor") ||
        request.nextUrl.pathname.startsWith("/admin") ||
        request.nextUrl.pathname.startsWith("/student")
      ) {
        console.log("Redirecting due to missing cookies");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } else {
    console.error("Request cookies object is undefined.");
    // Handle the absence of request.cookies
  }

  // Default case, allow the request to proceed
  return NextResponse.next();
}
