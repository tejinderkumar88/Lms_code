import { toast } from "react-toastify";
import moment from "moment-timezone";
import { hideLoader } from "./features/loaderSlice";
export const validatorFunction = (formData, setErrors) => {
  setErrors({});
  const newErrors = {};
  if (!formData?.name?.trim()) {
    newErrors.name = "Full Name is required.";
  }
  if (!formData?.email?.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData?.email?.trim())) {
    newErrors.email = "Please enter a valid email address.";
  }
  if (formData?.phone_no === null) {
    newErrors.phone_no = "Phone Number is required.";
  } else if (!/^\+\d{8,15}$/i.test(formData?.phone_no?.trim())) {
    newErrors.phone_no =
      "Please enter a valid phone number with a maximum of 15 characters.";
  }

  if (!formData?.password?.trim()) {
    newErrors.password = "Password is required.";
  } else if (formData?.password?.trim()?.length < 8) {
    newErrors.password = "Password must be at least 8 characters long.";
  }
  if (!formData.password_confirmation?.trim()) {
    newErrors.password_confirmation = "Confirm Password is required.";
  } else if (formData.password !== formData.password_confirmation) {
    newErrors.password_confirmation =
      "Password and Confirm Password do not match.";
  }
  if (!formData.zipcode) {
    newErrors.zipcode = "Zip Code  is required.";
  } else if (!/^\d{6}$/i.test(formData.zipcode.trim())) {
    newErrors.zipcode =
      "Please enter a valid zipcode with a maximum of 6 characters.";
  }
  // Counting words in introduction
  const wordCount = formData.introduction.trim().split(/\s+/).length;
  console.log(wordCount);
  if (!formData.introduction.trim()) {
    newErrors.introduction = "Introduction is required.";
  }
  if (wordCount > 50) {
    newErrors.introduction = "Introduction must be a maximum of 50 words.";
  }

  if (!formData.price.trim()) {
    newErrors.price = "Price  is required.";
  }
  if (!formData.experience || !formData.experience.trim()) {
    newErrors.experience = "Experience  is required.";
  }

  if (Object.keys(newErrors)?.length > 0) {
    setErrors(newErrors);
    console.error("Form has errors. Please check.");
    return;
  }
};

export const loginFieldsValidator = (formData, setErrors) => {
  setErrors({});
  const newErrors = {};

  if (!formData.address_line_1.trim()) {
    newErrors.address_line_1 = "Address Line 1 is required.";
  }

  if (!formData.address_line_2.trim()) {
    newErrors.address_line_2 = "Address Line 2 is required.";
  }

  if (!formData.engaging_title.trim()) {
    newErrors.engaging_title = "Title  is required.";
  }

  if (!formData.city) {
    newErrors.city = "City name is required.";
  }

  if (!formData.login_id.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.login_id.trim())) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required.";
  } else if (formData.password.trim()?.length < 8) {
    newErrors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(newErrors)?.length > 0) {
    setErrors(newErrors);
    console.error("Form has errors. Please check.");
    return;
  }
};

