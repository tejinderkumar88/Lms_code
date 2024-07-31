"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import { faPaperPlane, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatTimeFromISO } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import { SinglestudentChat } from "@/lib/features/tutorchat/singlestudentchatSlice";
import { sendChatfromTutor } from "@/lib/features/tutorchat/sendtutormessageSlice";
import {
  resetGlobalArray,
  updateGlobalArray,
} from "@/lib/features/tutorchat/updateMergedTutorSlice";
import { selectedChat_Id } from "@/lib/features/selectedchat/Selectedchatidslice";
import useInternetConnection from "@/lib/checkonline/Online";
import { fetchStudentChats } from "@/lib/features/tutorchat/tutorchatSlice";

const InstructorChatComponent = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [isopenchat, setisopenchat] = useState(false);
  const [tutorname, setTutorname] = useState("");
  const [singleChatId, setSingleChatId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [singlestudentchat, setSinglestudentchat] = useState([]);
  const [messageCounts, setMessageCounts] = useState({});
  const [Profilepic,setProfilepic] = useState(null)
  const tutorfortutor = useAppSelector(
    (state) => state.studentchats?.data?.getstudentData?.data
  );
  const [isChatLoading, setIsChatLoading] = useState(false);
  const singlestudentchats = useAppSelector(
    (state) => state.singlestudentchat.singlechatstudent.data
  );
  const selectedChatId = useAppSelector(
    (state) => state?.SelectedChatId?.selectedChat_Id
  );
  const [isSinglestudentloading, setIsSinglestudentloading] = useState(false);
  const isSidebar = useAppSelector((state) => state?.sidebarToggle.isOpen);
  const loading = useAppSelector((state) => state.studentchats?.data?.loading);
  const userId = localStorage.getItem("userid");
  const singlestudentchatssss = useAppSelector(
    (state) => state?.Mergedfortutor?.globalArray
  );
  const chatHistoryRef = useRef();
  const isOnline = useInternetConnection();

  const onScroll = () => {
    if (chatHistoryRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatHistoryRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;
      if (isNearBottom) {
        console.log("Reached bottom");
      }
      if (scrollTop === 0) {
        console.log("Reached top");
      }
    }
  };

  useEffect(() => {
    const listInnerElement = chatHistoryRef.current;
    console.log(listInnerElement, "fglkj");
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  const handleChatClick = (chatId, tutorname,profile_pic) => {
    setIsSinglestudentloading(true);
    dispatch(SinglestudentChat({ id: chatId }));
    dispatch(resetGlobalArray());
    dispatch(selectedChat_Id(chatId));
    setTutorname(tutorname);
    setisopenchat(true);
    setSingleChatId(chatId);
    setMessage("");
    setSinglestudentchat([]);
    console.log(profile_pic,"profile_pic")
    setProfilepic(profile_pic)
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && singleChatId) {
      const newMessage = {
        chat_id: singleChatId,
        message: message,
        timestamp: new Date().getTime(),
        receiver_id: singleChatId,
        sender: { id: userId },
      };

      // Dispatch action to update global state
      dispatch(
        sendChatfromTutor({
          message: message,
          chatId: singleChatId,
        })
      );

      // Dispatch action to update global state
      dispatch(updateGlobalArray(newMessage));

      if (!isOnline) {
        let storedMessages =
          JSON.parse(localStorage.getItem("offlineMessages")) || [];
        storedMessages.push(newMessage);
        const updatedMessagesString = JSON.stringify(storedMessages);
        localStorage.setItem("offlineMessages", updatedMessagesString);
        
      }


      // Clear message input
      setMessage("");
      dispatch(fetchStudentChats());
    }
  };

  const loadPreviousChats = () => {
    dispatch(
      SinglestudentChat({ id: chatId, skip: singlestudentchat?.length })
    );
    setIsChatLoading(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
    dispatch(fetchStudentChats());
  }, [dispatch]);

  useEffect(() => {
    if (singlestudentchats?.chat.length > 0) {
      let newArray = [];
      if (singlestudentchats.chat) {
        newArray = [...singlestudentchat, ...singlestudentchats.chat];
      }
      setSinglestudentchat(newArray);
      setIsChatLoading(false);
      setIsSinglestudentloading(false);
    } else {
      setIsSinglestudentloading(false);
    }
  }, [singlestudentchats]);

  useEffect(() => {
    scrollToBottom();
  }, [singlestudentchatssss]);

  // Notification count
  useEffect(() => {
    const countMap = {};
    singlestudentchatssss.forEach((message) => {
      const chatId = message.chat_id;
      countMap[chatId] = (countMap[chatId] || 0) + 1;
    });
    setMessageCounts(countMap);
  }, [singlestudentchatssss]);

  const offlineMessages = JSON.parse(localStorage.getItem("offlineMessages"));

  if (isOnline && localStorage.getItem("offlineMessages")) {
    offlineMessages?.forEach((message) => {
      dispatch(
        sendChatfromTutor({
          message: message,
          chatId: singleChatId,
        })
      );
    });
    localStorage.removeItem("offlineMessages");
  }


  console.log(tutorfortutor,"tutorfortutor")
  return (
    <>
      <div>
        <section
          className={`${isSidebar ? "sidebartoleft" : "sidebartoleft2"}`}
        >
          {false ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginTop: "200px",
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
                          {tutorfortutor?.map((chat) => (
                            <div
                              className={`chat_list ${
                                singleChatId === chat?.id ? "active_chat" : ""
                              }`}
                              key={chat?.id}
                              onClick={() => {
                                setChatId(chat?.id);
                                handleChatClick(chat?.id, chat?.student,chat?.profile_pic);
                              }}
                            >
                              <div className="chat_people">
                                <div className="chat_img">
                                  <Image
                                    width={300}
                                    height={300}
                                    src={chat?.profile_pic ? chat?.profile_pic : "/nouserrr.svg"}
                                    alt="image"
                                  />
                                </div>
                                <div className="chat_ib">
                                  <div className="d-flex justify-content-between">
                                    <h4 className="chat_person_name">
                                      {chat?.student}
                                    </h4>

                                    <div className=" description_chat_person">
                                     
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
                                    </div>
                                  </div>
                                  <p>{chat?.last_message?.message}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {isopenchat ? (
                        <div className="mesgs">
                          <div className="Profile_header">
                            <div className="chattingwth_wrap">
                              <div className="chat_img2 chattingwth">
                                <Image
                                  width={400}
                                  height={400}
                                  src={Profilepic ? Profilepic : "/nouserrr.svg"}
                                  alt="chatting with person image"
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
                                <div className="">
                                  <div className="reverserows">
                                    {singlestudentchatssss?.map((msg, index) =>
                                      msg.chat_id ==
                                      singlestudentchat[0]?.chat_id ? (
                                        <div
                                          key={index}
                                          className={
                                            msg?.sender?.id == parseInt(userId)
                                              ? "outgoing_msg"
                                              : "incoming_msg"
                                          }
                                        >
                                          <div
                                            className={
                                              msg?.sender?.id ==
                                              parseInt(userId)
                                                ? "sent_msg"
                                                : "received_msg"
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
                                              <p>{msg?.message}</p>
                                            </div>
                                          </div>
                                        </div>
                                      ) : null
                                    )}
                                  </div>
                                </div>

                                {singlestudentchat?.map((chat, index) => (
                                  <div key={chat?.id} className="reverserows">
                                    <div
                                      className={
                                        chat?.sender?.id == parseInt(userId)
                                          ? `outgoing_msg`
                                          : `incoming_msg`
                                      }
                                    >
                                      <div
                                        className={
                                          chat?.sender?.id == parseInt(userId)
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
                                ))}
                              </>
                            )}

                            {!isSinglestudentloading && (
                              <>
                                {singlestudentchats?.total_count !=
                                  singlestudentchat?.length &&
                                  singlestudentchat?.length > 7 && (
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
                              ? "Connect with your students"
                              
                              : "Connect  with Fluentie Tutors"}

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
    </>
  );
};

export default InstructorChatComponent;