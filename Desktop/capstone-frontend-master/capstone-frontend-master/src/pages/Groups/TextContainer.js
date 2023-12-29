import React from 'react';
import Box from '@mui/material/Box';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { Link, useParams } from 'react-router-dom'; 

function TextContainer({ users }) {
  return (
    <div>
      {users ? (
          <Box>
            <h3>
              {users.map((element) => (
                <Box key={element.id} sx={{display:'flex'}}>
                  <MarkChatUnreadIcon sx={{display:'flex',m:0.5, marginLeft:3 , color:'green'}} />
                  <Link to={`/notes/${element.id}`}>{element.name}</Link>
                  {/* {element.name} */}
                </Box>
              ))}
            </h3>
          </Box>

      ) : null}
    </div>
  );
}

export default TextContainer;