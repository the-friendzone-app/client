import React from 'react';
import { shallow, mount } from 'enzyme';
import { Meetups } from '../components/meetups';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


describe('>>> Meetups --- Shallow render React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Meetups />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders meetups section', () => {
    expect(wrapper.find('meetups').exists());
  })

  it('renders page title', () => {
    expect(wrapper.find('meetups-page-title').exists());
  })
})