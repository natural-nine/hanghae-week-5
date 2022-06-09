import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth,db } from "./shared/firebaseInit";
import { loadComment,deleteImgAndComment } from "./shared/modules/magazine";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth"
import styled from "styled-components";
import {FaHome,FaUserAlt} from "react-icons/fa";



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
const BtnBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0px 5px -15px; 
`
const GoBtn = styled.button`
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

const DetailBox = styled.div`
    margin-top: 20px;
    width: 270px;
    height: 300px;
    
    margin: auto;
    margin-top: 15px;
    
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

const ImgCommentBoxTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ImgTop = styled.img`
    width: 270px;
    height: 200px;
`

const ImgBox = styled.div`
`   
const CommentBox = styled.div`
    margin: 10px 0px;
`

const WirteForm = styled.form`

`

const WirteInput = styled.input`
    width: 250px;
    padding: 10px;
`
const WirteSubmit = styled.button`
    margin-top: 10px;
    border: none;
    text-decoration: none;
    background-color: #5758BB;
    border-radius: 5px;
    color: white;
    :hover{
        cursor: pointer;
    }
    font-size:15pxpx ;
`

const Detail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [isLogin, isSetLogin] = useState(false);
    const [isDelete, isSetDelete] = useState(false);
    
    useEffect(()=>{
        onAuthStateChanged(auth, loginCheck);
        compareUser()
        // if(commentOwner == currnetUserEmail){
        //     isSetDelete(true)
        // }else{
        //     isSetDelete(false)
        // }
        dispatch(loadComment());

        
    },[])

    const loginCheck = (user) => {
        if(user){
            isSetLogin(true);
        }else{
            isSetLogin(false);
        };
        
    }

    const compareUser = () => {
        if(commentOwner == currnetUserEmail){
            isSetDelete(true)
        }else{
            isSetDelete(false)
        }
    }
    
    
    let commentBox = useSelector((state)=>state.magazine.list)

    const detailComment = commentBox[params.id];
    const deleteComment = commentBox[params.id]?.id
    const commentOwner = detailComment?.currnetUserEmail;
    const currnetUserEmail = auth.currentUser?.email;

    
   const deleteDetail = (id) => {
    dispatch(deleteImgAndComment(id))
    alert("Delete complete!")
    navigate("/")
   };
    const onClick = (e) => {
        e.preventDefault()
        alert("댓글 구현 안 함.. 힘듦.. 시간 부족..")
    }
    
    return(
        
        <MainBox>
            <HomeBox>
                <Link to={"/"}><HomeBtn/></Link>
            </HomeBox>
        
        <DetailBox>
                    <UserBox>
                    <div>
                    <span><UserFa/></span> <UserSpan>{detailComment.nick_name_data}</UserSpan>
                    </div>
                    <div>
                        <span>{detailComment.todayTime}</span>
                    </div>
                    </UserBox>
            <ImgCommentBoxTop>
            <ImgBox>
            <ImgTop src={detailComment?.isFileUrl}/>
            </ImgBox>
            <CommentBox>
            <span>{detailComment?.textValue}</span>
            </CommentBox>
            </ImgCommentBoxTop>
           {isDelete && isLogin ? (
           <BtnBox>
               <GoBtn style={{textDecoration: 'none', color:"white"}} onClick={()=>{deleteDetail(deleteComment)}}>Delete</GoBtn>
               <GoBtn><Link style={{textDecoration: 'none' , color:"white"}} to={"edit"}>Edit Text</Link></GoBtn>
           </BtnBox>)
           :
           (<span></span>)}
           {isLogin ? (
                
               <WirteForm onSubmit={onClick}>
                   <WirteInput placeholder="Wirte Comment" />
                   <WirteSubmit>Submit</WirteSubmit>
               </WirteForm>
               )
               :(
                   <WirteForm onSubmit={onClick}>
                   <WirteInput placeholder="Please Sign-in and Log-in" readOnly="readonly" />
                   
                   </WirteForm>
                   )} 
                   </DetailBox>
        </MainBox>
        // <LoginBox>
        // <LoginBtn onClick={()=> {signOut(auth)}}  style={{textDecoration: 'none', color:"white"}}>Log Out</LoginBtn>
        // <LoginBtn><Link style={{textDecoration: 'none' , color:"white"}} to={"/upload"}>Upload</Link></LoginBtn>
        // </LoginBox>
    )
};


export default Detail;