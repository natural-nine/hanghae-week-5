import { async } from "@firebase/util";
import {collection, getDoc, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"
import { useDispatch } from "react-redux";
import {db} from "../firebaseInit";

const LOAD = 'magazine/LOAD';
const DELETE = 'magazine/DELETE';
const UPDATE = 'marazine/UPDATE';


const initialState = {
    list:[ ]
  }

//   export const deleteWordFB = (wordId) => {
//     return async function (dispatch, getState) {
//       const docRef = doc(db, "my_dic", wordId);
//       await deleteDoc(docRef)
//       const wordList = getState().word.list;
//       const wordIndex = wordList.findIndex((b)=>{
//         return b.id == wordId
//       })
//       dispatch(deleteWord(wordIndex));
//     }
//   }
export const deleteImgAndComment = (commentId) => {
    return async function(dispatch, getState){
        const docRef = doc(db, "my_magazine", commentId);
        await deleteDoc(docRef);
        const commentList = getState().magazine.list;
        const magazineIndex = commentList.findIndex((v)=>{
            return v.id == commentId
        })
        dispatch(deleteMagazine(magazineIndex))
    }
}

export const updateComment = (commentId, editComment) => {
    return async function (dispatch, getState){
        const docRef =  doc(db, "my_magazine", commentId);
        console.log(docRef)
        await updateDoc(docRef, {textValue : editComment});
        
        const magazineList = await getState().magazine.list;
        const magazineInedex = magazineList.findIndex((v)=> {
            return v.id == commentId;
        })
        dispatch(updateMagazine(magazineInedex))
    }
}

// const onSubmit = async (e, commentId, editComment) => {
//     e.preventDefault();
//     const docRef = doc(collection(db, "my_magazine", commentId));
//     await updateDoc(docRef, { textValue: editComment});
// }


export const loadComment =  () => {
    return async function (dispatch){
        const commentData = await getDocs(collection(db,"my_magazine"));
    // console.log(commentData);
        let commentList = [];
        commentData.forEach((doc)=>{
        // console.log(doc.id, doc.data());
        commentList.push({id:doc.id, ...doc.data()})
        
        
    })
    dispatch(loadMagazine(commentList))   
    }
    
};


const magazine = (state = initialState,  action = {} ) => {
    switch(action.type){
        case "magazine/LOAD":{
            return {
                list: action.magazine
            }
        }
        case "magazine/DELETE":{
            const newMagazineList = state.list.filter((i, idx)=>{
                return action.magazine !== idx
            })
            return {
                list:newMagazineList
            }
        }
        case "magazine/UPDATE":{
            console.log(action.magazine);
            return {
                list:action.magazine
            }
            // const updateMagazine = state.list.map((i, idx)=>{
            //     if(action.magazine == idx){
            //         return {...i, }
            //     }
            // })
        }
        default: return state;
    }
}

export function loadMagazine(magazine) {
    return { type: LOAD, magazine};
};

export function deleteMagazine(magazine){
    return {type : DELETE,  magazine}
};

export function updateMagazine(magazine){
    return { type: UPDATE, magazine}
};


export default magazine;