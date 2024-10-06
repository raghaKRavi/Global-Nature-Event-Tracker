import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const FlyToLocation = ({ position }: any) => {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        
        map.flyTo(L.latLng(
            parseFloat(position[1]),
            parseFloat(position[0])
        ), 10, {
          duration: 2,
        });
      }
    }, [position, map]);
  
    return null;
  };