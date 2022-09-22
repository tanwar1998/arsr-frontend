
// types of action
const Types = {
    UPDATE_STORE_KEY: 'UPDATE_STORE_KEY',
};
// actions

const addProjectNewKey = (data) => ({
    type: Types.UPDATE_STORE_KEY,
    payload: data
});

export const updateStore = (data) => {
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_STORE_KEY,
            payload: data
        })
    }
}

export const updateLoader = (data) => {
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_STORE_KEY,
            payload: {
                key: 'loader',
                value: {
                    display: data
                }
            }
        })
    }
}

const exportData = {
    addProjectNewKey,
    Types
};

export default exportData;