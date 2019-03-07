function auth(state = {}, action){
	switch(action.type){
		case'SET_USER_DATA':{
			return {...state, ...action.payload}
		}
		case'SET_TOKEN':{
			return {...state, ...action.payload}
		}
		default:
			return state;
	}
}

export default auth;