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
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'Count Text',
  },
];



export default function Experience(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [experienceData, setExperienceData] = useState({text: '', count: ''});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/experience/' + deleteData.id;
    const storyResponse = await props.masterAPI(URL, {}, 'delete');
    if(storyResponse?.type === 'success'){
        Toastify('success', "Experience deleted successfully!")
        setDeleteData({open: false});
        props.getExperienceData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, count: data[0].count  }
    setExperienceData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Experience Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpStorysData = JSON.parse(JSON.stringify(experienceData));
    tmpStorysData[key] = data;
    setExperienceData({...tmpStorysData});
  }

  const handleEditBoxClose = ()=> {
    setExperienceData({text: '', count: ''});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!experienceData.text){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!experienceData.count){
      Toastify('error', "Please provide count!")
      return false;
    }
    const postAPIData = { 
      text: experienceData.text,
      count: experienceData.count,
    }

    const URL = alertData.type === 'edit' ?  ('home/experience/' + experienceData.id + '/') : 'home/experience';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const storyResponse = await props.masterAPI(URL, postAPIData, method);
    if(storyResponse?.type === 'success'){
      Toastify('success',alertData.type === 'edit' ? "Experience updated successfully" : "Experience added successfully")
      if(alertData.type !== 'edit'){
        setExperienceData({text: '', count: ''});
      }
      props.getExperienceData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.experienceData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Experience List'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Experience"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Experience Text'
              label = 'Experience Text'
              value  = {experienceData.text || ''}
              onChange = { handleChange }
              />
          </div>

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Count Text'
              label = 'Count Text'
              value  = {experienceData.count || ''}
              onChange = { (data) => handleChange(data, 'count') }
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