import React,{useState} from 'react';
import { Box } from '@chakra-ui/layout';
import { AiOutlineSearch,AiOutlineMessage,AiOutlineArrowDown} from "react-icons/ai";
import { Input } from "@chakra-ui/input";

import { Text } from '@chakra-ui/layout';
import { Avatar, 
  MenuDivider, 
  MenuList,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
 } from '@chakra-ui/react'
import axios from "axios";
import UserItem from "./UserList/UserItem"
import { useToast } from "@chakra-ui/toast";
  import {useDisclosure} from '@chakra-ui/hooks'
  import { Spinner } from "@chakra-ui/spinner";
import { Button, Menu, MenuButton, MenuItem } from '@chakra-ui/react';
import { ChatState } from "../context/ChatProvider";
import ProfileModel from "./Model/ProfileModel"
import ChatLoading from './ChatLoading';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
	const { user,setSelectedChat,chat, setChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const toast = useToast();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location = "/login"
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
      console.log(searchResult)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/chat`, { userId }, config);

      if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
    <Box  display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="1px">
<Button variant="ghost" onClick={onOpen}><AiOutlineSearch/>
 <Text display={{base:"none",md:"flex"}} px="3" >
  Search User
  </Text>
  </Button>
  <Text fontSize="2xl" fontFamily="fantasy" >
  FakRouN
  </Text>
  <div>
    <Menu >
      <MenuButton p={1}>
        <AiOutlineMessage size="23px" mt={5}/>
      </MenuButton>
    </Menu>  
    <Menu >
      <MenuButton as={Button} rightIcon={<AiOutlineArrowDown/>} >
     <Avatar size='sm' cursor={'pointer'} name={user.name} src={user.pic}/>
      </MenuButton>
      <MenuList>
        <ProfileModel user={user}>
          <MenuItem>My Profile</MenuItem>
        </ProfileModel>
        <MenuDivider/>
        <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
      </MenuList>
    </Menu>  
  </div>
    </Box>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
              
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;