import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const ChatForm = () => {
  const [name, setName] = useState("");
  const [chatRoom, setChatRoom] = useState([]);

  console.log(chatRoom)
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chat`);
    console.log(res)
    setChatRoom(res.data)
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeHandler = (event, setState) => setState(event.target.value);
  const onSubmit = async (e) => {
    const data = {
      name:name
    }
    try{
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/chat/room?name=${name}`, data);
    }catch{}
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => onChangeHandler(event,setName)}
      />
      <button onClick={onSubmit}>생성</button>
    </div>
  )
}

export default ChatForm;
