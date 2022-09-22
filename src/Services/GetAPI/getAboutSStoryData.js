import axios from 'axios';
import { axiosConfigReturn } from '../../Services/basicApi';
import { updateStore, updateLoader } from '../../Store/cacheAction';
import { handelErrorResponse } from '../helper';

const getAboutSStoryData = (data, update = false) => {
    return function (dispatch) {
        if (!data.cacheData.data.aboutSStoryData.isAlreadyCalled || update) {
            dispatch(updateLoader(true));
            const config = axiosConfigReturn('about/sstory', 'get');
            axios(config).then((response) => {
                dispatch(updateLoader(false));
                if (response?.data?.type === 'success') {
                    const storeData = {
                        key: 'aboutSStoryData',
                        value: {
                            data: response.data.data.result,
                            isAlreadyCalled: true
                        }
                    }
                    dispatch(updateStore(storeData));
                }
            }, (err) => {
                handelErrorResponse(err, dispatch)
            });
        };
    }
};

export default getAboutSStoryData;