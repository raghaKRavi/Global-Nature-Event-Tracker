import { Key, useEffect, useState } from "react";
import L, { LatLng, LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FlyToLocation } from "../../components/FlyToLocation";
import { getCustomIcons } from "./components/CustomIcons";
import { Button } from "@mui/material";

const defaultCenter = [-30.96424514150837, 27.5390625];
const defaultZoom = 15;

type TCoordinateMarker = {
  data: any;
  setShowPopup?: (show: boolean) => void;
}

const PointMarker = ({ data, setShowPopup }: any) => {
  return data.map((event: any) => {
    if (Array.isArray(event.geometry) && event.geometry["coordinates"]?.length < 0) {
      return undefined;
    }

    const firstIndex = event.geometry["coordinates"][0];

    // Check if the first coordinate is a string
    if (typeof firstIndex === "number") {
      console.log(event.geometry["coordinates"])
      return (
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
      );
    } else {
      event.geometry["coordinates"].map((cr: L.LatLngTuple, index: Key | null | undefined) => {
        console.log(cr[0], " - ", cr[1]);

        return (<Marker
          key={index}
          position={cr}
          icon={getCustomIcons(event.categories.map((c: any) => c.id))}
          eventHandlers={{
            click: (e) => {
              setShowPopup(true);
              console.log("marker clicked", e);
            },
          }}
        ></Marker>);
      }
      );
    }
  });
};

const CoordinateMarker = ({data, setShowPopup}: TCoordinateMarker) => {
  console.log("Coordinate came in => ", data);
  return (<Marker 
    key={data[0] + data[1]}
    position={[data[1], data[0]]}
  />);
}

const TileLayerContainer = () => {
  return (
    <TileLayer
      attribution='&copy; <a href="#">nature tracker</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};

const NextTo = ({ goToNextPosition }: any) => {
  return (
    <Button
      className="button-on-map"
      onClick={goToNextPosition}
      variant="contained"
      size="small"
      sx={{ margin: "5px", position: "fixed", right: 2 }}
    >
      Next Position
    </Button>
  );
};

const LeafletMap = () => {
  const events = useSelector((state: RootState) => state.eonet.body);
  const [position, setPosition] = useState(defaultCenter);
  const [index, setIndex] = useState<number>(-1);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const coordinatesState = useSelector((state: RootState) => state.eonet.coordinatesDetails);

  console.log(coordinatesState);

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
        
        {events.map((event: any) => {
          const coordinates = event.geometry.coordinates;
          if(Array.isArray(coordinates[0])){
            coordinates.map((coords: Array<number>) => {
              console.log("coords that pass in => ", coords);
              return <CoordinateMarker data={coords} />
            })
            
          } else {
            return <CoordinateMarker data={coordinates}/>
          }
        })}

        {/* {Object.keys(coordinatesState).length > 0 && <CoordinateMarker data={Object.values(coordinatesState)}/>} */}

        {/* <PointMarker data={events} setShowPopup={setShowPopup} /> */}
        <FlyToLocation position={position} />
        {events.length > 0 && <NextTo goToNextPosition={goToNextPosition} />}

        {/* <EventModal show={showPopup} setShow={setShowPopup} /> */}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
