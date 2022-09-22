import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';
import { ValidateEmail, ValidatePhoneNumber } from '../../../Services/helper.js';


const tmpData = [
  {
    name: 'vineet',
    email: 'vineet@gmail.com',
    designation: 'software engineer',
    phone: '+917404684167',
    address: 'bhiwani',
  }
]

const headCells = [
  // {
  //   id: 'name',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Dessert (100g serving)',
  // },
  // {
  //   id: 'calories',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Calories',
  // },
  // {
  //   id: 'fat',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Fat (g)',
  // },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
];



export default function Slides(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [slidesData, setSlidesData] = useState({text: '', image: []});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'home/slides/' + deleteData.id;
    const slideResponse = await props.masterAPI(URL, {}, 'delete');
    if(slideResponse?.type === 'success'){
        Toastify('success', "slide deleted successfully!")
        setDeleteData({open: false});
        props.getSlidesData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { text: data[0].text, id: data[0].id, tmpImage: data[0].image  }
    setSlidesData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Slide Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'name') => {
    if(key === 'email'){
      const test = ValidateEmail(data);
      if(test){
        setEmailError(false)
      }else if(!emailError && !test){
        setEmailError('Please enter a valid email')
      }
    }
    if(key === 'phone'){
      const test = ValidatePhoneNumber(data);
      if(test){
        setPhoneError(false)
      }else if(!phoneError && !test){
        setPhoneError('Please enter a valid phone number')
      }
    }
    const tmpSlidesData = JSON.parse(JSON.stringify(slidesData));
    tmpSlidesData[key] = data;
    setSlidesData({...tmpSlidesData});
  }

  const handleEditBoxClose = ()=> {
    setSlidesData({text: '', image: []});
    setAlertData({open: false})
    setAlertData({})
 }
  const submitData = async() => {
    if(!slidesData.name){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!slidesData.email){
      Toastify('error', "Please provide email!")
      return false;
    }
    if(!slidesData.phone){
      Toastify('error', "Please provide phone number!")
      return false;
    }
    if(!slidesData.designation){
      Toastify('error', "Please provide designation!")
      return false;
    }
    if(!slidesData.address){
      Toastify('error', "Please provide address!")
      return false;
    }
    if((alertData.type !== 'edit' && (!slidesData.image.length))){
      Toastify('error', "Please provide an image!")
      return false;
    }
    const uploadURL = 'upload';
    let uploadResponse = '';
    let checkIfFileUploaded = (alertData.type !== 'edit' || (alertData.type === 'edit' && slidesData.image?.length)) ;
    if(checkIfFileUploaded){ 
      let uploadData = new FormData();
      uploadData.append('file',slidesData.image[0]);
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
      image: uploadResponse?.filename ? uploadResponse.filename: slidesData.tmpImage ,
      text: slidesData.text,
    }

    const URL = alertData.type === 'edit' ?  ('home/slides/' + slidesData.id + '/') : 'home/slides';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const slideResponse = await props.masterAPI(URL, postAPIData, method);
    if(slideResponse?.type === 'success'){
      Toastify('success', "slide added successfully")
      if(alertData.type !== 'edit'){
        setSlidesData({text: '', image: []})
      }
      props.getSlidesData(props.store, true);
    }else{
      Toastify('error', "some unrecognised error, please try again!")
    }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = {tmpData || props.store?.cacheData?.data?.slidesData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Home page slides'    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Slides"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'xyz'
              label = 'Name'
              value  = {slidesData.name || ''}
              onChange = { handleChange }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'xyz@gmail.com'
              label = 'Email'
              error = { emailError }
              value  = {slidesData.email || ''}
              onChange = {(data) => handleChange(data, 'email') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = '79877....'
              error = { phoneError }
              label = 'Phone number'
              value  = {slidesData.phone || ''}
              onChange = {(data) => handleChange(data, 'phone') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'designation'
              label = 'designation'
              value  = {slidesData.designation || ''}
              onChange = {(data) => handleChange(data, 'designation') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'address'
              label = 'Address'
              value  = {slidesData.address || ''}
              onChange = {(data) => handleChange(data, 'address') }
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