import React, { useState, useEffect } from 'react';
import { AboutContainer } from './style.js';
import Dashboard from './components/dashboard.jsx';
import { connect } from "react-redux";
import { updateStore } from '../../Store/cacheAction';
import PERMANENT_ACTION from '../../Store/permanentAction';
import { postAPI, putAPI, deleteAPI } from '../../Services/basicApi.js';
import { Navigate } from 'react-router-dom';
import getTeamData from '../../Services/GetAPI/getTeamData.js';
import getAboutSStoryData from '../../Services/GetAPI/getAboutSStoryData.js';
import getPreviousShowData from '../../Services/GetAPI/getPreviousShowData.js';

function AboutContainerMain(props) {


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
        <AboutContainer>
           <Dashboard
            masterAPI = { masterAPI }
            store = {props.store}
            getTeamData = { props.getTeamData  }
            getAboutSStoryData = { props.getAboutSStoryData  }
            getPreviousShowData = { props.getPreviousShowData  }
           />
        </AboutContainer>
    );
  }

  const mapStateToProps = (store) => {
    return {
        store,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getPreviousShowData: (item, update = false) => dispatch(getPreviousShowData(item, update)),
      getAboutSStoryData: (item, update = false) => dispatch(getAboutSStoryData(item, update)),
      getTeamData: (item, update = false) => dispatch(getTeamData(item, update)),
      updateStore: item => dispatch(updateStore(item)),
      updatePermanentStore: item => dispatch(PERMANENT_ACTION.updateStoreKey(item)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AboutContainerMain);
