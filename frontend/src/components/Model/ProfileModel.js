import React from 'react';
import {useDisclosure} from '@chakra-ui/hooks'
import { IconButton } from '@chakra-ui/react';
import { AiTwotoneEye} from "react-icons/ai";
import { Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,ModalFooter,ModalHeader,Button ,Text,Image, } from '@chakra-ui/react';




function ProfileModel({user,children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <>
        
            {
            children ? <span onClick={onOpen}>{children}</span>:(
                <IconButton 
                  d={{base:"flex"}}
                  icon={<AiTwotoneEye/>}
                  onClick={onOpen}

                >

                </IconButton>
            )
            }
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "15px", md: "25px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            
      
     </> ;
    
};

export default ProfileModel;