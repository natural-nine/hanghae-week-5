import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./shared/firebaseInit";
import styled from "styled-components"
import {FaHome} from "react-icons/fa"

const MainBox = styled.div`
    width: 500px;
    max-width: 600px;
    height: 100vh;
    border: 1px solid black;
    margin: auto;
    background-color: white;
`

const HomeBox = styled.div`
    display: flex;
    justify-content: flex-start;  
`

const HomeBtn = styled(FaHome)`
    
    background-color: #5758BB;
    color: white;
    padding: 5px;
    border-radius:5px;
    margin: 10px 0px 5px 40px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`
const Span = styled.span`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    font-size: 5px;
    text-decoration: underline;
    color: #006266;
`

const Input = styled.input`
    width: 400px;
    height: auto;
    border-radius: 5px;
    padding: 10px 10px;
    border: 1px solid #5758BB;
`
const SubmitBtn = styled.button`
    margin-top:20px;
    width: 425px;
    height: auto;
    background-color: #5758BB;
    padding: 10px 10px;
    border: none;
    color:white;
    border-radius: 5px;
`
const FailLogin = styled.span`
    margin-top: 20px;
    color:#ED4C67;
`

const Login = () => {
    const navigate = useNavigate();
    const id_ref = React.useRef(null);
    const password_ref = React.useRef(null);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [isCurrnetUser, setIsCurrentUser] = useState(false);

    useEffect(()=>{
        if(auth.currentUser != null){
            setIsCurrentUser(true);
        }else if(auth.currentUser == null){
            setIsCurrentUser(false)
        };
    },[])

    try{

    }
    catch(errot){

    }
    const onSubmit = async (e) => {
        

        try{
            e.preventDefault();
            const id = id_ref.current.value;
            const password = password_ref.current.value;
            const user = await signInWithEmailAndPassword(
            auth,
            id,
            password,
        )
        console.log(user);
        navigate("/")

        }
        catch(error){
            setIsError(true)
            setErrorText(error.message)
        } 
       
    }

    return(
        
        <MainBox>
            {isCurrnetUser ? ("") : (<><HomeBox>
            <Link to={"/"}><HomeBtn/></Link>
            </HomeBox>
        <Form onSubmit={onSubmit}>
            <InputBox>
                <Span>Email</Span>
                <Input name="email" type="email" placeholder="Email" ref={id_ref}/>
            </InputBox>
            <InputBox>
                <Span>Password</Span>
                <Input name="password" type="password" placeholder="Password" ref={password_ref}/>
            </InputBox>
            <SubmitBtn>Login</SubmitBtn>
            {setIsError ? (<FailLogin>{errorText}</FailLogin>) : ("")}
        </Form></>)}
            
 
        </MainBox>  
             
    )
};

export default Login;