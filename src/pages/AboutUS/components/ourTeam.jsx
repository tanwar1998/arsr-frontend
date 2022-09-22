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
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'position',
    numeric: true,
    disablePadding: false,
    label: 'Position',
  },
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



export default function Team(props) {
  const [alertData, setAlertData] = useState({});
  const [deleteData, setDeleteData] = useState({id: '', open: false});
  const [teamData, setTeamData] = useState({text: '', name: '', email: '', position : '',  image: []});


  const deleteItem = (data) => {
    setDeleteData({id: data[0]?.id,   open: true});
  }

  const handleDeleteDataCancel = () => {
    setDeleteData({open: false})
  }

  const handleDeleteDataConfirm = async() => {
    const URL = 'about/team/' + deleteData.id;
    const teamResponse = await props.masterAPI(URL, {}, 'delete');
    if(teamResponse?.type === 'success'){
        Toastify('success', "team item deleted successfully!")
        setDeleteData({open: false});
        props.getTeamData(props.store, true);
    }else{
      Toastify('error', "Some unrecognised error, please try again")
    }
  }

  const editItem = (data) => {
    const tmpEditData = { name: data[0].name, email: data[0].email, position: data[0].position, text: data[0].text, id: data[0].id, tmpImage: data[0].image  }
    setTeamData({...tmpEditData});
    const tmpAlertData = {
      open: true,
      type: 'edit',
      label: 'Edit Team Item'
    }
    setAlertData(tmpAlertData)
  }

  const handleChange = (data, key = 'text') => {
    const tmpGalleryData = JSON.parse(JSON.stringify(teamData));
    tmpGalleryData[key] = data;
    setTeamData({...tmpGalleryData});
  }

  const handleEditBoxClose = ()=> {
    setTeamData({text: '', name: '', email: '', position : '',  image: []});
    setAlertData({open: false})
    // setAlertData({})
 }
  const submitData = async() => {
    if(!teamData.name){
      Toastify('error', "Please provide member name!")
      return false;
    }
    if(!teamData.email){
      Toastify('error', "Please provide email!")
      return false;
    }
    if(!teamData.position){
      Toastify('error', "Please provide position!")
      return false;
    }
    if(!teamData.text){
      Toastify('error', "Please provide text!")
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
          name: teamData.name,
          email: teamData.email,
          position: teamData.position,
          text: teamData.text,
        }

        const URL = alertData.type === 'edit' ?  ('about/team/' + teamData.id + '/') : 'about/team';
        const method = alertData.type === 'edit' ? 'put' : 'post';
        const teamResponse = await props.masterAPI(URL, postAPIData, method);
        if(teamResponse?.type === 'success'){
          Toastify('success', alertData.type === 'edit' ? "team  item updated successfully " : "team  item added successfully")
          if(alertData.type !== 'edit'){
            setTeamData({text: '', name: '', email: '', position : '',  image: []})
          }
          props.getTeamData(props.store, true);
        }else{
          Toastify('error', "Some unrecognised error, please try again!")
        }
  }


    return (
      <div className='hor-row slides-container-main'>

        <div className='hor-row table-container-main'>
        <Table
            headCells = { headCells }
            rows = { props.store?.cacheData?.data?.teamData?.data || [] }
            deleteItem = { deleteItem }
            editItem = { editItem }        
            title = 'Team '    
        />
        </div>
          

      <Button variant="outlined" onClick={() => setAlertData({open: true})}>
        Add Item
      </Button>

        <Alert
          open = { alertData.open }
          label = {alertData.label || "Add Team Item"}
          handleClose = { handleEditBoxClose }
        >

          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'Member Name'
              label = 'Name'
              value  = {teamData.name || ''}
              onChange = {(data) => handleChange(data, 'name') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'email'
              label = 'Eamil'
              value  = {teamData.email || ''}
              onChange = {(data) => handleChange(data, 'email') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'position'
              label = 'Position'
              value  = {teamData.position || ''}
              onChange = {(data) => handleChange(data, 'position') }
              />
          </div>
          <div className='hor-row panel-row'>
            <InputComponent
              placeholder = 'About Text'
              label = 'About Text'
              value  = {teamData.text || ''}
              onChange = { handleChange }
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