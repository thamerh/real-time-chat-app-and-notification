import React,{useState} from 'react';
import {FormGroup,Label,Input,Form,Button,Container,Row,Col,Badge} from "reactstrap";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import './Singup.css';

function Singup() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const toast = useToast();
 

     
      const submitHandler= async (e) => {
        e.preventDefault();
        try {
          if (!name || !email || !password || !confirmpassword  || !pic) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
          
          if (password !== confirmpassword) {
        toast({
          title: "Passwords Do Not Match , please confirm your password ",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
  
          }else{
            console.log(name, email, password, pic);
            const formData = new FormData();

            formData.append('pic', pic)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)

            await axios.post('http://localhost:5000/Register', formData)
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setTimeout(window.location = "/login",2000);
          }
        } catch (error) {
            if (error.response) {
              toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            }
        }
      }
  return (
    <Container 
     style={{
        maxWidth:"500px",
      height:"625px",
      marginTop:"3.5%"
       }}>
   <Row>
     <Col  >
         <h1 className="font">Register</h1>
     <Form >
     <FormGroup>
     <Label for="name">
      Name
     </Label>
     <Input
       id="name"
       name="name"
       placeholder="Enter your name"
       type="text"
       value={name}
       onChange={(e) => setName(e.target.value)}
     />
   </FormGroup>
   <FormGroup>
     <Label for="exampleEmail">
       Email
     </Label>
     <Input
       id="exampleEmail"
       name="email"
       placeholder="Exemple@Email.com"
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
     />
   </FormGroup>
   <FormGroup>
     <Label for="examplePassword">
       Password
     </Label>
     <Input
       id="examplePassword"
       name="password"
       placeholder="****************"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     </FormGroup>
      <FormGroup>
     <Label for="ConfPassword">
       Confirmer Password
     </Label>
     <Input
       id="ConfPassword"
       name="Confpassword"
       placeholder="confirm password"
       type="password"
       value={confirmpassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
     />
   </FormGroup>
   <FormGroup>
    <Label for="exampleFile">
    image
    </Label>
    <Input
      id="exampleFile"
      name="file"
      type="file"
      accept="image/*"
      onChange={(e) => setPic(e.target.files[0])}
    />
  </FormGroup>
   <Badge

    href="/login"

  >
   you have an account?
  </Badge>
   <div style={{textAlign:"center"}}>
   <Button className="button" 
        onClick={submitHandler}
        >
     Register
   </Button>
   </div>

 </Form>
     </Col>
   </Row>
   </Container>
  
  )
}

export default Singup