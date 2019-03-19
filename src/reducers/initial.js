export const initial = (state={},action) =>{
  switch (action.type) {
    case 'INIT':
      return action;

    case "GET_DATA_USER":
      //return action;
      return {...state, me:action.payload}

    case "SET_USER_ID":
      console.log("FROM REDUCER:::: ACTION :", action.payload)
      return {...state, userId:action.payload}

    default:
      return state
  }
}
