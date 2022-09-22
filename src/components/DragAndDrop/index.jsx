import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const DropMain = styled.div`     
    font-size: 14px;

    .dropzone{
        border: 1px dashed #888;
        background: #fafafa;
        text-align: center;
        padding: 5px;
        width: 100%;
        float: left;
        cursor: pointer;
        color: #666;
        margin: 10px 0;
        box-sizing: border-box;
    }
    .label{
        text-align: left;
        font-weight: 555;
    }

`;

export default function DragAndDrop(props) {  
    const onChange = (data) => {
      if(props.onChange){
        props.onChange(data)
      }
    }
  const {getRootProps, getInputProps} = useDropzone({
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDropAccepted: onChange, 
    maxFiles: 1,
    accept: {'image/*': ['.png', '.gif', '.jpeg', '.jpg']}});
  
  const files = props.files?.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  return (
    <DropMain className="container">
      <div className='hor-row label'>
        { props.label || 'Select Image'}
      </div>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()}
            onDragLeave = {onChange} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Selected Files</h4>
        <ul>{files}</ul>
      </aside>
    </DropMain>
  );
}
