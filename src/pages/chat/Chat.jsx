import  SockJs from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from 'react'

const Chat = () => {
    const client = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const inputRef = useRef("");
    console.log(chatMessages);

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

    //웹소켓과 연결
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: `wss://${process.env.REACT_APP_CHAT_URL}/ws-stomp/websocket`,
            WebSocketFactory: () => new SockJs("/ws-stomp"),
            connectheaders: {
              Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
              RefreshToken: sessionStorage.getItem("REFRESH_TOKEN")
            },
            debug: function (str) {
                console.log(str);
              },
              reconnectDelay: 5000,
              heartbeatIncoming: 4000,
              heartbeatOutgoing: 4000,
              onConnect: () => {
                // 구독을 통한 채팅방 연결
                // 처음 입장시 채팅방 서버에 입장한 것으로 인식
                subscribe();

                client.current.publish({
                  destination: "/pub/api/chat/room/enter/",
                  headers: {
                    Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
                    RefreshToken: sessionStorage.getItem("REFRESH_TOKEN"),
                  },
                  // 전송할 데이터를 입력
                  body: JSON.stringify({
                    // message: "OOO님이 입장하셨습니다",
                    // type:"ENTER",
                    message: "",
                    roomId: "6f6545db-93a5-4fe6-b22f-0bf4e6372f67",
                  }),
                });
              },
              onStompError: (frame) => {
                console.error(frame);
              },
            });
            
            client.current.activate();
          };

    // sockJS로 소켓 미지원 브라우저 대응하기
    if (typeof WebSocket !== "function") {
      client.webSocketFactory = () => {
        return new SockJs(process.env.REACT_APP_CHAT_URL);
      };
    };

    //연결 중단
    const disconnect = () => {
        client.current.deactivate();
    };

    //구독하기
    const subscribe = () => {
        client.current.subscribe(`/sub/api/chat/room/6f6545db-93a5-4fe6-b22f-0bf4e6372f67`, function (chat) {
          console.log(chat)
          let content = JSON.parse(chat.body);
          console.log(content);
          setChatMessages((_messages) => [
            ..._messages,
            {
             message: content.message, 
             sender: content.sender
            }
          ]);
      });
    };


    //메세지 보내기
    const publish = () => {
      console.log(inputRef.current.value)
    // console.log(JSON.stringify({
    //    message: inputRef.current.value,
    //    roomId: 'd48b2e0a-1c95-4309-be70-2e736d235ad8',
    // }));
      if (inputRef.current.value.trim() === "") {
        return;
      }
      if (!client.current.connected) {
        return;
      }
  
      client.current.publish({
        destination: "/pub/chat/message",
        headers: {
          Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
          RefreshToken: sessionStorage.getItem("REFRESH_TOKEN"),
        },
        body: JSON.stringify({ 
          type:"TALK",
          sender:"경복궁안에서 쇼핑하는 풀잎",
          message: inputRef.current.value,
          roomId: '6f6545db-93a5-4fe6-b22f-0bf4e6372f67' }),
      });
      console.log(client.current.publish.body)
      //보낸 후 채팅 초기화
      setMessage("");
    };

    return (
        <>
            <div>채팅방</div>
            <div>
                {chatMessages && chatMessages.length > 0 && (
                    <ul>
                        {chatMessages.map((_chatMessage, index) => (
                            <li key={index}>{_chatMessage.message}</li>
                        ))}
                    </ul>
                 )}
                <div>
                    <input
                      type={"text"}
                      placeholder={"message"}
                      ref={inputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={() => publish()}>send</button>
                 </div>
            </div>
        </>
    )
}

export default Chat
