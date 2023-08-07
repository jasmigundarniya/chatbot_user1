import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { database } from "./redux/firebase";
import {
  ref,
  push,
  onValue,
  remove,
} from "firebase/database";
import {MdDelete} from 'react-icons/md'

const UserChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const messagesArray = messagesData
        ? Object.keys(messagesData).map((messageId) => ({
            id: messageId,
            ...messagesData[messageId],
          }))
        : [];
      setChatMessages(messagesArray);
    });
  }, []);

//   const handleSendMessage = (e) => {
//     e.preventDefault();

//     if (newMessage.trim() === "") return;

//     const messageData = {
//       text: newMessage.trim(),
//       type: "user",
//       timestamp: Date.now(),
//     };

//     const messagesRef = ref(database, "messages");
//     push(messagesRef, messageData).then(() => {
//       setNewMessage("");
//     });
//   };

const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const messageData = {
      text: newMessage.trim(),
      type: "user",
      timestamp: Date.now(),
    };

    const messagesRef = ref(database, "messages");
    push(messagesRef, messageData).then(() => {
      setNewMessage("");

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("New Message", {
            body: newMessage.trim(),
            icon: "/path/to/icon.png",
          });

          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      });
    });
  };

  const handleClearAll = () => {
    const messagesRef = ref(database, "messages");
    remove(messagesRef).then(() => {
      setChatMessages([]);
    });
  };

  return (
    <>
      <form onClick={handleSendMessage} className="chat-form">
        <h1 className="admin">User1</h1>
        <div className="chat-messages">
          {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.type === "user" ? "msg" : "msg1"
                }`}
              >
                {message.text}
              </div>
          ))}
        </div>
         {/* <div className="chat-messages">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.type === "user" ? "msg" : "msg1"
              }`}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              {message.text}
              {hoveredMessageId === message.id && (
                <MdDelete
                  className="delete-icon"
                  onClick={() => {
                    const messageRef = ref(database, `messages/${message.id}`);
                    remove(messageRef);
                  }}
                />
              )}
            </div>
          ))}
        </div> */}
        <span className="bottom">
          <input
            type="text"
            placeholder="Message..."
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="chat-send-btn">Send</button>
          {/* <button className="chat-send-btn" onClick={handleClearAll}>Clear All</button> */}
        </span>
      </form>
    </>
  );
};

export default UserChat;
