import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import DragAndDrop from '../../../components/DragAndDrop/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';


const headCells = [
  {
    id: 'text',
    numeric: true,
    disablePadding: false,
    label: 'Text',
  },
  {
    id: 'image',
    type: 'image',
    label: 'Image',
  },
  {
    id: 'link',
    label: 'Link',
  },
];



export default function Client(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [clientData, setClientData] = useState({text: '', link: '', image: []});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'client/client/' + deleteData.id;
    const galleryResponse = await props.masterAPI(URL, {}, 'delete');
    if(galleryResponse?.type === 'success'){
        Toastify('success', "client item deleted successfully!")
        setDeleteData({open: false});
        props.getClientData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, link: data[0].link, tmpImage: data[0].image  }
    setClientData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Client Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpGalleryData = JSON.parse(JSON.stringify(clientData));
    tmpGalleryData[key] = data;
    setClientData({...tmpGalleryData});
  }

  const handleEditBoxClose = ()=> {
    setClientData({text: '',link: '',  image: []});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!clientData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!clientData.link){
      Toastify('error', "Please provide link!")
      return false;
    }
    if((alertData.type !== 'edit' && (!clientData.image.length))){
      Toastify('error', "Please provide an image!")
      return false;
    }
    const uploadURL = 'upload';
    let uploadResponse = '';
    let checkIfFileUploaded = (alertData.type !== 'edit' || (alertData.type === 'edit' && clientData.image?.length)) ;
    if(checkIfFileUploaded){ 
      let uploadData = new FormData();
      uploadData.append('file',clientData.image[0]);
      const header = {
          'Content-Type': 'multipart/form-data'
        }
      uploadResponse = await props.masterAPI(uploadURL, uploadData, 'post', header);
    }

    if(uploadResponse && !uploadResponse){
      Toastify('error', "Some unrecognised error while uploading image!")
      return false;
    }

        const postAPIData = { 
          image: uploadResponse?.filename ? uploadResponse.filename: clientData.tmpImage ,
          text: clientData.text,
          link: clientData.link,
        }

        const URL = alertData.type === 'edit' ?  ('client/client/' + clientData.id + '/') : 'client/client';
        const method = alertData.type === 'edit' ? 'put' : 'post';
        const galleryResponse = await props.masterAPI(URL, postAPIData, method);
        if(galleryResponse?.type === 'success'){
          Toastify('success', alertData.type === 'edit' ? "client  item updated successfully " : "client  item added successfully")
          if(alertData.type !== 'edit'){
            setClientData({text: '', link: '', image: []})
          }
          props.getClientData(props.store, true);
        }else{
          Toastify('error', "Some unrecognised error, please try again!")
        }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.clientData?.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Client '    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Client Image"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Client Text'
              label = 'Client Text'
              value  = {clientData.text || ''}
              onChange = { handleChange }
              />
          </div>

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Client Link'
              label = 'Client Link'
              value  = {clientData.link || ''}
              onChange = {(data) => handleChange(data, 'link') }
              />
          </div>

          <DragAndDrop
              onChange = {(data) => handleChange(data, 'image') }
              files = {  clientData.image  }
            />
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