import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Example for Leaflet
import PropTypes from 'prop-types';

const Maps = ({ coord }) => {
  const mapRef = useRef(null); 

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([coord.lat, coord.lon], 10); 
    }
  }, [coord]);

  return (
    <MapContainer center={[coord.lat, coord.lon]} zoom={10} ref={mapRef} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coord.lat, coord.lon]}>
        <Popup>
          Current Location: {coord.lat}, {coord.lon}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Maps;


Maps.propTypes = {
  coord: PropTypes.shape({
    lat: PropTypes.number.isRequired, 
    lon: PropTypes.number.isRequired,  
  }).isRequired, 
};

