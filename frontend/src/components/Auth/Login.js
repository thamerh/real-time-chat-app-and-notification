import React, { useState } from 'react';
import {FormGroup,Label,Input,Form,Button,Container,Row,Col,Badge} from "reactstrap";
import "./Login.css";
import axios, { Axios } from 'axios';
import { useHistory} from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const Auth = async (e) => {
        e.preventDefault();
        try {
          if ( !email || !password ) {
            alert( "Please Enter all the Feilds");
          }else{
            const { data} = await axios.post("http://localhost:5000/Login", {
              email: email,
              password: password
          });
        //localStorage.setItem("token",res.data);
         localStorage.setItem("userInfo", JSON.stringify(data));
       console.log(JSON.stringify(data))
      window.location = "/";
          }
	
        } catch (error) {
            if  (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			)  {
               alert(error.response.data.msg);
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