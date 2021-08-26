import React, {useState} from 'react';
import styled from 'styled-components';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PostComments from "./postComments";
import {TextareaAutosize} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {sel} from '../redux/load';


const BulkPosts = ({posts, handler}) => {

    const useStyles = makeStyles({
        btn: {
            fontSize: 10,
            height: 20,
            marginTop: 5,
        }
    });

    const activeUserId = useSelector(sel.getActiveUser)._id;

    const handlePostComment = ({target}) => {
        const postId = target.id;
        const comment = target.value;
        const commentedBy = activeUserId;
        const url = '/comments/';
        // console.log(target.id);   console.log(target.value)  ; console.log(commentedBy);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postId,
                comment,
                commentedBy
            })
        }).then(r => r.json())
            .then(res => console.log("this comment has been recorded to DB: ", res))
            .catch(err => console.log(err.message));
    };
    const toggleComments = () => {
        setShowComments(!showComments)
    };

    const classes = useStyles();
    const [showComments, setShowComments] = useState(false);

    const bulkPosts_ = posts.map((post) => {
        const {_id, picture, content, date, isLiked} = post;
        const postRawComments = Array.isArray(post.comments) ? Array.from(post.comments)
            : [{comment: 'no comments yet'}, {comment: 'be first to comment'}];

        const likeStatus = isLiked ?
            <FavoriteOutlinedIcon id='unLike'/>
            : <FavoriteBorderOutlinedIcon id='doLike'/>;

        return (
            <Div key={_id}>
                <StyledImg src={picture} width='80%' alt='post-picture'/>
                <p>Date: {new Date(date).toLocaleDateString()} Title: <StyledSpan>{content}</StyledSpan></p>
                <P>
                    <PostComments rawComments={postRawComments} showAll={showComments}/>
                    <Button className={classes.btn} onClick={toggleComments} variant='outlined'
                            disabled={(postRawComments.length <= 1) && true}>show all comments</Button>
                </P>
                <p>
                    <TextareaAutosize aria-label={post._id} onMouseOut={handlePostComment} id={_id}
                                      placeholder='leave your comment here' maxRows='3'/>
                    {/*<MailOutlineOutlinedIcon onClick={handleComment} color="disabled" id='doComment'/>*/}
                </p>
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
margin: 12px auto 2px 
`;
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
`;
