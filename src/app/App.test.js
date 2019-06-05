import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('#App', () => {
  let getDrivers;
  beforeEach(() => {
    const mockApi = {"pickup_eta":6,"drivers":[]};
    const mockJsonPromise = Promise.resolve(mockApi);
    const mockFetchPromise = Promise.resolve({
      status: 204,
      json: () => mockJsonPromise,
    });
    getDrivers = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    getDrivers.mockReset();
    getDrivers.mockRestore();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('#componentDidMount should call getTaxiLocation', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();

    expect(getDrivers).toHaveBeenCalledTimes(2);
  });

  it('#dragDisable should change state draggable to false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.dragDisable();

    expect(instance.state.draggable).toBeFalsy();
  });

  it('#dragEnable should change state draggable to true', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.setState({ draggable: false });
    instance.dragEnable();

    expect(instance.state.draggable).toBeTruthy();
  });

  it('#handleMapMove should update center and zoom and call getTaxiLocation', async () => {
    const ev = {
      target: {
        getCenter: () => ({ lat: 21, lng: 22 }),
        getZoom: () => 10,
      },
    };
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.handleMapMove(ev);

    expect(instance.state.lat).toEqual(21);
    expect(instance.state.lng).toEqual(22);
    expect(instance.state.zoom).toEqual(10);
    expect(getDrivers).toHaveBeenCalledTimes(2);
  });

  it('#handleSliderChange should update totalDrivers with y value + 1', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.handleSliderChange({ y: 10 });

    expect(instance.state.totalDrivers).toEqual(11);
  });

  it('#handleSliderEnd should call getTaxiLocation', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.handleSliderEnd();

    expect(getDrivers).toHaveBeenCalledTimes(2);
  });
});
