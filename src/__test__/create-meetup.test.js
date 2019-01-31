import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateMeetup } from '../components/create-meetup';

describe('>>> Create meetup --- Shallow render React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateMeetup />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders meetups section', () => {
    expect(wrapper.find('meetups').exists());
  })

  it('renders page title', () => {
    expect(wrapper.find('create-meetups-title').exists());
  })
})