import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./Model/GroupChatModal";
import { Button } from "@chakra-ui/react";

function MyChats({fetchAgain}) {
    const { user,selectedChat,setSelectedChat,chat, setChat } = ChatState();
    const [loggedUser, setLoggedUser] = useState();
  
    const toast = useToast();
  
    const fetchChats = async () => {
      // console.log(user._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get("/chat", config);
        setChat(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
  
    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
      // eslint-disable-next-line
    }, [fetchAgain]);
    return (
        <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="88%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chat ? (
          <Stack overflowY="scroll">
            {chat.map((Chat) => (
              <Box
                onClick={() => setSelectedChat(Chat)}
                cursor="pointer"
                bg={selectedChat === Chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === Chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={Chat._id}
              >
                <Text>
                  {!Chat.isGroupChat
                    ? getSender(loggedUser, Chat.users)
                    : Chat.chatName}
                </Text>
                {Chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{Chat.latestMessage.sender.name} : </b>
                    {Chat.latestMessage.content.length > 50
                      ? Chat.latestMessage.content.substring(0, 51) + "..."
                      : Chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
    );
}

export default MyChats;

