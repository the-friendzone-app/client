import React from 'react'
import { shallow } from 'enzyme';
import Community from '../components/community';


describe('>>>Community --- Shallow Render React Components', () => {
  let wrapper;
  let community= [{
    _id: '100000000000000000000001',
    topics: ['200000000000000000000001', '200000000000000000000002'],
    mainTitle: 'Movies',
    description: 'Discussions around movies',
  }];

  beforeEach(() => {
    wrapper = shallow(<Community community={community}/>);
  })

  it('renders the component without crashing', () => {
    wrapper;
    console.log(wrapper);
  });

  it('renders community page', () => {
    expect(wrapper.find('community-'+community[0].mainTitle).exists());
    expect(wrapper.find('community-intro').exists());
  });

});