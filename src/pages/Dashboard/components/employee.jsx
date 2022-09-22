import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent/index.jsx';
import Table from '../../../components/Table/index.jsx';
import Button from '@mui/material/Button';
import Alert from '../../../components/Dialog/index.jsx';
import ButtonComponent from '../../../components/ButtonComponent/index.jsx';
import { Toastify } from '../../../components/Toastify/index.jsx';
import { ValidateEmail, ValidatePhoneNumber } from '../../../Services/helper.js';
import { InfoContainer } from '../style.js';

const initialEmployeeData = {
  name: '',
  email: '',
  designation: '',
  phone: '',
  address: '',
}

const headCells = [
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
  const [infoAlertData, setInfoAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  const deleteItem = (data) => {
    setDeleteData({id: data[0]?._id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'employee/' + deleteData.id;
    const employeeResponse = await props.masterAPI(URL, {}, 'delete');
    if(employeeResponse?.status){
        Toastify('success', "employee deleted successfully!")
        setDeleteData({open: false});
        props.getEmployeeData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    setEmployeeData({...data[0]});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Employee Item'
    }
    setAlertData(tmpAlertData)
  }

  const setInfoItem = (data) => {
    setEmployeeData({...data[0]});
    const tmpAlertData = { open: true }
    setInfoAlertData(tmpAlertData)
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
    const tmpEmployeeData = JSON.parse(JSON.stringify(employeeData));
    tmpEmployeeData[key] = data;
    setEmployeeData({...tmpEmployeeData});
  }

  const handleEditBoxClose = ()=> {
    setEmployeeData({text: '', image: []});
    setAlertData({})
    setInfoAlertData({})
 }

  const submitData = async() => {
    if(!employeeData.name){
      Toastify('error', "Please provide text!")
      return false;
    }
    if(!employeeData.email){
      Toastify('error', "Please provide email!")
      return false;
    }
    if(!employeeData.phone){
      Toastify('error', "Please provide phone number!")
      return false;
    }
    if(!employeeData.designation){
      Toastify('error', "Please provide designation!")
      return false;
    }
    if(!employeeData.address){
      Toastify('error', "Please provide address!")
      return false;
    }

    const URL = 'employee';
    const method = alertData.type === 'edit' ? 'put' : 'post';
    const employeeResponse = await props.masterAPI(URL, employeeData, method);
    if(employeeResponse?.status){
      Toastify('success', alertData.type === 'edit' ? "Employee updated successfully" : "Employee added successfully")
      if(alertData.type !== 'edit'){
        setEmployeeData(initialEmployeeData)
      }
      props.getEmployeeData(props.store, true);
    }else{
      Toastify('error', "some unrecognised error, please try again!")
    }
  }

    return (
      <div className='hor-row slides-container-main'>
        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = {props.store?.cacheData?.data?.employeeData.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            setInfoItem = { setInfoItem }        
            title = 'Employee list'    
        />
        </div>

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Employee
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Employee"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'xyz'
              label = 'Name'
              value  = {employeeData.name || ''}
              onChange = { handleChange }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'xyz@gmail.com'
              label = 'Email'
              error = { emailError }
              value  = {employeeData.email || ''}
              onChange = {(data) => handleChange(data, 'email') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = '79877....'
              error = { phoneError }
              label = 'Phone number'
              value  = {employeeData.phone || ''}
              onChange = {(data) => handleChange(data, 'phone') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'designation'
              label = 'designation'
              value  = {employeeData.designation || ''}
              onChange = {(data) => handleChange(data, 'designation') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'address'
              label = 'Address'
              value  = {employeeData.address || ''}
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

        <Alert
            open = {infoAlertData.open }
            label = { "Employee details"}
            handleClose = { handleEditBoxClose }
          >
            <InfoContainer className='hor-row info-container-main'>
              <div className='hor-row'>
                <span> Name:  </span>
                {employeeData.name}
              </div>
              <div className='hor-row'>
                <span> Email:  </span>
                {employeeData.email}
              </div>
              <div className='hor-row'>
                <span> Phone number:  </span>
                {employeeData.phone}
              </div>
              <div className='hor-row'>
                <span> Designation:  </span>
                {employeeData.designation}
              </div>
              <div className='hor-row'>
                <span> Address:  </span>
                {employeeData.address}
              </div>
            </InfoContainer>
          </Alert>
      </div>
    );
  }