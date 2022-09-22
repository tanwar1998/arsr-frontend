import React, { useState, useEffect } from 'react';
import { ClientContainer } from './style.js';
import Dashboard from './components/dashboard.jsx';
import { connect } from "react-redux";
import { updateStore } from '../../Store/cacheAction';
import PERMANENT_ACTION from '../../Store/permanentAction';
import { Navigate } from 'react-router-dom';
import { postAPI, putAPI, deleteAPI } from '../../Services/basicApi.js';
import getClientData from '../../Services/GetAPI/getClientData.js';

function ClientContainerMain(props) {




    const masterAPI = async (path, data, type = 'post', tmpHeader) => {
      let loaderStore = JSON.parse(JSON.stringify(props.store.cacheData.data.loader));
      loaderStore.display = true;
      props.updateStore({ key: 'loader', value: loaderStore });
      const headers = {Authorization: 'Bearer ' + props.store.permanentData.data.user.token, ...tmpHeader}
      let postAPIResponse = {};
      if (type === 'post') {
          postAPIResponse = await postAPI(path, data, headers);
      }else if (type === 'put') {
          postAPIResponse = await putAPI(path, data, headers);
      }else if (type === 'delete') {
          postAPIResponse = await deleteAPI(path, data, headers);
      }
      loaderStore.display = false;
      props.updateStore({ key: 'loader', value: loaderStore });
      return postAPIResponse;
  }

    
    return (
        <ClientContainer>
           <Dashboard
            masterAPI = { masterAPI }
            store = {props.store}
            getClientData = { props.getClientData  }
           />
        </ClientContainer>
    );
  }

  const mapStateToProps = (store) => {
    return {
        store,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClientData: (item, update = false) => dispatch(getClientData(item, update)),
        updateStore: item => dispatch(updateStore(item)),
        updatePermanentStore: item => dispatch(PERMANENT_ACTION.updateStoreKey(item)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ClientContainerMain);
