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



export default function PPLocation(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [pplocationData, setPPLocationData] = useState({text: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/ppLocation/' + deleteData.id;
    const response = await props.masterAPI(URL, {}, 'delete');
    if(response?.type === 'success'){
        Toastify('success', "Premier Property Location deleted successfully!")
        setDeleteData({open: false});
        props.getPPLocationData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id  }
    setPPLocationData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Premier Property Location Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpLocationData = JSON.parse(JSON.stringify(pplocationData));
    tmpLocationData[key] = data;
    setPPLocationData({...tmpLocationData});
  }

  const handleEditBoxClose = ()=> {
    setPPLocationData({text: ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!pplocationData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    const postAPIData = { 
      text: pplocationData.text,
    }

    const URL = alertData.type === 'edit' ?  ('home/ppLocation/' + pplocationData.id + '/') : 'home/ppLocation';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const response = await props.masterAPI(URL, postAPIData, method);
    if(response?.type === 'success'){
      Toastify('success', "Premier Property Location added successfully")
      if(alertData.type !== 'edit'){
        setPPLocationData({text: ''});
      }
      props.getPPLocationData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.ppLocationData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Premier Property Location List'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Premier Property Location"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Premier Property Location Text'
              label = 'Premier Property Location Text'
              value  = {pplocationData.text || ''}
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