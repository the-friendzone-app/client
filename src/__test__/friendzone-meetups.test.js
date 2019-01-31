import React from 'react';
import { shallow, mount } from 'enzyme';
import { FriendZoneMeetups } from '../components/friendzone-meetups';

describe('>>> Friend Zone Meetups --- Shallow render React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FriendZoneMeetups />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders meetups section', () => {
    expect(wrapper.find('meetups').exists());
  })
})