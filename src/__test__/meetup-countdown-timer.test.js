import React from 'react';
import { shallow, mount } from 'enzyme';
import MeetupCountdownTimer from '../components/meetup-countdown-timer';

describe('>>> Meetup countdown timer --- Shallow render React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MeetupCountdownTimer />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders timer', () => {
    expect(wrapper.find('meetup-countdown-timer-container').exists());
  })

})