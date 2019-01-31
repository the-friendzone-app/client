import React from 'react';
import { shallow, mount } from 'enzyme';
import { MeetupsList } from '../components/meetup-details';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('>>> Meetup Details --- Shallow render React Component', () => {
  let wrapper;
  let location = {
    state: {
      meetup: {
        name: "Wicked",
        location: "Hollywood Pantages Theatre, 6233 Hollywood Blvd, Los Angeles, CA",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan...",
        startTime: "2019-01-24T06:00:00.000Z",
        endTime: "2019-01-24T08:00:00.000Z",
        createdBy: "tchun",
        createdAt: '2019-01-24T06:00:00.000Z',
        updatedAt: '2019-01-24T08:00:00.000Z',
      }
    }
  }
  let meetupAttendence = [{
    username: "tchun",
    meetupId: "5c473d619c530431c49b9999",
    createdAt: '2019-01-22T15:58:29.168+00:00',
    updatedAt: '2019-01-22T15:58:29.168+00:00',
  }]

  let store;
  let mockStore = configureStore();


  beforeEach(() => {
    wrapper = mount(<Provider store={store}><MeetupsList location={location} meetupAttendence={meetupAttendence} /></Provider>)
    // wrapper = shallow(<MeetupsList location={location} meetupAttendence={meetupAttendence} />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  // it('renders event search page', () => {
  //   expect(wrapper.find('event-search-page').exists());
  //   expect(wrapper.find('event-search-page-title').exists());
  // })

})