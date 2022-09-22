import React, { useState, useEffect } from 'react';
import { DashboardContainer } from './style.js';
import Dashboard from './components/dashboard.jsx';
import { connect } from "react-redux";
import { updateStore } from '../../Store/cacheAction';
import PERMANENT_ACTION from '../../Store/permanentAction';
import { postAPI, putAPI, deleteAPI } from '../../Services/basicApi.js';
import { Navigate } from 'react-router-dom';
import getSlidesData from '../../Services/GetAPI/getSlidesData.js';
import getExperienceData from '../../Services/GetAPI/getExperienceData.js';
import getServiceData from '../../Services/GetAPI/getServiceData.js';
import getSuccessStoryData from '../../Services/GetAPI/getSuccessStoryData.js';
import getPPLocationData from '../../Services/GetAPI/getPPLocationData.js';
import getPPItemData from '../../Services/GetAPI/getPPItemData.js';

function DashboardContainerMain(props) {



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
        <DashboardContainer>
           <Dashboard
            masterAPI = { masterAPI }
            store = {props.store}
            getSlidesData = { props.getSlidesData  }
            getSuccessStoryData = { props.getSuccessStoryData  }
            getPPItemData = { props.getPPItemData  }
            getPPLocationData = { props.getPPLocationData  }
            getExperienceData = { props.getExperienceData  }
            getServiceData = { props.getServiceData  }
           />
        </DashboardContainer>
    );
  }

  const mapStateToProps = (store) => {
    return {
        store,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getSlidesData: (item, update = false) => dispatch(getSlidesData(item, update)),
      getPPItemData: (item, update = false) => dispatch(getPPItemData(item, update)),
      getPPLocationData: (item, update = false) => dispatch(getPPLocationData(item, update)),
      getSuccessStoryData: (item, update = false) => dispatch(getSuccessStoryData(item, update)),
      getExperienceData: (item, update = false) => dispatch(getExperienceData(item, update)),
      getServiceData: (item, update = false) => dispatch(getServiceData(item, update)),
        updateStore: item => dispatch(updateStore(item)),
        updatePermanentStore: item => dispatch(PERMANENT_ACTION.updateStoreKey(item)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainerMain);
