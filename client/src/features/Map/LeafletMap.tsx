import { useEffect, useRef, useState } from "react";
import L, { LatLngExpression, GeoJSON as LeafletGeoJSON, Point } from "leaflet";
import { MapContainer, Marker, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "@mui/material";
import { IVisuals } from "../../store/type";
import { Feature, FeatureCollection } from "geojson";
import { FlyToLocation } from "../../components/FlyToLocation";

const defaultCenter = [53.35014, -6.266155];
const defaultZoom = 11;

type TCoordinateMarker = {
  data: any;
  setShowPopup?: (show: boolean) => void;
};

const CoordinateMarker = ({ data, setShowPopup }: TCoordinateMarker) => {
  return <Marker key={data[0] + data[1]} position={[data[1], data[0]]} />;
};

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
  const data = useSelector((state: RootState) => state.eonet.visuals);
  const combinedCoordinates = useSelector(
    (state: RootState) => state.eonet.coordinatesDetails
  );
  const [position, setPosition] = useState(defaultCenter);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [geoJsonObj, setGeoJsonObj] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const mapRef = useRef<any>(null);
  const geoJsonRef = useRef<LeafletGeoJSON>(null);

  useEffect(() => {
    const features = [] as Feature[];
    data?.length > 0 &&
      data?.map((item: IVisuals) =>
        item.metadata.map((ele: any) =>
          features.push({
            type: "Feature",
            geometry: ele?.geojson,
            properties: {
              name: ele.id,
            },
          })
        )
      );

    setGeoJsonObj({
      ...geoJsonObj,
      features: features,
    });

    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();
      geoJsonRef.current.addData(geoJsonObj); // might need to be geojson.features
    }

  }, [data]);

  useEffect(() => {
    if (geoJsonRef.current && mapRef.current) {
      const map = mapRef.current; // Access the map instance
  
      let hasLayer = false; // Track if any layers are found
  
      geoJsonRef?.current?.eachLayer((layer) => {
        hasLayer = true; // Found at least one layer
  
        if (layer instanceof L.Polygon || layer instanceof L.Polyline || layer instanceof L.GeoJSON) {
          const bounds = layer.getBounds();
          map.flyToBounds(bounds, { animate: true });
        } else if (layer instanceof L.Marker) {
          const latLng = layer.getLatLng();
          map.flyTo(latLng, map.getZoom(), { animate: true });
        }
      });
  
      if (!hasLayer) {
        console.warn("No layers found in geoJsonRef");
      }
    }
  }, [geoJsonRef, mapRef, geoJsonObj]);


  const flyToNextFeature = () => {
    if (geoJsonRef.current && mapRef.current) {
      const map = mapRef.current;
      let featureIndex = 0;

      geoJsonRef.current.eachLayer((layer) => {
        if (featureIndex === currentFeatureIndex) {
          if (
            layer instanceof L.Polygon ||
            layer instanceof L.Polyline ||
            layer instanceof L.GeoJSON
          ) {
            const bounds = layer.getBounds();
            map.flyToBounds(bounds, map.getZoom(), { animate: true });
          } else if (layer instanceof L.Marker) {
            const latLng = layer.getLatLng();
            map.flyTo(latLng, map.getZoom(), { animate: true });
          }
        }
        featureIndex += 1;
      });
      setCurrentFeatureIndex(
        (currentFeatureIndex + 1) % geoJsonObj.features.length
      );
    }
  };

  // const MapFlyTo = ({geJsonRef, map, hasLayer} : any) => {
  //   geoJsonRef?.current?.eachLayer((layer) => {
  //     hasLayer = true; // Found at least one layer

  //     if (layer instanceof L.Polygon || layer instanceof L.Polyline || layer instanceof L.GeoJSON) {
  //       const bounds = layer.getBounds();
  //       map.flyToBounds(bounds, { animate: true });
  //     } else if (layer instanceof L.Marker) {
  //       const latLng = layer.getLatLng();
  //       map.flyTo(latLng, map.getZoom(), { animate: true });
  //     }
  //   });
  // }

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={position as LatLngExpression}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100wh" }}
      >
        <TileLayerContainer />

        {data.length > 0 && (
          <GeoJSON
            key={JSON.stringify(geoJsonObj)}
            ref={geoJsonRef}
            data={geoJsonObj}
          />
        )}

        <NextTo goToNextPosition={flyToNextFeature} />

        {/* <EventModal show={showPopup} setShow={setShowPopup} /> */}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
