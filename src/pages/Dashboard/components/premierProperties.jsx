import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';
import SelectComponent from '../../../components/SelectComponent/index.jsx';


const headCells = [
  {
    id: 'text',
    numeric: true,
    disablePadding: false,
    label: 'Text',
  },
];



export default function PremierProperty(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [ppItem, setPPItemData] = useState({text: '', id: '', locationId: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/ppItem/' + deleteData.id;
    const response = await props.masterAPI(URL, {}, 'delete');
    if(response?.type === 'success'){
        Toastify('success', "Premier property item deleted successfully!")
        setDeleteData({open: false});
        props.getPPItemData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, locationId: data[0].locationId  }
    setPPItemData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit premier property Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpLItemData = JSON.parse(JSON.stringify(ppItem));
    tmpLItemData[key] = data;
    setPPItemData({...tmpLItemData});
  }

  const handleEditBoxClose = ()=> {
    setPPItemData({text: '', locationId: ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!ppItem.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!ppItem.locationId){
      Toastify('error', "Please provide location!")
      return false;
    }
    const postAPIData = { 
      text: ppItem.text,
      locationId: ppItem.locationId
    }

    const URL = alertData.type === 'edit' ?  ('home/ppItem/' + ppItem.id + '/') : 'home/ppItem';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const response = await props.masterAPI(URL, postAPIData, method);
    if(response?.type === 'success'){
      Toastify('success', "Premier property added successfully")
      if(alertData.type !== 'edit'){
        setPPItemData({text: '', locationId: ''});
      }
      props.getPPItemData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.ppItemData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Premier Property List'    
        />
        </div>

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Premier property"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Premier property Text'
              label = 'Premier Property Text'
              value  = {ppItem.text || ''}
              onChange = { handleChange }
              />
          </div>

          <div className='hor-row panel-row'>
          <SelectComponent
            options = { props.store?.cacheData?.data?.ppLocationData.data || [] }
            optionLabelKey = 'text'
            optionValueKey = 'id'
            label = 'Location'
            onChange = { (data) => handleChange(data, 'locationId')}
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