import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";

const ShowMoreButton = ({text, isVisible, handler}) => {
    const btn = <Button color="primary"
                        size="small"
                        onClick={handler}>
        {text}
    </Button>;
    let Btn = isVisible ? btn : null;
useEffect(()=>{
    Btn = isVisible ? btn : null;
},[isVisible]);

    return (
        <>
            {Btn}
        </>
    );
};

export default ShowMoreButton;