import React from 'react'
import { Box } from "@chakra-ui/layout";
import Chatbox from "./ChatBox";
 import MyChats from "./MyChats";
 import SideDrawer from "./SideDrawer.js";
import { ChatState } from "../context/ChatProvider";
function Chat() {
	const { user } = ChatState();
	return (
		<div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box 
	    display="flex" 
	    justifyContent="space-between"
	    w="100%"
	    h="91.5vh" 
		p="10px">
        {user && <MyChats  />}
        {user &&  <Chatbox />}
      </Box>
    </div>
	);
 
}

export default Chat



 
