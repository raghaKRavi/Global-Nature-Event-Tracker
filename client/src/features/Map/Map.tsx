import {GoogleMap, useLoadScript, Marker, Libraries} from '@react-google-maps/api';

const libraries = ['places'] as Libraries;
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDIiyer_pSm1l0Y1hy2lEWudwDSRDGuUHk',
        libraries,
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }

      const mapOptions = {
        mapTypeControl: false,
      };

      return (
        <div className='w-full h-full'>
          <GoogleMap
            options={mapOptions}
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      );
     
}

export default Map;