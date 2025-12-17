import { map } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCities } from '../contexts/CitiesContext';

import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  const [searchParams, setSearchParams] = useSearchParams();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(() => {
    if (mapLat && mapLng)
      setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer center={mapPosition} className={styles.map} scrollWheelZoom={true} zoom={7}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {mapLat && mapLng && <ChangeCenter position={[Number(mapLat), Number(mapLng)]} />}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

export default Map;
