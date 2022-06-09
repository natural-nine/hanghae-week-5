
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth,db } from "./shared/firebaseInit";
import { loadMagazine, loadComment } from "./shared/modules/magazine";
import {FaUserAlt} from "react-icons/fa";


const MainBox = styled.div`
    width: 500px;
    max-width: 600px;
    height: 100vh;
    border: 1px solid black;
    margin: auto;
    background-color: white;
`

const LoginBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 15px;
`

const LoginBtn = styled.button`
    border: none;
    margin-left: 15px;
    padding: 5px 28px;
    text-decoration: none;
    background-color: #5758BB;
    border-radius: 5px;
    :hover{
        cursor: pointer;
    }
  
`
const CommentMainBox = styled.div`
    width: 400px;
    height: 90vh;
    
    margin: auto;
    margin-top: 20px;
    overflow-y: auto;
`
const CommentBox = styled.div`
    margin-bottom: 25px;
    border-bottom: 1px solid black;
    margin-right: 8px;
`

const UserBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
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
    margin-bottom: 10px;
`

const ImgBox = styled.div`

`

const Img = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    :hover{
        cursor: pointer;
    }
`

const CommentsBox = styled.div` 
    margin-top: 5px;
`
const CommentSpan = styled.div`
`
const ImgCommentBoxTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;

`
const ImgTop = styled.img`
    width: 330px;
    height: 200px;
    border-radius: 10px;
    :hover{
        cursor: pointer;
    }
`
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, isSetLogin] = useState(false);
    // const [isLeft, setIsLeft] = useState(false);
    // const [isRight, setIsRight] = useState(false);
    // const [isTop, setIsTop] = useState(false);
    
    
    

    const loginCheck = (user) => {
        if(user){
            isSetLogin(true);
        }else{
            isSetLogin(false);
        };
        
    }
    useEffect(()=>{
        onAuthStateChanged(auth, loginCheck)
        dispatch(loadComment());

        
    },[])
    let commentList = useSelector((state)=>state.magazine.list)
    
    
    
    const goDetail = (idx) => {
        navigate("/detail/" + idx)
    }
    console.log(auth.currentUser, "this Current User")
    
    return(
    
        <MainBox>
        
        {isLogin ? (
        <LoginBox>
        <LoginBtn onClick={()=> {signOut(auth)}}  style={{textDecoration: 'none', color:"white"}}>Log Out</LoginBtn>
        <LoginBtn><Link style={{textDecoration: 'none' , color:"white"}} to={"/upload"}>Upload</Link></LoginBtn>
        </LoginBox>)
        :(
            <LoginBox>
            <LoginBtn><Link style={{textDecoration: 'none', color:"white"}} to={"/login"}>Login</Link></LoginBtn>
            <LoginBtn><Link style={{textDecoration: 'none', color:"white"}} to={"/join"}>Join</Link></LoginBtn>
            </LoginBox>
        )}
        <CommentMainBox>
        {commentList.map((i,idx)=>{
            
            if(i.imgLocation == "right"){
                return(
                <CommentBox>
                    <UserBox>
                        <div>
                        <span><UserFa/></span> <UserSpan>{i.nick_name_data}</UserSpan>
                        </div>
                        <div>
                        <span>{i.todayTime}</span>  
                        </div>
                    </UserBox>
                    <ImgCommentBox>
                        <CommentsBox>
                            <CommentSpan>{i.textValue}</CommentSpan>
                        </CommentsBox>
                        <ImgBox>
                            <Img onClick={()=> {goDetail(idx)}} src={i.isFileUrl} />
                        </ImgBox>
                    </ImgCommentBox>
                </CommentBox>
                )
            }else if(i.imgLocation == "top"){
                return(
                <CommentBox>
                    <UserBox>
                    <div>
                    <span><UserFa/></span> <UserSpan>{i.nick_name_data}</UserSpan>
                    </div>
                    <div>
                        <span>{i.todayTime}</span>
                    </div>
                    </UserBox>
                    
                    <ImgCommentBoxTop>
                        <ImgBox>
                            <ImgTop onClick={()=> {goDetail(idx)}} src={i.isFileUrl} />
                        </ImgBox>
                        <CommentsBox>
                            <CommentSpan>{i.textValue}</CommentSpan>
                        </CommentsBox>
                    </ImgCommentBoxTop>
                </CommentBox>)
            }else if(i.imgLocation == "left"){
                return(
                <CommentBox>
                    <UserBox>
                        <div>
                        <span><UserFa/></span> <UserSpan>{i.nick_name_data}</UserSpan>
                        </div>
                        <div>
                        <span>{i.todayTime}</span>
                        </div>
                    </UserBox>
                    <ImgCommentBox>
                        <ImgBox>
                            <Img  src={i.isFileUrl} onClick={()=> {goDetail(idx)}} />
                        </ImgBox>
                        <CommentsBox>
                            <CommentSpan>{i.textValue}</CommentSpan>
                        </CommentsBox>
                    </ImgCommentBox>
                </CommentBox>)
            }


            // <UserBox>
            //         <span><UserFa/></span> <UserSpan>User Nick Name</UserSpan>
            //     </UserBox>
            //     <ImgCommentBoxTop>
            //     <ImgBox>
            //         <ImgTop src={ha} />
            //     </ImgBox>
            //     <CommentBox>
            //         <CommentSpan>This is sample comments</CommentSpan>
            //     </CommentBox>
            //     </ImgCommentBoxTop>
            // return(

            //     <div onClick={()=>{goDetail(idx)}} key={idx}>
            //         <span>{i.textValue}</span>
            //         <img style={{width:"50px",height:"50px"}} src={i.fileUrl}/>
            //         <span>{i.nick_name_data}</span>
            //     </div>
            // )
        })}
        </CommentMainBox>
        </MainBox> 
    )
};

export default Home;

