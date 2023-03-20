export const initialState = {
    loading: false,
    data: [],
    error: {}
}

export const reducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {...state, loading: true}
        case "SUCCESS":
            return {...state, loading: false, data: action.payload}
        case "FAILURE":
            return {...state, error:action.error}
        default:
            return state;
    }
}