import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        position: 'relative',
        left: -15,
        fontSize: 8,
        paddingLeft: 26,
        paddingRight: 26,
        height: 15,
        marginTop: 5,
    }
});

const ShowMoreButton = ({text, isVisible, handler}) => {
    const classes = useStyles();
    const btn = <Button className={classes.btn}
                        color="primary"
                        variant='contained'
                        disabled={!isVisible}
                        onClick={handler}
    >
        {text}
    </Button>;
    // let Btn = isVisible ? btn : null;
    useEffect(() => {
        // Btn = isVisible ? btn : null;
    }, [isVisible]);

    return (
        <>
            {/*{Btn}*/}
            {btn}
        </>
    );
};

export default ShowMoreButton;