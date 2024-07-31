import Echo from "laravel-echo";
import { broadcastAuthInstance } from "./apiCalls";

const EchoConfig = () => {


  window.Pusher = require("pusher-js");
  broadcastAuthInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  window.Echo = new Echo({
    broadcaster: "pusher", 
    key: process.env.NEXT_PUBLIC_DEMO_PUSHER_KEY,
    wsHost:  process.env.NEXT_PUBLIC_WS_HOST,
    wsPort: process.env.NEXT_PUBLIC_WS_PORT,
    forceTLS: false,
    disableStats: true,
    authorizer: (channel, option) => {
      return {
        authorize: (socketId, callback) => {
          broadcastAuthInstance
            .post("auth", {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              console.log(response, 'broad');
              callback(false, response.data);
            })
            .catch((error) => {
              // console.log(response, 'broaderror');
              callback(true, error);
            });
        },
      };
    },
  });
};

export default EchoConfig;
