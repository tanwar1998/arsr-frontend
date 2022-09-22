import ACTIONS from "./cacheAction";

export let cacheReducerState = {
    data: {
        // Enter the keys, in alphabetical order
        aboutSStoryData: {
            data: [],
            isAlreadyCalled: false
        },
        clientData: {
            data: [],
            isAlreadyCalled: false
        },
        experienceData : {
            data:[],
            isAlreadyCalled:false
        },
        galleryData : {
            data:[],
            isAlreadyCalled:false
        },
        loader:{
            display: false
        },
        ppItemData : {
            data:[],
            isAlreadyCalled:false
        },
        ppLocationData : {
            data:[],
            isAlreadyCalled:false
        },
        previousShowData : {
            data:[],
            isAlreadyCalled:false
        },
        slidesData : {
            data:[],
            isAlreadyCalled:false
        },
        serviceData : {
            data:[],
            isAlreadyCalled:false
        },
        successStoryData : {
            data:[],
            isAlreadyCalled:false
        },
        teamData : {
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
