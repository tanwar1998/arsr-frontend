// types of action
const Types = {
    UPDATE_PERMANENT_STORE_KEY: 'UPDATE_PERMANENT_STORE_KEY',
};

const updateStoreKey = (data) => ({
    type: Types.UPDATE_PERMANENT_STORE_KEY,
    payload: data
});

export const updatePermanentStore = (data) => {
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_PERMANENT_STORE_KEY,
            payload: data
        })
    }
}

const actionData = {
        updateStoreKey,
        Types
    }
export default actionData;