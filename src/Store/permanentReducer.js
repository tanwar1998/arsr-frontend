import ACTIONS from "./permanentAction";

export let permanentReducerState = {
    data: {
        // Enter the keys, in alphabetical order
        
        user: {
            isLogin: false,
            profile: {},
            isAlreadyCalled: false
        },
    }
};

const todoReducer = (state = permanentReducerState, action) => {
    switch (action.type) {

        case ACTIONS.Types.UPDATE_PERMANENT_STORE_KEY: {
            var newState = JSON.parse(JSON.stringify(state));
            const data = action.payload;
            newState.data[data.key] = data.value
            return newState;
        }

        default:
            return state;
    }
};

export default todoReducer;
