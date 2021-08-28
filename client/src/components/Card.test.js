import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {shallow} from 'enzyme';

import Card from './card';

const activeUserId = "610d38873740f644cccc1cf1";
const post = {
    "_id": {
        "$oid": "610d3507990be0484026c704"
    },
    "postedBy": {
        "$oid": "610d38873740f644cccc1cf1"
    },
    "content": "Vlad: Эпичное фото",
    "picture": "https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg",
    "date": {
        "$date": "2021-08-06T13:11:35.372Z"
    },
    "__v": 0,
    "comments": [
        {
            "$oid": "61269b4327c32b364003fb51"
        },
        {
            "$oid": "61282db138a98f28cc5caf9a"
        }
    ],
    "likes": []
};

describe('testing Card container', () => {

    it('renders a Card', () => {
        const {getAllByText, getAllByTestId, queryAllByText} = render(<Provider store={store}><Card post={post}/></Provider>);
        // screen.debug();
        const img = getAllByTestId('like');
        const date = getAllByText(/Date:/i);
        const btnV1 = queryAllByText("show all");
        const btnV2 = queryAllByText("show less");
        expect(img[0]).toBeInTheDocument() && expect(date[0]).toBeInTheDocument()
        && (expect(btnV1[0]).toBeInTheDocument() || (expect(btnV2[0]).toBeInTheDocument()));
    });

    it('checks functionality of toggle buttons', () => {
        const toggleBtnMock = jest.fn();
        const {getAllByTestId} = render(<Provider store={store}><Card post={post}/></Provider>);
        const btn = getAllByTestId('toggleComments')[0];
        const testBtn = <btn onClick={toggleBtnMock} />;
        userEvent.click(testBtn);
        expect(toggleBtnMock).toHaveBeenCalledTimes(1);
        screen.debug();
    });
});