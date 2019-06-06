import React, { Component } from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerList from './MarkerList';
import 'leaflet/dist/leaflet.css';
import './App.scss';

const CORS_IGNORE = 'https://cors-anywhere.herokuapp.com/';
const DRIVERS_ENDPOINT = 'https://qa-interview-test.qa.splytech.io/api/drivers';

class App extends Component {
  _isMounted = false;
  state = {
    lat: 51.5049375,
    lng: -0.0964509,
    zoom: 15,
    totalDrivers: 20,
    drivers: [],
    draggable: true,
  };

  async componentDidMount() {
    this._isMounted = true;
    const drivers = await this.getTaxiLocation();
    this._isMounted && this.setState({ drivers });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getTaxiLocation = async () => {
    const queryParams = Object.entries({
      latitude: this.state.lat,
      longitude: this.state.lng,
      count: this.state.totalDrivers,
    }).map(([key, val]) => `${key}=${val}`).join('&');

    const response = await fetch(`${CORS_IGNORE}${DRIVERS_ENDPOINT}?${queryParams}`);
    const { drivers } = await response.json();

    return drivers;
  }

  handleMapMove = async (event) => {
    this.setState({
      ...event.target.getCenter(),
      zoom: event.target.getZoom(),
    });

    const drivers = await this.getTaxiLocation();
    this._isMounted && this.setState({ drivers });
  };

  handleSliderEnd = async () => {
    const drivers = await this.getTaxiLocation();
    this._isMounted && this.setState({ drivers });
  };

  handleSliderChange = ({ y: totalDrivers }) => {
    this.setState({
      totalDrivers: totalDrivers + 1,
    });
  };

  dragEnable = () => {
    this.setState({
      draggable: true,
    });
  };

  dragDisable = () => {
    this.setState({
      draggable: false,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello Splyt!
          </p>
        </header>
        <Map
          className="map"
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          maxZoom={17}
          minZoom={8}
          zoomControl={false}
          dragging={this.state.draggable}
          onMoveEnd={this.handleMapMove}
          onZoomEnd={this.handleMapMove}
        >
          <TileLayer attribution="Albert Sabate (Splyt)" url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ZoomControl position="topright" />
          <div className="slider-container" onMouseEnter={this.dragDisable} onMouseLeave={this.dragEnable}>
            <div className="slider">
              <RangeSlider
                axis="y"
                y={this.state.totalDrivers}
                styles={{
                  options: {
                    handleBorderRadius: 10,
                    handleSize: 10,
                    handleSpace: 10,
                    trackBorderRadius: 2,
                    width: 20,
                  },
                }}
                yMin={0}
                yMax={49}
                yStep={1}
                onChange={this.handleSliderChange}
                onDragEnd={this.handleSliderEnd}
              />
            </div>
            <div className='slider-value'>{this.state.totalDrivers}</div>
          </div>
          <MarkerList markers={this.state.drivers} />
        </Map>
      </div>
    );
  }
}

export default App;
