import React from 'react';
import {sel, types} from '../redux/load';
import PostModal from "../pages/PostModal";
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@material-ui/core';  //https://material-ui.com/components/modal/
import {makeStyles} from '@material-ui/core/styles';

const ModalCustom = () => {
    const dispatch = useDispatch();
    const useStyles = makeStyles({
       modal: {
           margin: '30px auto',
           background: 'rgba(0, 0, 0, 0.6)',
           width: '90%',
           boxShadow: '13px 13px 9px 0px rgba(8, 63, 195, 0.33)',


           overlay: {
               margin: '30px auto',
               background: 'rgba(0, 0, 0, 0.6)',
               width: '90%',
               boxShadow: '13px 13px 9px 0px rgba(8, 63, 195, 0.33)',
           }
       }
    });
    const classes = useStyles();

    return (
            <Modal className={classes.modal}
                   open={useSelector(sel.getModalIsOpen)}
                   onClose={()=>dispatch({type: types.CLOSE_MODAL, payload: false})}
                   hideBackdrop={false}
            >
                <div style={wrapper}>
                <PostModal/>
                </div>
            </Modal>
    );
};

export default ModalCustom;

const wrapper = {
    zIndex: '2',
    background: 'rgba(255, 255, 255, 0.9)'

};