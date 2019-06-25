const initialState = {
    isLoggedIn: false
}

const login = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {...state, isLoggedIn: true}

        case 'LOGOUT':
            return {...state, isLoggedIn: false}

    }
    return state
}

export default login