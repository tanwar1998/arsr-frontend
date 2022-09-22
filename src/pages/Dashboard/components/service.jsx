import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';


const headCells = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Service Text',
  },
];



export default function Service(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [serviceData, setServiceData] = useState({name: '', item: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/service/' + deleteData.id;
    const storyResponse = await props.masterAPI(URL, {}, 'delete');
    if(storyResponse?.type === 'success'){
        Toastify('success', "Service deleted successfully!")
        setDeleteData({open: false});
        props.getServiceData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { name: data[0].name, id: data[0].id, item: data[0].item  }
    setServiceData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Service Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'name') => {
    const tmpStorysData = JSON.parse(JSON.stringify(serviceData));
    tmpStorysData[key] = data;
    setServiceData({...tmpStorysData});
  }

  const handleEditBoxClose = ()=> {
    setServiceData({name: '', item: ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!serviceData.name){
      Toastify('error', "Please provide service name!")
      return false;
    }
    if(!serviceData.item){
      Toastify('error', "Please provide item!")
      return false;
    }
    const postAPIData = { 
      name: serviceData.name,
      item: serviceData.item,
    }

    const URL = alertData.type === 'edit' ?  ('home/service/' + serviceData.id + '/') : 'home/service';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const storyResponse = await props.masterAPI(URL, postAPIData, method);
    if(storyResponse?.type === 'success'){
      Toastify('success',alertData.type === 'edit' ? "Service updated successfully" : "Service added successfully")
      if(alertData.type !== 'edit'){
        setServiceData({name: '', item: ''});
      }
      props.getServiceData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.serviceData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Service List'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Service"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Service Text'
              label = 'Service Text'
              value  = {serviceData.name || ''}
              onChange = { handleChange }
              />
          </div>

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Item Text'
              label = 'Item Text'
              value  = {serviceData.item || ''}
              onChange = { (data) => handleChange(data, 'item') }
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