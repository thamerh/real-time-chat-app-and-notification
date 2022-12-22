import React,{useState} from 'react';
import {FormGroup,Label,Input,Form,Button,Container,Row,Col,Badge} from "reactstrap";
// import {useHistory} from "react-router-dom";
import axios from "axios";
import './Singup.css';

function Singup() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    // const history = useHistory();
 

     
      const submitHandler= async (e) => {
        e.preventDefault();
        try {
          if (!name || !email || !password || !confirmpassword) {
           alert("Please Fill all the Feilds")
          }
          if (!pic) {
            alert("Uploading profile pictures is a must")
           }
          if (password !== confirmpassword) {
        alert(" Passwords Do Not Match , please confirm your password ")
  
          }else{
            console.log(name, email, password, pic);
            const formData = new FormData();

            formData.append('pic', pic)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)

            await axios.post('http://localhost:5000/Register', formData)
            window.location = "/login";
          }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.msg);
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