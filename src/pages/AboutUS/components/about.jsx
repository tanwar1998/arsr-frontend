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
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'location',
    numeric: true,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'by',
    numeric: true,
    disablePadding: false,
    label: 'Organised by',
  }
];



export default function About(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [aboutData, setAboutData] = useState({text: '', date: '', location: '', by: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'about/sstory/' + deleteData.id;
    const slideResponse = await props.masterAPI(URL, {}, 'delete');
    if(slideResponse?.type === 'success'){
        Toastify('success', "About us item deleted successfully!")
        setDeleteData({open: false});
        props.getAboutSStoryData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, date: data[0].date, location: data[0].location, by: (data[0].by || '')  }
    setAboutData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit About us Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpSlidesData = JSON.parse(JSON.stringify(aboutData));
    tmpSlidesData[key] = data;
    setAboutData({...tmpSlidesData});
  }

  const handleEditBoxClose = ()=> {
    setAboutData({text: '', date: '', location: '', by : ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!aboutData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!aboutData.date){
      Toastify('error', "Please provide date!")
      return false;
    }
    if(!aboutData.location){
      Toastify('error', "Please provide location!")
      return false;
    }

        const postAPIData = { 
          text: aboutData.text,
          date: aboutData.date,
          location: aboutData.location,
          by: aboutData.by,
        }

        const URL = alertData.type === 'edit' ?  ('about/sstory/' + aboutData.id + '/') : 'about/sstory/';
        const method = alertData.type === 'edit' ? 'put' : 'post';
        const slideResponse = await props.masterAPI(URL, postAPIData, method);
        if(slideResponse?.type === 'success'){
          Toastify('success', "About us item added successfully")
          if(alertData.type !== 'edit'){
            setAboutData({text: '', date: '', location: '', by: ''})
          }
          props.getAboutSStoryData(props.store, true);
        }else{
          Toastify('error', "some unrecognised error, please try again!")
        }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.aboutSStoryData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'About Us Success Story'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add About US Success Story"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Text'
              label = 'Text'
              value  = {aboutData.text || ''}
              onChange = { handleChange }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Date'
              label = 'Date'
              value  = {aboutData.date || ''}
              onChange = { (data) => handleChange(data, 'date') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Location'
              label = 'Location'
              value  = {aboutData.location || ''}
              onChange = { (data) => handleChange(data, 'location') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Organised By'
              label = 'Organised By'
              value  = {aboutData.by || ''}
              onChange = { (data) => handleChange(data, 'by') }
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