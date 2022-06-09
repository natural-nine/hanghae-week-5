
import React, { useEffect, useState } from "react";
import {auth, db, storage} from "./shared/firebaseInit"
import {ref,uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc, collection,getDoc,getDocs, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loadMagazine } from "./shared/modules/magazine";
import { Link, useNavigate } from "react-router-dom";
import { createUserFB } from "./shared/modules/user";
import styled from "styled-components";
import {FaHome, FaUserAlt} from "react-icons/fa"
import ha from "./image/ha.jpg"



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
    padding: 15px 10px;
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

const Select = styled.select`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-top: 20px;
    margin-left: 37px;
`

const ExampleBox = styled.div`
    margin-top: 20px;
    width: 420px;
    height: 300px;
    
    margin: auto;
    margin-top: 15px;
`
const UserBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
`
const UserFa = styled(FaUserAlt)`

`
const UserSpan = styled.span`
    margin-left: 10px;
`
const ImgCommentBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ImgCommentBoxTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgBox = styled.div`
    
`

const Img = styled.img`
    width: 200px;
    height: 200px;
`

const CommentBox = styled.div`
    margin-top: 10px;
`
const CommentSpan = styled.span`
    margin-right: 10px;
`
const ImgTop = styled.img`
    width: 350px;
    height: 200px;
`

const Upload = () => {
   const dispatch = useDispatch();
   const fileRef = React.useRef(null);
   const textRef = React.useRef(null);
   const navigate = useNavigate();
   const [isTop, setIsTop] = useState(false);
   const [isLeft, setIsLeft] = useState(false);
   const [isRight, setIsRight] = useState(false);
   const [imgLocation, setImgLocation] = useState("")
   const [isFileUrl, setIsFileUrl] = useState("");
   const [isCurrnetUser, setIsCurrentUser] = useState(false);
  


   const loadComment = async () => {
        const commentData = await getDocs(collection(db,"user"));
        // console.log(commentData);
        let commentList = [];
        commentData.forEach((doc)=>{
            // console.log(doc.id, doc.data());
            commentList.push({id:doc.id, ...doc.data()})
            console.log(commentList)
            dispatch(loadMagazine(commentList))   
        })
    };
    
    

    useEffect(()=>{
        loadComment();
        if(auth.currentUser != null){
            setIsCurrentUser(true);
        };
    },[])
    let fileUrl = "";
    let imgLocationEvent = "";

    const selectVlaue =  (e) => {
        console.log(e.target.value)
        imgLocationEvent = e.target.value;
        if(imgLocationEvent == "top"){
            setIsTop(true)
            setIsLeft(false)
            setIsRight(false)
            setImgLocation("top")
    
        }else if(imgLocationEvent == "left"){
            setIsLeft(true)
            setIsTop(false)
            setIsRight(false)
            setImgLocation("left")
            
        }
        else {
            setIsRight(true)
            setIsTop(false)
            setIsLeft(false)
            setImgLocation("right")
        }     
    }
    
    
   
    const onChange = async (e) => {
        
        const uploadFile = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`),
        e.target.files[0]
        )

        fileUrl = await getDownloadURL(uploadFile.ref)
        
        fileRef.current = { url : fileUrl};
        console.log(e.target.files[0], "this is ffile")
        console.log(fileUrl, "this is ffile")
        setIsFileUrl(fileUrl);
    }

    const currnetUserEmail = auth.currentUser?.email
    console.log(currnetUserEmail)
    let commentBox = useSelector((state)=>state.magazine.list)
    let nick_name_data
    
    commentBox.map((i,idx)=>{

        if(i.user_id == currnetUserEmail){
            nick_name_data = i.nick_name_data   
        }
    })
    
    
    
    const onSubmit = async (e) => {
        
        e.preventDefault();
        let today = new Date();
        const todayTime = today.toLocaleString();
        const textValue = textRef.current.value;
        console.log(imgLocation)
        if(imgLocation == "" || textValue == ""){
            alert("Please select img posision or write comment")
        }
        else{
            const docRef = await addDoc(collection(db, "my_magazine"),{
                textValue,
                isFileUrl,
                nick_name_data,
                currnetUserEmail,
                imgLocation,
                todayTime,
            })
            console.log(docRef)
            console.log(fileUrl)
            navigate("/")
        }
        
    };
    
    
   
    
    
    return(
        
        <MainBox>
            {isCurrnetUser ? (<><HomeBox><Link to="/"><HomeBtn/></Link></HomeBox>
            <Form onSubmit={onSubmit}>
                <InputBox>
                <Span>Image</Span>
                <Input type="file" accept="image/*" onChange={onChange}/>
                </InputBox>
                <InputBox>
                <Span>Comment</Span>  
                <Input  type="text" ref={textRef} />
                </InputBox>
                
        
                
                <SubmitBtn>Send</SubmitBtn>
            </Form>
            <Select onChange={selectVlaue}>
                    <option value="">Please select img position</option>
                    <option value="right">post img right comment left</option>
                    <option value="left">post img left comment right</option>
                    <option value="top">post img top comment bottom</option>
            </Select></>) : (<span>11</span>)}
            
            
            
            {isLeft ? (<ExampleBox>
                <UserBox>
                    <span><UserFa/></span> <UserSpan>User Nick Name</UserSpan>
                </UserBox>
                <ImgCommentBox>
                <ImgBox>
                    <Img src={ha} />
                </ImgBox>
                <CommentBox>
                    <CommentSpan>This is image and comment</CommentSpan>
                </CommentBox>
                </ImgCommentBox>
            </ExampleBox>):("")}
            {isRight ? (<ExampleBox>
                <UserBox>
                    <span><UserFa/></span> <UserSpan>User Nick Name</UserSpan>
                </UserBox>
                <ImgCommentBox>
                <CommentBox>
                    <CommentSpan>This is image and comment</CommentSpan>
                </CommentBox>
                <ImgBox>
                    <Img src={ha} />
                </ImgBox>
                </ImgCommentBox>
            </ExampleBox>): ("")}
            {isTop ? (<ExampleBox>
                <UserBox>
                    <span><UserFa/></span> <UserSpan>User Nick Name</UserSpan>
                </UserBox>
                <ImgCommentBoxTop>
                <ImgBox>
                    <ImgTop src={ha} />
                </ImgBox>
                <CommentBox>
                    <CommentSpan>This is sample image and comment</CommentSpan>
                </CommentBox>
                </ImgCommentBoxTop>
            </ExampleBox>):("")}    
        </MainBox>
        
    )
};

export default Upload;