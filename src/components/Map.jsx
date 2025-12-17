import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPositio] = useState([51.505, -0.09]);

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // const position = [51.505, -0.09];

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer center={mapPosition} className={styles.map} scrollWheelZoom={true} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
