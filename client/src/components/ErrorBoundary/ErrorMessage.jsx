import React from 'react';
import classes from './errorMessage.module.scss';
import errorImage from './errorImage.jpg';

const ErrorMessage = () => {
    return (
        <div className={classes.errorPage}>
            <h1>'An Error Happened...'</h1>
            <h3>"Something Crashed Here ..... "</h3>
            <div>
                <img className={classes.errorImg} src={errorImage} alt='error-image'/>
            </div>
        </div>
    );

};

export default ErrorMessage;