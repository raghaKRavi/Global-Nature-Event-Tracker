import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FlyToLocation } from "../../components/FlyToLocation";
import { getCustomIcons } from "./components/CustomIcons";
import EventModal from "../../components/modals/EventModal";
import { click } from "@testing-library/user-event/dist/click";
import { EventGeoJsonBodyStruct } from "../../store/type";
import { EventDetailsModalContainer } from "../../components/modals/EventDetailsModalContainer";

const defaultCenter = [53.33306, -6.24889];
const defaultZoom = 15;

const PointMarker = ({data, setShowPopup}: any) => {
  return data.map((event: any) => (
    <Marker
      key={event.id + event.date}
      position={event.geometry["coordinates"]}
      icon={getCustomIcons(event.categories.map((c: any) => c.id))}
      eventHandlers={{
        click: (e) => {
          setShowPopup(true);
          console.log("marker clicked", e);
        },
      }}
    ></Marker>
  ));
};

const TileLayerContainer = () => {
  return (
    <TileLayer
      attribution='&copy; <a href="#">nature tracker</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};

const NextTo = ({goToNextPosition}: any) => {
    return <button 
    className="button-on-map absolute top-2 right-2 m-2 p-3
    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full
    " 
    onClick={goToNextPosition} 
    style={{ marginTop: "10px" }}
    >
    Next Point
  </button>
}

const LeafletMap = () => {
  const events = useSelector((state: RootState) => state.eonet.body);
  const [position, setPosition] = useState(defaultCenter);
  const [index, setIndex] = useState<number>(-1);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (events !== undefined) {
      setIndex(0);
    }
  }, [events]);

  const goToNextPosition = () => {
    setIndex((prevIndex) => (prevIndex + 1) % events?.length);
  };

  useEffect(() => {
    if (index >= 0) {
      setPosition(events[index]?.geometry["coordinates"]);
    }
  }, [index, events]);

  return (
    <>
      <MapContainer
        center={position as LatLngExpression}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100wh" }}
      >
        <TileLayerContainer />
        <PointMarker data={events}  setShowPopup={setShowPopup}/>
        <FlyToLocation position={position} />
        {events.length > 0 && <NextTo goToNextPosition={goToNextPosition} />}
        
        {/* <EventModal show={showPopup} setShow={setShowPopup} /> */}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
