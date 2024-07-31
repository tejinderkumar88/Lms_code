"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import {
  faPaperPlane,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { formatTimeFromISO } from "@/lib/utils";
import { getSingleChat } from "@/lib/features/studentchat/singlechatSlice";
import { sendChat } from "@/lib/features/studentchat/sendchatSlice";
import { Button, CircularProgress } from "@mui/material";
import {
  removeEntriesByUserId,
  updateForTutor_Merged_Array,
} from "@/lib/features/studentchat/updateMergedStudentSlice";
import { selectedChat_Idby_student } from "@/lib/features/selectedchat/selectedchatidbystudentslice";
import useInternetConnection from "@/lib/checkonline/Online";
import { fetchChats } from "@/lib/features/studentchat/studentchat";


const StudentChatComponent = () => {
  const dispatch = useAppDispatch();
  const chatHistoryRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isopenchat, setisopenchat] = useState(false);
  const [tutorname, settutorname] = useState("");
  const [singlestudentchat, setSinglestudentchat] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isSinglestudentloading, setIsSinglestudentloading] = useState(false);
  const [Profilepic,setProfilepic] = useState(null)
  const selectedChatId = useAppSelector(
    (state) => state?.SelectedChatByStudentReducer.selectedChat_Idby_student
  );
  const userId = localStorage.getItem("userid");
  const messageCounts = useAppSelector(
    (state) => state?.messageCounts?.messageCounts
  );

  const isOnline = useInternetConnection();

  const [singleChatId, setSingleChatId] = useState(null);
  const chats = useAppSelector((state) => state.createdchats.data.getData.data);
  const loading = useAppSelector(
    (state) => state.createdchats.data.getdataloader
  );

  const [isChatLoading, setIsChatLoading] = useState(false);

  const mergedMessage = useAppSelector(
    (state) => state?.tutorMergedMesage?.MergedMessage_For_Student
  );

  const singlechat = useAppSelector((state) => state.singlechat?.singlechat);

  const total_count_previous = useAppSelector(
    (state) =>
      state?.singlechat &&
      state?.singlechat?.singlechat &&
      state?.singlechat?.singlechat?.data &&
      state?.singlechat?.singlechat?.data?.total_count
  );

  const isLoading = useAppSelector((state) => state.singlechat.loading);

  const handleSetLastChat = (chatId) => {
    if (!selectedChatId) {
      localStorage.setItem("lastchatid", chatId);
    } else {
      localStorage.setItem("lastchatid", selectedChatId);
    }
  };

  const handleChatClick = (chatId, tutorname, profilepic) => {
    setIsSinglestudentloading(true);
    dispatch(getSingleChat({ id: chatId }));
    dispatch(removeEntriesByUserId({ userId, chatId }));
    settutorname(tutorname);
    setisopenchat(true);
    setSingleChatId(chatId);
    dispatch(selectedChat_Idby_student(chatId));
    setMessage("");
    setSinglestudentchat([]);
    setProfilepic(profilepic)
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && singleChatId) {
      dispatch(
        sendChat({
          receiver_id: singleChatId,
          message: message,
          chatId: singleChatId,
        })
      );

      const newMessage = {
        chat_id: singleChatId,
        message: message,
        timestamp: new Date().getTime(),
        receiver_id: singleChatId,
        sender: { id: userId },
      };
      dispatch(updateForTutor_Merged_Array(newMessage));


      if (!isOnline) {
        let storedMessages =
          JSON.parse(localStorage.getItem("offlineMessages")) || [];
        storedMessages.push(newMessage);
        const updatedMessagesString = JSON.stringify(storedMessages);
        localStorage.setItem("offlineMessages", updatedMessagesString);
      }
      setMessage(""); // Clear the input field after sending the message
      dispatch(fetchChats());
    }
  };

  const loadPreviousChats = () => {
    const skip = singlestudentchat.length;
    dispatch(getSingleChat({ id: chatId, skip: skip }));
    setIsChatLoading(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of submitting the form

      // Call the function to handle sending a message
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      const scrollHeight = chatHistoryRef.current.scrollHeight;

      const clientHeight = chatHistoryRef.current.clientHeight;
      chatHistoryRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (singlechat?.data?.chat?.length > 0) {
      let newArray = [];
      if (singlechat?.data?.chat) {
        newArray = [...singlestudentchat, ...singlechat?.data?.chat];
      }
      setSinglestudentchat(newArray);
      setIsChatLoading(false);
      setIsSinglestudentloading(false);
    } else {
      setIsSinglestudentloading(false);
    }
  }, [singlechat]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [mergedMessage]);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const isSidebar = useAppSelector((state) => state?.sidebarToggle.isOpen);

  // storing the sent message in offline mode

  const offlineMessages = JSON.parse(localStorage.getItem("offlineMessages"));

  if (isOnline && localStorage.getItem("offlineMessages")) {
    offlineMessages.forEach((message) => {
      dispatch(
        sendChat({
          receiver_id: message.receiver_id,
          message: message.message,
          chatId: message.chat_id,
        })
      );
    });
    localStorage.removeItem("offlineMessages");
  }

  console.log(Profilepic, "chats");

  return (
    <div>
      <section className={`${isSidebar ? "sidebartoleft" : "sidebartoleft2"}`}>
        {false ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="home-content">
            <div className="chat_wrapper">
              <div className="container">
                <div className="messaging">
                  <div className="inbox_msg">
                    <div className="inbox_people">
                      <div className="headind_srch">
                        <div className="recent_heading">
                          <h4>Chat</h4>
                        </div>
                      </div>
                      <div className="inbox_chat">
                        {chats?.length > 0 ? (
                          // Render chats if available
                          chats.map((chat) => (
                            <div
                              className={`chat_list ${
                                singleChatId === chat?.id ? "active_chat" : ""
                              }`}
                              key={chat?.id}
                              onClick={() => {
                                setChatId(chat?.id);
                                handleSetLastChat(chat?.id);
                                handleChatClick(chat?.id, chat?.tutor,chat?.profile_pic);
                              }}
                            >
                              <div className="chat_people">
                                <div className="chat_img">
                                  <Image
                                    width={400}
                                    height={400}
                                    src={chat?.profile_pic ? chat?.profile_pic : "/nouserrr.svg"}
                                    alt="sunil"
                                  />
                                </div>
                                <div className="chat_ib">
                                  <h5>
                                    {chat?.tutor}
                                    <span className="chat_date">
                                      {chat?.last_message === null
                                        ? " "
                                        : formatTimeFromISO(
                                            chat?.last_message?.created_at
                                          )}
                                    </span>
                                    {messageCounts[chat.id] &&
                                      selectedChatId != chat.id && (
                                        <span className="msg_count_notification">
                                          {messageCounts[chat.id]}
                                        </span>
                                      )}
                                  </h5>
                                  <p>{chat?.last_message?.message}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="chat_list_not_found">
                            <p>Find a tutor to chat with </p>
                            <Button
                              href="/findtutor"
                              variant="contained"
                              sx={{
                                backgroundColor: "darkblue",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "navy ", // Change color on hover if desired
                                  color :"white"
                                },
                              }}
                            >
                              Find Teacher
                            </Button>
                          </div>
                          // Render button to find teacher if no chats available
                        )}
                      </div>
                    </div>

                    {isopenchat ? (
                      <div className="mesgs">
                        <div className="Profile_header">
                          <div className="chattingwth_wrap">
                            <div className="chat_img2 chattingwth">
                              <Image
                                width={50}
                                height={50}
                                src={Profilepic ? Profilepic : "/nouserrr.svg"}
                                alt="sunil"
                              />
                            </div>
                            <div>
                              <h2 className="chattingwth">{tutorname}</h2>
                            </div>
                          </div>
                        </div>

                        <div className="msg_history" ref={chatHistoryRef}>
                          {isSinglestudentloading ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "50px",
                                marginBottom: "50px",
                                paddingTop: "50px",
                              }}
                            >
                              <CircularProgress />
                            </div>
                          ) : (
                            <>
                              {singlechat?.data?.chat?.length === 0 &&
                              singlestudentchat.length === 0 &&
                              mergedMessage?.length === 0 ? (
                                <div>
                                  <p className="start_chat">
                                    Start Chatting with {tutorname}
                                  </p>
                                </div>
                              ) : (
                                <>
                                  {/* Render chat messages here */}
                                  <div className="">
                                    <div className="reverserows">
                                      {mergedMessage &&
                                        mergedMessage?.map(
                                          (msg, index) =>
                                            msg?.chat_id == selectedChatId && (
                                              <div
                                                key={index}
                                                className={
                                                  msg?.sender?.id ==
                                                  parseInt(userId)
                                                    ? `outgoing_msg`
                                                    : `incoming_msg`
                                                }
                                              >
                                                <div
                                                  className={
                                                    msg?.sender?.id ==
                                                    parseInt(userId)
                                                      ? `sent_msg`
                                                      : `received_msg`
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      msg?.sender?.id !=
                                                      parseInt(userId)
                                                        ? "received_withd_msg"
                                                        : ""
                                                    }
                                                  >
                                                    <p>
                                                      {msg?.message}
                                                      {console.log(
                                                        msg?.message
                                                      )}
                                                      {console.log(msg)}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                        )}
                                    </div>
                                  </div>

                                  {/* Render messages from echoMessages */}

                                  {singlestudentchat &&
                                    singlestudentchat.map((chat, index) => {
                                      return (
                                        <div
                                          key={chat?.id}
                                          className="reverserows"
                                        >
                                          <div
                                            className={
                                              chat?.sender?.id ===
                                              parseInt(userId)
                                                ? `outgoing_msg`
                                                : `incoming_msg`
                                            }
                                          >
                                            <div
                                              className={
                                                chat?.sender?.id ===
                                                parseInt(userId)
                                                  ? `sent_msg`
                                                  : `received_msg`
                                              }
                                            >
                                              <div
                                                className={
                                                  chat?.sender?.id !==
                                                  parseInt(userId)
                                                    ? "received_withd_msg"
                                                    : ""
                                                }
                                              >
                                                <p>{chat?.message}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </>
                              )}
                            </>
                          )}
                          {!isSinglestudentloading && (
                            <>
                              {singlestudentchat.length !=
                                total_count_previous &&
                                singlestudentchat.length > 7 && (
                                  <div className="load_previous_chat_wrapper">
                                    <p
                                      className="previous_chat"
                                      onClick={loadPreviousChats}
                                    >
                                      {isChatLoading ? (
                                        <div className="loader"></div>
                                      ) : (
                                        <div className="load_prev_btn">
                                          <p>load previous chats ...</p>
                                        </div>
                                      )}
                                    </p>
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                        <div className="being_down_tolatest_chat">
                          <button
                            className="msg_send_btn down"
                            type="button"
                            onClick={scrollToBottom}
                          >
                            <FontAwesomeIcon icon={faCircleDown} />
                          </button>
                        </div>

                        <div className="type_msg">
                          <div className="input_msg_write">
                            <input
                              type="text"
                              className="write_msg"
                              placeholder="Type a message"
                              value={message}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                            />
                            <button
                              className="msg_send_btn"
                              type="button"
                              onClick={handleSendMessage}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="logo_chat_ui">
                        <p>
                          {localStorage.getItem("usertype") == "tutor"
                            ? "Connect with your students."
                            : "Connect with Fluentie Tutors"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentChatComponent;