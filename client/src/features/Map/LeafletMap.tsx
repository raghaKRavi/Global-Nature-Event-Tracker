import { useEffect, useRef, useState } from "react";
import L, { LatLngExpression, GeoJSON as LeafletGeoJSON, Point } from "leaflet";
import { MapContainer, Marker, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Button } from "@mui/material";
import { IVisuals } from "../../store/type";
import { Feature, FeatureCollection } from "geojson";
import { FlyToLocation } from "../../components/FlyToLocation";
import BarChartVisual from "../main/visuals/components/BarChartVisual";
import { HomeContent } from "../main/HomeContent";
import { SearchFilters } from "../main/filters/components/SearchFilters";

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

        {/* <Box className="visualization-container-main" sx={{ 
          bgcolor:  'white',
          // width: '70%', 
          width: {
            xs: '95%',
            sm: '95%',
            md: '95%',
            lg: '80%',
            xl: '60%',
          },
    
          height: {
            xs: '35%',
            sm: '35%',
            md: '35%',
            lg: '40%',
            xl: '35%',
          }, 
          position: "fixed",
          bottom: 0,
          right: {
            xs: '50%',
            sm: '50%',
            md: '50%',
            lg: 0,
            xl: 0,
          },
          transform: {
            xs: 'translateX(50%)',
            sm: 'translateX(50%)',
            md: 'translateX(50%)',
            lg: 'none',
            xl: 'none',
          },
          borderTopLeftRadius: 16,
          borderTopRightRadius: {
            xs: 16,
            sm: 16,
            md: 16,
            lg: 0,
            xl: 0,
          },
          }}>
          <HomeContent />
        </Box> */}

        <Box className="container-main" sx={{
          height: '90%',
          width: {
            xs: '0%',
            sm: '0%',
            md: '0%',
            lg: '30%',
            xl: '20%',
          },
          position: 'fixed',
          top: '5%',
          left: '5%',
          padding: '7px 5px'
        }}>
          <Box className = "search-container" sx={{
            bgcolor: 'white', 
            margin: 'auto', 
            p: '3px 4px', 
            borderRadius: 2, 
            flexShrink: 0, 
            // height: '8%'
            }}>
            <SearchFilters />
          </Box>
          
          <Box className="visual-container" sx={{bgcolor: 'white', height: '100%', mt: 2, borderRadius: 2, p: '2px 10px', maxHeight: '89%'}}>
            <HomeContent />
          </Box>
        </Box>
      </MapContainer>
    </>
  );
};

export default LeafletMap;
