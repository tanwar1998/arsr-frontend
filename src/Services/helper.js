import { Toastify } from '../components/Toastify/index.jsx';
import { updateLoader } from '../Store/cacheAction';
import { updatePermanentStore } from '../Store/permanentAction';


export const handelErrorResponse = (err, dispatch) => {
    dispatch(updateLoader(false));
    if(err?.response?.status === 401){
        const store = {
            key: 'user',
            value: {
                isLogin: false,
                profile: null,
                isAlreadyCalled: false
            }
        };
        const fcmStore = {
            key:'FCMtokenSaved',
            value:false
        }
        dispatch(updatePermanentStore(store));
        dispatch(updatePermanentStore(fcmStore));
        window.location.reload();
    }else{
        Toastify('error', 'Unrecognised error, while fetching data'); 
    }
}

/* eslint-disable no-useless-escape */

export const ValidateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const ValidatePhoneNumber = (mobile) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(mobile);
}
export const ValidatePassword = (password) =>{
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}