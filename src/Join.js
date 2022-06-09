import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {auth, db} from "./shared/firebaseInit"
import {createUserWithEmailAndPassword} from "firebase/auth";
import styled from "styled-components";
import {FaHome} from "react-icons/fa"
import { useDispatch } from "react-redux";
import { createUserFB } from "./shared/modules/user";

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
    :hover{
        cursor: pointer;
    }
`

const FailJoin = styled.span`
    margin-top: 20px;
    color:#ED4C67;
`


const Join =  () => {
    const navigate = useNavigate();

    // form 유저정보 text 가져오기
    const id_ref = React.useRef(null);
    const nick_ref = React.useRef(null);
    const password_ref = React.useRef(null);
    const passwordConfirm_ref = React.useRef(null);

    const dispatch = useDispatch();

    // form 유저 data  
    const [isData, isSetData] = useState(false);
    const [isPassword, isSetPassword] = useState(false);
    const [leastPassword, setLeastPassword] = useState(false);
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
    
    const onSubmit = async (e) => {
       
    // 각각 변수에 text 저장 
    let userId = id_ref.current.value;
    let userNick = nick_ref.current.value;
    let userPassword = password_ref.current.value;
    let userPasswordCon = passwordConfirm_ref.current.value;
    
    
        // firebase error message 메일 양식이 틀렸는지 중복메일 있는지 가져오기 위해 try catch 사용     
        try{
            //  form data  비어 있으면 멈춤 
            if(userId == "" || userNick == "" || userPassword == "" || userPasswordCon == ""){
                // useState isSetData true면 메세지 띄움
                isSetData(true)
                setLeastPassword(false)
                isSetPassword(false)
                e.preventDefault();
            //  form password data  다르면 멈춤 
            }else if(userPassword !== userPasswordCon){
                // useState isSetPassword true면 메세지 띄움
                isSetPassword(true);
                // 다른 message 삭제
                isSetData(false);
                setLeastPassword(false);
                e.preventDefault();
            //  form password data 5자 이하면 다르면 멈춤 
            }else if(userPassword.length <= 5){
                // useState  true면 메세지 띄움
                setLeastPassword(true)
                // 다른 message 삭제
                isSetPassword(false)
                isSetData(false)
                e.preventDefault();
            }
            else{
                e.preventDefault();
                // 유저정보 firebase에 저장
            const user = await createUserWithEmailAndPassword(
                auth,
                userId,
                userPassword,
                
            );
            const userObj = {
                user_id:userId,
                nick_name_data:userNick,
                password_data:userPassword
            }
    
            userId = "";
            userNick = "";
            userPassword = "";
            userPasswordCon = "";
    
            dispatch(createUserFB(userObj))
            
            navigate("/")
            }
        } catch(error){
            setErrorText(error.message);
            setIsError(true);
            isSetData(false)
            isSetPassword(false)
            setLeastPassword(false)
        }
        

    }
    console.log(isCurrnetUser ,"hah")
    return(
        
        <MainBox>
            {isCurrnetUser ? (<></>) : (<><HomeBox>
        <Link to={"/"}><HomeBtn/></Link>
        </HomeBox>
        <Form onSubmit={onSubmit}>
            <InputBox>
            <Span>Email</Span>
            <Input type={"email"} ref={id_ref} placeholder="Email" />
            </InputBox>

            <InputBox>
            <Span>Nick Name</Span>
            <Input type={"text"}  ref={nick_ref} placeholder="Nick Name" />
            </InputBox>

            <InputBox>
            <Span>Passowrd</Span>
            <Input type={"password"}  ref={password_ref} placeholder="Password"/>
            </InputBox>

            <InputBox>
            <Span>Password Confirm</Span>
            <Input type={"password"}  ref={passwordConfirm_ref} placeholder="Password Confirm"/>
            </InputBox>
            <SubmitBtn>Submit</SubmitBtn>
            {isData ? (<FailJoin>Please Write user information</FailJoin>) : ("")}
            {isPassword ? (<FailJoin>Please Check password and password confirm</FailJoin>) : ("")}
            {leastPassword ? (<FailJoin>Password must be lat least 6 characters</FailJoin>) : ("")}
            {isError ? (<FailJoin>{errorText}</FailJoin>) : ("")}
        </Form></>)}
        
            
        </MainBox>
        
    )
};

export default Join;

// const user_data = await addDoc(collection(db, "users"), {user_id: "1111", name: "perl"});
// console.log(user_data.id);
// }