export const tostifyAlert = (res, router, route) => {
  if (res.payload.data) {
    toast.success(res.payload.message, {
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
    });
    setTimeout(() => {
      router.push(route);
    }, 900);
  } else {
    toast.error(res.payload.response.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  }
};

export const tostifyMessage = (res) => {
  console.log(res);
  if (res?.payload?.success) {
    toast.success(res.payload.message, {
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
    });
  } else {
    toast.error(res.payload.message, {
      position: "bottom-right",
      // autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  }
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' }); // Get the full name of the month
  const day = date.getDate();
  
  // Add the suffix to the day
  let dayString;
  if (day === 1 || day === 21 || day === 31) {
    dayString = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayString = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayString = `${day}rd`;
  } else {
    dayString = `${day}th`;
  }
  
  return `${dayString} ${month} ${year}`;
}

export function formatTimeFromISO(isoTimestamp) {
  // Parse the ISO timestamp
  const date = new Date(isoTimestamp);

  // Extract hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const amPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  // Pad minutes with leading zero if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct formatted time string
  const formattedTime = `${hours}:${minutes}${amPm}`;

  return formattedTime;
}

export const convertDateToUTC = (datetimeString) => {
  const datetime = new Date(datetimeString);
  const utcDatetime = datetime.toISOString();
  return utcDatetime;
};



export const convertToISTAndAddTime = (datetimeString) => {
  // Convert to UTC
  const utcDatetime = moment.utc(datetimeString).toDate();

  // Add 5 hours and 30 minutes
  const adjustedDatetime = new Date(utcDatetime);
  adjustedDatetime.setHours(adjustedDatetime.getHours() + 5);
  adjustedDatetime.setMinutes(adjustedDatetime.getMinutes() + 30);

  // Convert to IST
  const istDatetime = moment(adjustedDatetime).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  return istDatetime;
};




export const convertDate = (date) => {
  const datetimeString = date;
  const datetime = new Date(datetimeString);
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, "0");
  const day = String(datetime.getDate()).padStart(2, "0");
  const hours = String(datetime.getHours()).padStart(2, "0");
  const minutes = String(datetime.getMinutes()).padStart(2, "0");
  const seconds = String(datetime.getSeconds()).padStart(2, "0");

  const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const utcDatetime = convertDateToUTC(formattedDatetime);
  return utcDatetime;
};
export const displaydateformat = (date) => {
  const originalDate = date;

  // Split the original date string into date and time parts
  const [datePart, timePart] = originalDate.split(" ");

  // Split the time part into hours, minutes, and seconds
  const [hours, minutes, seconds] = timePart.split(":");

  // Format the date string in the desired format
  const formattedDate = `${datePart}T${hours}:${minutes}:${seconds}Z`;
  return formattedDate;
};
export const convertDateTimeZone = (value) => {
  const datevalue = displaydateformat(value);
  const originalDateTime = moment(datevalue);

  // Detect user's time zone
  const timeZone = moment.tz.guess();

  // Convert to detected time zone
  const convertedDateTime = moment
    .tz(originalDateTime, timeZone)
    .format("DD/MM/YYYY HH:mm:ss");

  return convertedDateTime;
};
export const setdatetime = (value) => {
  // Convert to detected time zone
  const convertedDateTime = convertDateTimeZone(value);
  // ////console.log(value,"chhhh")
  const datetimeString = convertedDateTime;

  // For date
  // const [datePart, timePart] = datetimeString.split(" ");
  // const date = datePart;

  // // For time
  // const datetime = new Date(datetimeString);
  // const hours = datetime.getHours();
  // const minutes = datetime.getMinutes();
  // const amPM = hours >= 12 ? "PM" : "AM";
  // const displayHours = hours % 12 || 12;
  // const formattedTime = `${displayHours}:${minutes < 10 ? "0" : ""}${minutes} ${amPM}`;

  // const ans = date + " " + formattedTime;

  const dateTime = moment(convertedDateTime, "DD/MM/YYYY HH:mm:ss");

// Format the datetime string in PM format
  const pmFormattedDateTime = dateTime.format("DD/MM/YYYY h:mm A");

  return pmFormattedDateTime;
};



export const getPublicIpAddress = () => {
  const publicIPAddress = localStorage.getItem('publicIPAddress');
  if (!publicIPAddress || publicIPAddress !== null) {
      const peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      peerConnection.createDataChannel('');
      peerConnection.createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer))
          .catch((error) => console.log(error));
      peerConnection.onicecandidate = (event) => {
          // if (event && event?.candidate && !isLocalAddress((event?.candidate && event?.candidate?.address) ?? null)) {
          //     localStorage.setItem('publicIPAddress', (event?.candidate && event?.candidate?.address) ?? null);
          // }
          if (event?.candidate && event?.candidate?.candidate) {
              if (event?.candidate && event?.candidate?.candidate !== null) {
                  try {
                      const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
                      const ipAddress = (event?.candidate?.candidate?.match(ipRegex) ?? [])[0]; // Added nullish coalescing and array destructuring
                      if (ipAddress) {
                          localStorage.setItem('publicIPAddress', ipAddress);
                      } else {
                          console.error("Invalid IP address extracted.");
                      }
                  } catch (error) {
                      console.error("Error extracting IP address:", error);
                  }
              }
          }
      }
  }
}



// register validation funciton 

export const handleSubmitValidation = async (formData,) => {

  // Validation rules
  let errors = {};

  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{15}$/;

  
  if (!formData.name) {
    errors.name = "Name is required";
  }
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one capital letter";
  } else if (!/\d/.test(formData.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
    errors.password = "Password must contain at least one symbol";
  }
  if (!formData.password_confirmation) {
    errors.password_confirmation = "Confirm password is required";
  } else if (formData.password !== formData.password_confirmation) {
    errors.password_confirmation = "Passwords do not match";
  }
  if (!formData.phone_no) {
    errors.phone_no = "Phone number is required";
  } else if (!phoneRegex.test(formData.phone_no)) {
    errors.phone_no = "Invalid phone number format";
  }
  return errors;
}