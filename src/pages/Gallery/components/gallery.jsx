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
];



export default function Gallery(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [galleryData, setGalleryData] = useState({text: '', image: []});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'gallery/gallery/' + deleteData.id;
    const galleryResponse = await props.masterAPI(URL, {}, 'delete');
    if(galleryResponse?.type === 'success'){
        Toastify('success', "gallery item deleted successfully!")
        setDeleteData({open: false});
        props.getGalleryData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, tmpImage: data[0].image  }
    setGalleryData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Gallery Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpGalleryData = JSON.parse(JSON.stringify(galleryData));
    tmpGalleryData[key] = data;
    setGalleryData({...tmpGalleryData});
  }

  const handleEditBoxClose = ()=> {
    setGalleryData({text: '', image: []});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!galleryData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    if((alertData.type !== 'edit' && (!galleryData.image.length))){
      Toastify('error', "Please provide an image!")
      return false;
    }
    const uploadURL = 'upload';
    let uploadResponse = '';
    let checkIfFileUploaded = (alertData.type !== 'edit' || (alertData.type === 'edit' && galleryData.image?.length)) ;
    if(checkIfFileUploaded){ 
      let uploadData = new FormData();
      uploadData.append('file',galleryData.image[0]);
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
          image: uploadResponse?.filename ? uploadResponse.filename: galleryData.tmpImage ,
          text: galleryData.text,
        }

        const URL = alertData.type === 'edit' ?  ('gallery/gallery/' + galleryData.id + '/') : 'gallery/gallery';
        const method = alertData.type === 'edit' ? 'put' : 'post';
        const galleryResponse = await props.masterAPI(URL, postAPIData, method);
        if(galleryResponse?.type === 'success'){
          Toastify('success', alertData.type === 'edit' ? "gallery  item updated successfully " : "gallery  item added successfully")
          if(alertData.type !== 'edit'){
            setGalleryData({text: '', image: []})
          }
          props.getGalleryData(props.store, true);
        }else{
          Toastify('error', "Some unrecognised error, please try again!")
        }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.galleryData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Gallery '    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Gallery Image"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Gallery Text'
              label = 'Gallery Text'
              value  = {galleryData.text || ''}
              onChange = { handleChange }
              />
          </div>

          <DragAndDrop
              onChange = {(data) => handleChange(data, 'image') }
              files = {  galleryData.image  }
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