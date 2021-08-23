import React from 'react';
import {sel} from '../redux/load';
import {types} from '../redux/load';
import PostModal from "../pages/PostModal";
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@material-ui/core';

const ModalCustom = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Modal open={useSelector(sel.getModalIsOpen)}
                   // onRequestClose={dispatch({type: types.CLOSE_MODAL, payload: false})}
            >
                <PostModal/>
            </Modal>
        </div>
    );
};

export default ModalCustom;