import { latLng, LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import EventModal from "../../components/modals/EventModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CoordinatesMapping } from "../../utils/CoordinatesMapping";

const coordinates = [
  { lat: 17.8, lng: 145.3 },
  { lat: -34.28624, lng: -71.09774 },
  { lat: 40.73061, lng: -73.935242 },
];
export interface ResponseBodyType {
  [key: string]: Array<{}>;
}

const LeafletMapIntegration = () => {
  const events = useSelector((state: RootState) => state.eonet.body);
  const [centerPosition, setCenterPosition] = useState({ lat: 40.73061, lng: -73.935242 } as LatLngExpression);

  const [showPopup, setShowPopup] = useState(false);

  events.length > 0 && CoordinatesMapping(events);

  useEffect(() => {
    if(events != undefined){
      setCenterPosition({lat: events[0]?.geometry["coordinates"][1], lng:events[0]?.geometry["coordinates"][0]} as LatLngExpression);
    }
    
  }, [events])

  // const position = [51.505, -0.09] as LatLngTuple;
  return (
    <MapContainer
      center={centerPosition}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100wh" }}
    >
      <TileLayer
        attribution='&copy; <a href="#">nature tracker</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {coordinates.map((coordinate, index) => (
        <Marker
          position={coordinate}
          key={index}
          eventHandlers={{
            click: (e) => {
              setShowPopup(() => !showPopup);
              console.log("marker clicked", e);
            },
          }}
        ></Marker>
      ))} */}

      {events.map((event: any) => (
        <Marker
        key={event.id + event.date}
        position={event.geometry["coordinates"]}
        ></Marker>
      ))}
      <EventModal show={showPopup} setShow={setShowPopup} />
    </MapContainer>
  );
};

export default LeafletMapIntegration;
