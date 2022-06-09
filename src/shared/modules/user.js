import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseInit";

const LOAD = 'user/LOAD';
const CREATE = 'user/CREATE';


const initialState = {
    list:[ ]
}


export const createUserFB = (user) => {
    return async function (dispatch) {
        const userData = await addDoc(collection(db, "user"),user)

        dispatch(createUser(userData));
    }
}

// const user_data = await addDoc(collection(db, "user"),{
//     user_id:id_ref.current.value,
//     nick_name_data:nick_ref.current.value,
//     password_data:password_ref.current.value
// })

const user = (state = initialState,  action = {} ) => {
    switch(action.type){
        case "user/LOAD":{
            return {
                list: action.user
            }
        }

        case 'user/CREATE':{
            const newUserList = [...state.list, action.user]
            return{
                ...state,
                list : newUserList
            };
        }
        default: return state;
    }
}

export function loadUser(user) {
    return { type: LOAD, user};
  }
export function createUser (user) {
    return { type: CREATE, user};
};

export default user;