import React, {useEffect, useState} from 'react';
import ChatBubbleOutlineOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from "styled-components";

const UserCard = ({post}) => {
        const {picture} = post;
        const commentNum = post.comments.length;
        const likeNumb = post.likes.length;
        const numberOfComments = <span><ChatBubbleOutlineOutlinedIcon/>{commentNum}</span>;
        const numberOfLikes = <span><FavoriteIcon/>{likeNumb}</span>;
    const [hoverId, setHoverId] = useState('');

        return (
            <Grid key={post._id} item xs={6} sm={4} md={3} lg={2}>
                <Box onMouseOver={({target}) => {
                    setHoverId(target.getAttribute('data-name'));
                }}
                     onMouseOut={() => {
                         setHoverId('');
                     }}>
                        { (hoverId === picture) && numberOfComments}{ (hoverId === picture) && numberOfLikes}
                    <StyledImg data-name={picture} src={picture} width='190px' alt='a-post-picture'/>
                </Box>
            </Grid>
        );

};

export default UserCard;

const StyledImg = styled.img`
border-radius: 10px;
border: 3px solid cadetblue;
transition-duration: 0.1s;
&:hover {
filter: brightness(0.6);
transition-duration: 0.1s;
}; 
`;
