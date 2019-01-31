import React from 'react';
import { shallow, mount } from 'enzyme';
import { EventSearch } from '../components/event-search';

describe('>>> Event search --- Shallow render React Component', () => {
  let wrapper;
  let event = { showEventSearchForm: true };
  beforeEach(() => {
    wrapper = shallow(<EventSearch event={event}/>)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders event search page', () => {
    expect(wrapper.find('event-search-page').exists());
    expect(wrapper.find('event-search-page-title').exists());
  })

})