import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import './index.scss';
import App from './app/App';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

ReactDOM.render(<App />, document.getElementById('root'));
