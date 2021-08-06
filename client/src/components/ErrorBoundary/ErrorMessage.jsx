import React from 'react';
import './errorMessage.scss';
import errorImage from './errorImage.jpg';

const ErrorMessage = () => {
    return (
        <div className='error-page'>
            <h1>'An Error Happened...'</h1>
            <h3>"Something Crashed Here ..... "</h3>
            <div>
                <img className='error-img' src={errorImage} alt='error-image'/>
            </div>
        </div>
    );

};

export default ErrorMessage;