import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import ButtonComponent from '../ButtonComponent/index.jsx';

const DialogContentMain = styled.div`
    width: 100%;
    float: left;
    position: relative;
    

    .close-icon{
        color: #333;
        cursor: pointer;
        position: absolute;
        top: -45px;
        z-index: 2;
        right: 0;

    }
    .heading-main{
        font-weight: 666;
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
    }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Alert(props) {
  /**
   * 
   * @param {*
   *      type: null || 'confirm',
   *      open: boolean,
   *      handleClose: ()
   *      label
   *      children
   * } props 
   */

  return (
    <div>
      <Dialog
        open = { props.open || false }
        className = {props.type === 'confirm' ? 'confirm-dialog' : ''}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContentMain>
            <CloseIcon className='close-icon' 
                onClick = { props.handleClose }/>
            <div className='hor-row heading-main'>
                { props.label }
            </div>
            <div className='hor-row'>
                { props.children }
            </div>
            {props.type === 'confirm' && <div className='hor-row'>
              <ButtonComponent
                label = 'Cancel'
                variant = 'outlined'
                style = {{width: 'auto', marginRight: '20px'}}
                onClick = { props.handleClose }
                />
              <ButtonComponent
                label = 'Confirm'
                style = {{width: 'auto', float: 'right'}}
                onClick = { props.handleConfirm }
                />
            </div> }
        </DialogContentMain>
      </Dialog>
    </div>
  );
}
