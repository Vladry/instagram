import React, {useState, useRef} from 'react';
import {useSelector} from "react-redux";
import {sel} from '../redux/load';

import {makeStyles, TextareaAutosize} from '@material-ui/core';
import styled from "styled-components";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {Button} from '@material-ui/core';
import PostComments from "./postComments";

const Card = ({post}) => {
    const textAreaRef = useRef();
    const activeUserId = useSelector(sel.getActiveUser)._id;
    const useStyles = makeStyles({
        btn: {
            fontSize: 10,
            height: 20,
            marginTop: 5,
        }
    });
    const classes = useStyles();

    const [newComment, setNewComment] = useState({});
    const [showComments, setShowComments] = useState(false);

    const postRawComments = Array.isArray(post.comments) ? Array.from(post.comments)
        : [{comment: 'no comments yet'}, {comment: 'be first to comment'}];

    const likeStatus = post.likes.some(likedUserId => (likedUserId === activeUserId)) ?
        < FavoriteIcon id='didLike'/>
        : <FavoriteBorderIcon id='notLiked'/>;

    const postNewComment = (postId, comment, commentedBy) => {
        const url = '/comments/';
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postId,
                comment,
                commentedBy
            })
        }).then(r => r.json())
            .then(newCommentObj => setNewComment(newCommentObj)
            )
            .catch(err => console.log(err.message));
    };
    const handlePostComment = (e) => {
        if (e.key !== "Escape") return;
        const postId = e.target.id;
        const comment = e.target.value;
        postNewComment(postId, comment, activeUserId);
        textAreaRef.current.value = '';
    };
    const toggleComments = () => {
        setShowComments(!showComments)
    };



    return (
        <Div key={post._id}>
            <StyledImg src={post.picture} width='80%' alt='post-picture'
                       id='like' data-testid='like' data-name={post._id} />
            <p>Date: {new Date(post.date).toLocaleDateString()} Title: <StyledSpan>{post.content}</StyledSpan></p>
            <div style={classDiv}>
                <PostComments rawComments={postRawComments} showAll={showComments}/>
                {post._id === newComment.postId
                && <P>{newComment.comment}</P>}
                <Button data-testid='toggleComments' className={classes.btn} onClick={toggleComments} variant='outlined'
                        disabled={(postRawComments.length <= 1) && true}>
                    {!showComments ? "show all" : "show less"}
                </Button>
            </div>

            <p>
                <TextareaAutosize ref={textAreaRef} aria-label={post._id}
                                  onKeyUp={handlePostComment} id={post._id}
                                  placeholder='leave a comment'
                                  maxRows='3' defaultValue=''/>
            </p>

            {likeStatus}

        </Div>

    );
};

export default Card;


const Div = styled.div`
margin-top: 5%;
`;

const classDiv = {
    'maxWidth': '70%',
    'color': 'darkslategrey',
    'margin': '12px auto 2px'
};


const StyledSpan = styled.span`
max-width: 70%;
color: darkgreen;
font-size: 14px;
font-weight: bold;
`;

const StyledImg = styled.img`
border-radius: 30px;
border: 1px solid darkblue;
box-shadow: 3px 3px 3px 0 rgba(8, 63, 195, 0.33);
transition-duration: 0.3s;
&:hover {
opacity: 0.7;
transition-duration: 0.3s;
}
`;

const P = styled.p`
color: red
`;