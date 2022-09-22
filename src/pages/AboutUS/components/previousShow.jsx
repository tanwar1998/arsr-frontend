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
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'venue',
    numeric: true,
    disablePadding: false,
    label: 'Venue',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'days',
    numeric: true,
    disablePadding: false,
    label: 'Day',
  },
  {
    id: 'image',
    type: 'image',
    label: 'Image',
  },
];



export default function PreviousShow(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [teamData, setTeamData] = useState({city: '', venue: '', date: '', days : '',  image: []});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'about/previousShow/' + deleteData.id;
    const showResponse = await props.masterAPI(URL, {}, 'delete');
    if(showResponse?.type === 'success'){
        Toastify('success', "previous show item deleted successfully!")
        setDeleteData({open: false});
        props.getPreviousShowData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { city: data[0].city, venue: data[0].venue, date: data[0].date, days: data[0].days, id: data[0].id, tmpImage: data[0].image  }
    setTeamData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Previous Show Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpGalleryData = JSON.parse(JSON.stringify(teamData));
    tmpGalleryData[key] = data;
    setTeamData({...tmpGalleryData});
  }

  const handleEditBoxClose = ()=> {
    setTeamData({city: '', venue: '', date: '', days : '',  image: []});
    setAlertData({open: false})
    // setAlertData({})
 }
  const submitData = async() => {
    if(!teamData.city){
      Toastify('error', "Please provide member city!")
      return false;
    }
    if(!teamData.venue){
      Toastify('error', "Please provide venue!")
      return false;
    }
    if(!teamData.date){
      Toastify('error', "Please provide date!")
      return false;
    }
    if(!teamData.days){
      Toastify('error', "Please provide days!")
      return false;
    }
    if((alertData.type !== 'edit' && (!teamData.image.length))){
      Toastify('error', "Please provide an image!")
      return false;
    }
    const uploadURL = 'upload';
    let uploadResponse = '';
    let checkIfFileUploaded = (alertData.type !== 'edit' || (alertData.type === 'edit' && teamData.image?.length)) ;
    if(checkIfFileUploaded){ 
      let uploadData = new FormData();
      uploadData.append('file',teamData.image[0]);
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
          image: uploadResponse?.filename ? uploadResponse.filename: teamData.tmpImage ,
          city: teamData.city,
          venue: teamData.venue,
          date: teamData.date,
          days: teamData.days,
        }

        const URL = alertData.type === 'edit' ?  ('about/previousShow/' + teamData.id + '/') : 'about/previousShow';
        const method = alertData.type === 'edit' ? 'put' : 'post';
        const showResponse = await props.masterAPI(URL, postAPIData, method);
        if(showResponse?.type === 'success'){
          Toastify('success', alertData.type === 'edit' ? "previous show item updated successfully " : "previous show  item added successfully")
          if(alertData.type !== 'edit'){
            setTeamData({city: '', venue: '', date: '', days : '',  image: []})
          }
          props.getPreviousShowData(props.store, true);
        }else{
          Toastify('error', "Some unrecognised error, please try again!")
        }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.previousShowData?.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Previous Show'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Previous Show Item"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'city'
              label = 'City'
              value  = {teamData.city || ''}
              onChange = {(data) => handleChange(data, 'city') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'venue'
              label = 'Venue'
              value  = {teamData.venue || ''}
              onChange = {(data) => handleChange(data, 'venue') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'date'
              label = 'Date'
              value  = {teamData.date || ''}
              onChange = {(data) => handleChange(data, 'date') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'days'
              label = 'Days'
              value  = {teamData.days || ''}
              onChange = {(data) => handleChange(data, 'days') }
              />
          </div>

          <DragAndDrop
              onChange = {(data) => handleChange(data, 'image') }
              files = {  teamData.image  }
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