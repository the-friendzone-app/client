import React from 'react';
import { shallow, mount } from 'enzyme';
import { EventSearchForm } from '../components/event-search-form';
import { Field, reduxForm } from 'redux-form';

// describe('>>> Event search form --- Shallow render React Component', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<EventSearchForm />)
//   })

//   it('renders the component without crashing', () => {
//     wrapper;
//     console.log(wrapper);
//   })

//   it('renders event search form', () => {
//     expect(wrapper.find('event-search-form').exists());
//     expect(wrapper.find('userSearch').exists());
//   })

// });