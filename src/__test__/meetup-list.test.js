import React from 'react';
import { shallow, mount } from 'enzyme';
import { MeetupsList } from '../components/meetup-list';

describe('>>> Create meetup --- Shallow render React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MeetupsList />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

})