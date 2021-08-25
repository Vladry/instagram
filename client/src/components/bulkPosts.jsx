import React from 'react';
import styled from 'styled-components';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PostComments from "./postComments";

const BulkPosts = ({posts, handler}) => {
    const bulkPosts_ = posts.map((post) => {
        const {_id, picture, content, date, isLiked} = post;
        const postRawComments = Array.isArray(post.comments) ?  Array.from(post.comments)
            : [{comment: 'no comments yet'}, {comment: 'be first to comment'}];

        const likeStatus = isLiked ?
            <FavoriteOutlinedIcon id='unLike'/>
            : <FavoriteBorderOutlinedIcon id='doLike'/>;

        return (
            <Div key={_id}>
                <StyledImg src={picture} width='80%' alt='post-picture'/>
                <P>{content}</P>
                <p>Дата: {new Date(date).toLocaleDateString()}</p>
                <span>comments: </span>
                <P>
                    <PostComments rawComments={postRawComments}/>
                </P>
                {likeStatus}
                <MailOutlineOutlinedIcon color="disabled" id='doComment'/>
            </Div>
        )
    });


    return (
        <div onClick={handler}>
            {bulkPosts_}
        </div>
    );
};

export default BulkPosts;

const Div = styled.div`
margin-top: 5%;
`;
const P = styled.p`
max-width: 70%;
color: darkslategrey;
margin: 2px auto 
`;

const StyledImg = styled.img`
border-radius: 30px;
border: 1px solid darkblue;
box-shadow: 3px 3px 3px 0 rgba(8, 63, 195, 0.33);
`;
