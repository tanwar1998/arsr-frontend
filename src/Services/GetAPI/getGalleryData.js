import axios from 'axios';
import { axiosConfigReturn } from '../../Services/basicApi';
import { updateStore, updateLoader } from '../../Store/cacheAction';
import { handelErrorResponse } from '../helper';

const getGalleryData = (data, update = false) => {
    return function (dispatch) {
        if (!data.cacheData.data.galleryData.isAlreadyCalled || update) {
            dispatch(updateLoader(true));
            const config = axiosConfigReturn('gallery/gallery', 'get');
            axios(config).then((response) => {
                dispatch(updateLoader(false));
                if (response?.data?.type === 'success') {
                    const storeData = {
                        key: 'galleryData',
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

export default getGalleryData;