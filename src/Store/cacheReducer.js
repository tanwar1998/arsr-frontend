import ACTIONS from "./cacheAction";

export let cacheReducerState = {
    data: {
        // Enter the keys, in alphabetical order\```
        employeeData : {
            data:[],
            isAlreadyCalled:false
        },
    },
};

const projectReducer = (state = cacheReducerState, action) => {
    switch (action.type) {
        case ACTIONS.Types.UPDATE_STORE_KEY: {
            var newState = JSON.parse(JSON.stringify(state));
            const data = action.payload;
            newState.data[data.key] = data.value;
            return newState;
        }
        default:
            return state;
    }
};

export default projectReducer;
