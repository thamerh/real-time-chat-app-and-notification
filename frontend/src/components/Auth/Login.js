import React, { useState } from 'react';
import {FormGroup,Label,Input,Form,Button,Container,Row,Col,Badge} from "reactstrap";
import "./Login.css";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

function Login() {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const Auth = async (e) => {
        e.preventDefault();
        try {
          if ( !email || !password ) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }else{
            const { data} = await axios.post("http://localhost:5000/Login",{
              email: email,
              password: password
          });
        //localStorage.setItem("token",res.data);
        if(!data.token){
           toast({
            title: "Error !",
            description: data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }else{
          localStorage.setItem("userInfo", JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setTimeout(window.location = "/",2000);
          console.log(JSON.stringify(data))
          
        }
       
      
          }
	
        } catch (error) {
            if  (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			)  {
        toast({
          title: "user not found!",
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
    className="container"
     style={{
       marginTop:"25vh",
       maxWidth:"500px",
      }}>
     <Row >
       <Col >
        <h1 className="font">Login </h1>
    <Form onSubmit={Auth}>
      <FormGroup>
       <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Exemple@Email.com"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </FormGroup>
       <FormGroup>
       <Label for="examplePassword">Password </Label>
         <Input
           id="examplePassword"
           name="password"
           placeholder="****************"
           type="password" 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
      </FormGroup>
       <Badge href="/singup">Don't have an account? </Badge>
       <div style={{textAlign:"center"}}>
        <Button className="button" > Login</Button>
       </div>

      </Form>
     </Col>
    </Row>
  </Container>
 
  )
}

export default Login