import React from 'react';
import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';

const MarkerList = props => props.markers.map((marker, i) => (
  <Marker key={`marker-${i}`} position={[marker.location.latitude, marker.location.longitude]} />
));
MarkerList.propTypes = {
  markers: PropTypes.array.isRequired,
};

export default MarkerList;
