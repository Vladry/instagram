import React, {useState} from 'react';
import styled from 'styled-components';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PostComments from "./postComments";
import {TextareaAutosize} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';


const BulkPosts = ({posts, handler}) => {

    const useStyles = makeStyles({
        btn: {
            fontSize: 10,
            height: 20,
            marginTop: 5,
        }
    });
    const classes = useStyles();

    const [showComments, setShowComments] = useState(false);
    const bulkPosts_ = posts.map((post) => {
        const {_id, picture, content, date, isLiked} = post;
        const postRawComments = Array.isArray(post.comments) ? Array.from(post.comments)
            : [{comment: 'no comments yet'}, {comment: 'be first to comment'}];

        const likeStatus = isLiked ?
            <FavoriteOutlinedIcon id='unLike'/>
            : <FavoriteBorderOutlinedIcon id='doLike'/>;

        const handleComment = () => {
            console.log("your comment has been posted!!!!");
        };
        const toggleComments = () => {
            setShowComments(!showComments)
        };

        return (
            <Div key={_id}>
                <StyledImg src={picture} width='80%' alt='post-picture'/>
                <P>{content}</P>
                <p>Дата: {new Date(date).toLocaleDateString()}</p>
                <p><TextareaAutosize aria-label={post._id} placeholder='leave your comment here' maxRows='3'/>
                    <MailOutlineOutlinedIcon  onClick={handleComment} color="disabled" id='doComment'/>
                </p>
                <span>Other visitors left following comments: </span>
                <P>
                    <PostComments rawComments={postRawComments} showAll={showComments}/>
                    <Button className={classes.btn} onClick={toggleComments} variant='outlined'
                            disabled={(postRawComments.length <= 1) && true}>show all comments</Button>
                </P>
                {likeStatus}

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
