
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadComment, updateComment } from "./shared/modules/magazine";
import styled from "styled-components";

const MainBox = styled.div`
    width: 500px;
    max-width: 600px;
    height: 100vh;
    border: 1px solid black;
    margin: auto;
    background-color: white;
`

const Edit = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [isText, setIsText] = useState("");

    useEffect(()=>{
        dispatch(loadComment());
    },[])

    let commentBox = useSelector((state)=>state.magazine.list)
    const commentId = commentBox[params.id]?.id


    const onSubmit = (e) => {
        dispatch(updateComment(commentId,isText));
        e.preventDefault();
        navigate("/")
    }
    
    const onChange = (e) => {
        setIsText(e.target.value);
    }

    return(
        <>
        <MainBox>
        <h1>This is Edit Page</h1>
        <form onSubmit={onSubmit} >
            {/* <input type="file" accept="image/*" onChange={onChange}/> */}
            <input type="text" onChange={onChange}  placeholder={commentBox[params.id]?.textValue} />
            <button>Submit</button>
        </form>
        </MainBox>
        </>
    )
};

export default Edit;