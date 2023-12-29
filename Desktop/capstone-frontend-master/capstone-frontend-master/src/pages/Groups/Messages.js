import React, {useEffect, useRef} from 'react';

import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

import styled from "styled-components";

const StyledScrollToBottom = styled(BasicScrollToBottom)
  `
  padding: 1% 0;
  overflow: auto;
  flex: auto;
  `;
  function Messages({ messages, name }) {
    const scrollRef = useRef(null);
    useEffect(() => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    return (
      <StyledScrollToBottom>
        
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
        <div ref={scrollRef}></div>
      </StyledScrollToBottom>
    );
  }
  export default Messages;
  