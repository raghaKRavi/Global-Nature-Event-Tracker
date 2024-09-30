import { LatLngTuple } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import EventModal from "../../components/modals/EventModal";

const coordinates = [
    { lat: 17.8, lng: 145.3 },
    { lat: -34.28624, lng: -71.09774 },
    { lat: 40.73061, lng: -73.935242 },
  ];



const LeafletMapIntegration = () => {
    const [showPopup, setShowPopup] = useState(false);

    const position = [51.505, -0.09] as LatLngTuple;
    return(
        <MapContainer center={coordinates.at(2)} zoom={14} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh'}}>
            <TileLayer
      attribution='&copy; <a href="#">nature tracker</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {coordinates.map((coordinate, index) => (
        <Marker 
        position={coordinate} 
        key={index}
        eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e)
            },
          }}
        >
            </Marker>
    ))}
    <EventModal show={true} setShow={setShowPopup}/>
        </MapContainer>
        
    );
}

export default LeafletMapIntegration;