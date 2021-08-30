import React from 'react';
import store from '../store';

import {loadUserPosts, getPostAndComments, updateLikeStatus} from './actions';

const userPosts = {
    "_id": {
        "$oid": "610d3507990be0484026c709"
    },
    "postedBy": {
        "$oid": "610d38873740f644cccc1cf1"
    },
    "content": "Vlad: Первые попытки вновь втянуться в музыкальный мир ",
    "picture": "https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_guitar_jqhojn.png",
    "date": {
        "$date": "2021-09-02T13:11:35.374Z"
    },
    "comments": [
        {
            "$oid": "61200c0df691184cbccb9633"
        },
        {
            "$oid": "61269b4327c32b364003fb56"
        },
        {
            "$oid": "61269b4327c32b364003fb59"
        },
        {
            "$oid": "612824561d5f5c359c7ef53b"
        },
        {
            "$oid": "61282d5438a98f28cc5caf7f"
        },
        {
            "$oid": "6129220d66942c36347fc66d"
        }
    ],
    "likes": [
        {
            "$oid": "61168fa7cd8dc01c2069b68e"
        },
        {
            "$oid": "610d38873740f644cccc1cf4"
        }
    ]
};
// const oneUser = {
//     "userNick": "Vlad",
//     "avatarSrc": "https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg"
// };
const postComments = {
    "_id": {
        "$oid": "61200c0df691184cbccb962a"
    },
    "comment": "Пост заебца !!  Krut!!!!!!!!!!",
    "postId": {
        "$oid": "610d3507990be0484026c702"
    },
    "commentedBy": {
        "$oid": "610d38873740f644cccc1cf3"
    },
    "date": {
        "$date": "2021-08-20T20:09:49.268Z"
    },
    "__v": 0
};

// beforeEach(()=>global.fetch.mockClear() );
afterEach(()=>global.fetch.mockRestore() );


it('ckecks loading user posts', () => {
    global.fetch = jest.fn(()=>
        Promise.resolve({json: () => Promise.resolve(userPosts)})
    );
    loadUserPosts("/posts/")(store.dispatch);
    const result = store.getState().loadReducer.activeUserPosts;
    expect(result).toEqual(userPosts);
});

it('checks retrieval of: aPost, comments, aUser', () => {
    global.fetch = jest.fn(()=>
        Promise.resolve({json: ()=> Promise.resolve({postComments})})
    );

    getPostAndComments("/posts/")(store.dispatch);
    const result = store.getState().loadReducer.aPost;
    expect(result).toEqual(postComments.postId);
});

it('checks toggling likes', () => {

jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve("like has toggled")
    }) );
    updateLikeStatus()(store.dispatch);
});


