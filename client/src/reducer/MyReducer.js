
// reducer ke under two parameter hunxa
//one is state and another is action
export const initialState =null;
export const reducer = (state, action) =>{
    if(action.type==="admin"){
        return action.payload;

    }
    return state;

}