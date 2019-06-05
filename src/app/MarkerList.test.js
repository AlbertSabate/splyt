import React from 'react';
import ReactDOM from 'react-dom';
import MarkerList from './MarkerList';

const mockApi8 = [{"driver_id":"0-huum843cfri","location":{"latitude":51.50561079581861,"longitude":-0.07313975227372448,"bearing":132}},{"driver_id":"1-blp3d8fkyoa","location":{"latitude":51.50375403761679,"longitude":-0.11956785139878931,"bearing":195}},{"driver_id":"2-jc9ygr0aw3j","location":{"latitude":51.50425907589969,"longitude":-0.07579517451688676,"bearing":298}},{"driver_id":"3-1jiprhwaw1s","location":{"latitude":51.5075142222443,"longitude":-0.11983470898621645,"bearing":87}},{"driver_id":"4-wx1z7gtora","location":{"latitude":51.49833592888628,"longitude":-0.08717706413873516,"bearing":284}},{"driver_id":"5-u09z8n8kzu","location":{"latitude":51.50882004610021,"longitude":-0.11856689270578756,"bearing":87}},{"driver_id":"6-n085s5vgldn","location":{"latitude":51.511973858571444,"longitude":-0.08766889038128922,"bearing":160}},{"driver_id":"7-fgp8vpe9qwg","location":{"latitude":51.504553967896726,"longitude":-0.11393140614086829,"bearing":153}}];

describe('#MarkerList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarkerList markers={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render 8 markers on the map', async () => {
    const markerList = MarkerList({ markers: mockApi8 });

    expect(markerList).toHaveLength(8);
  });
});
