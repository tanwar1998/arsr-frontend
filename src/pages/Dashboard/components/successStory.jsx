import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';


const headCells = [
  {
    id: 'text',
    numeric: true,
    disablePadding: false,
    label: 'Text',
  },
];



export default function SuccessStory(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [storyData, setStoryData] = useState({text: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/story/' + deleteData.id;
    const storyResponse = await props.masterAPI(URL, {}, 'delete');
    if(storyResponse?.type === 'success'){
        Toastify('success', "Story deleted successfully!")
        setDeleteData({open: false});
        props.getSuccessStoryData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id  }
    setStoryData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Story Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpStorysData = JSON.parse(JSON.stringify(storyData));
    tmpStorysData[key] = data;
    setStoryData({...tmpStorysData});
  }

  const handleEditBoxClose = ()=> {
    setStoryData({text: ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!storyData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    const postAPIData = { 
      text: storyData.text,
    }

    const URL = alertData.type === 'edit' ?  ('home/story/' + storyData.id + '/') : 'home/story';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const storyResponse = await props.masterAPI(URL, postAPIData, method);
    if(storyResponse?.type === 'success'){
      Toastify('success', "Story added successfully")
      if(alertData.type !== 'edit'){
        setStoryData({text: ''});
      }
      props.getSuccessStoryData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.successStoryData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Success Story List'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Success Story"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Success Story Text'
              label = 'Success Story Text'
              value  = {storyData.text || ''}
              onChange = { handleChange }
              />
          </div>

          <div className='hor-row panel-row'>
            <ButtonComponent
              label = 'Save'
              onClick = { submitData }
              />
          </div>

        </Alert>
        
        <Alert
          open = { deleteData.open }
          label = "Do You want to proceed"
          type = 'confirm'
          handleConfirm = { handleDeleteDataConfirm }
          handleClose = { handleDeleteDataCancel }
        />
      </div>
    );
  }