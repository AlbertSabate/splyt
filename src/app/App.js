import React, { Component } from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.scss';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// GET https://qa-interview-test.qa.splytech.io/api/drivers?latitude=51.5049375,&longitude=-0.0964509&count=1

class App extends Component {
  center = [51.5049375, -0.0964509];
  state = {
    sliderValue: 20,
    draggable: true,
  };

  handleChange = ({ y: sliderValue }) => {
    this.setState({
      sliderValue: sliderValue + 1,
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
          center={this.center}
          zoom={17}
          maxZoom={17}
          minZoom={8}
          zoomControl={false}
          dragging={this.state.draggable}
        >
          <TileLayer attribution="Albert Sabate (Splyt)" url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ZoomControl position="topright" />
          <div className="slider-container" onMouseEnter={this.dragDisable} onMouseLeave={this.dragEnable}>
            <div className="slider">
              <RangeSlider
                axis="y"
                y={this.state.sliderValue}
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
                onChange={this.handleChange}
              />
            </div>
            <div className='slider-value'>{this.state.sliderValue}</div>
          </div>
          <Marker position={this.center}></Marker>
        </Map>
      </div>
    );
  }
}

export default App;
