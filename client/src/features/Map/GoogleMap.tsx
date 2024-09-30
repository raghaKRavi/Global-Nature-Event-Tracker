// import { AdvancedMarker, AdvancedMarkerAnchorPoint, APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const coordinates = [
  { lat: 17.8, lng: 145.3 },
  { lat: -34.28624, lng: -71.09774 },
  { lat: 40.73061, lng: -73.935242 },
];

const center = {
  lat: coordinates.at(2)!.lat, // default latitude
  lng: coordinates.at(2)!.lng, // default longitude
};

const GoogleMap = () => {

  return (
    // // <div className='w-full h-full'>
    // //   <GoogleMap
    // //     options={mapOptions}
    // //     mapContainerStyle={mapContainerStyle}
    // //     zoom={8}
    // //     center={center}
    // //   >
    // //     {coordinates.map((coordinate, index) => (
    // //   <Marker key={index} position={{ lat: coordinate.lat, lng: coordinate.lng }} />
    // // ))}
    // //   </GoogleMap>
    // // </div>

    // <APIProvider apiKey={"AIzaSyDIiyer_pSm1l0Y1hy2lEWudwDSRDGuUHk"}>
    //   <Map
    //   id="dbb1872390a2e9cf"
    //     style={{ width: "100vw", height: "100vh" }}
    //     defaultCenter={{ lat: 22.54992, lng: 0 }}
    //     defaultZoom={3}
    //     gestureHandling={"greedy"}
    //     disableDefaultUI={true}
    //   >
    //     {coordinates.map((coordinate, index) => (
    //   <AdvancedMarker key={index} position={{ lat: coordinate.lat, lng: coordinate.lng }} />
    // ))}
    //   </Map>
    // </APIProvider>
    <></>
  );
};

export default GoogleMap;
 