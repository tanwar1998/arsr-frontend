import axios from 'axios';
import { axiosConfigReturn } from '../basicApi';
import { updateStore, updateLoader } from '../../Store/cacheAction';
import { handelErrorResponse } from '../helper';

const getEmployeeData = (data, update = false) => {
    return function (dispatch) {
        if (!data.cacheData.data.employeeData.isAlreadyCalled || update) {
            dispatch(updateLoader(true));
            const config = axiosConfigReturn('employee', 'get');
            axios(config).then((response) => {
                dispatch(updateLoader(false));
                if (response?.data?.status) {
                    console.log('response.data>>>>>>>>', response.data.data)
                    const storeData = {
                        key: 'employeeData',
                        value: {
                            data: response.data.data,
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

export default getEmployeeData;