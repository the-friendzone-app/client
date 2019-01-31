import React from 'react';
import { shallow, mount } from 'enzyme';
import { EventSearchResults } from '../components/event-search-results';
import { Field, reduxForm } from 'redux-form';

describe('>>> Event search results --- Shallow render React Component', () => {
  let events = {
    events: [{
      name: "Lots of Layers Card Class - Heights Location",
      description: "In this class we will make 5 cards (including envelopes) that have man...",
      url: "https://www.eventbrite.com/e/lots-of-layers-card-class-heights-locatio...",
      start: "2019-04-10T00:00:00Z",
      end: "2019-04-10T03:00:00Z",
      venueId: "17374265",
      venueData: {
        address: "12004 Baja Dr. NE , Albuquerque, NM 87111",
        latitude: "35.1030501",
        longitude: "-106.5171626",
      }
    }]
  }

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventSearchResults events={events} />)
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  })

  it('renders event search results', () => {
    expect(wrapper.find('event-search-results').exists());
    expect(wrapper.find('event-search-results-page-title').exists());
  })

});