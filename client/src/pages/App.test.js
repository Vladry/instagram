import React from 'react';
import App from './App';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../redux/store';
// import userEvent from 'testing-library/user-event';

jest.mock('react-router-dom', () => ({
// получал ошибку при render <App/>: TypeError: Cannot read property 'location' of undefined
// пришлось замокать, т.к. одна из библиотек потребовала  useLocation:
// подробней:  https://stackoverflow.com/questions/60233907/typeerror-cannot-read-property-location-of-undefined-jest
    useLocation: jest.fn().mockReturnValue({
        pathname: '/another-route',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
}));

describe('testing App page', () => {

    it('renders Main Page', () => {
        render(<Provider store={store}><App/></Provider>);
        screen.debug();
    });

    it('must have required sections and text', () => {
        const {getByText, getAllByAltText} = render(<Provider store={store}><App/></Provider>);
        getByText(/шаг списков/i) && getAllByAltText('user-avatar') && getByText('Show More Posts');
    });

    it('mocks the click of the SHOW MORE button', ()=>{
        const fetchMoreUsersMock = jest.fn();
        const {getByText, getByTestId} = render(<Provider store={store}><App incrementDate={fetchMoreUsersMock}/></Provider>);
        // const showMoreButton = getByText(/Show More Posts/i);
        const showMoreButton = getByTestId('showMorePosts');
        expect(showMoreButton).toBeInTheDocument();
        fireEvent.click(showMoreButton);
       // userEvent.click(showMoreButton);  //альтернатива fireEvent
        expect(fetchMoreUsersMock).toHaveBeenCalledTimes(1);
        screen.debug();
    });


});