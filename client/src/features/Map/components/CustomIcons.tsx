import L, { icon } from "leaflet";
import { renderToStaticMarkup } from 'react-dom/server';
import { GiWildfires, GiEarthCrack, GiSnowing } from 'react-icons/gi';
import { IoIosThunderstorm } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdFlood, MdOutlineVolcano } from "react-icons/md";

type IconKey = 'default' | 'earthquakes' | 'floods' | 'severeStorms' | 'snow' | 'volcanoes' | 'wildfires';
type IconMap = Record<IconKey, JSX.Element>;

const iconStyle = {
    fontSize: "24px"
}
const iconMap: IconMap = {
    default: <FaMapMarkerAlt style={{...iconStyle, color:"#0095b6"}}/>,
    earthquakes: <GiEarthCrack style={{...iconStyle, color: "#bb846b"}} />,
    floods: <MdFlood style={{...iconStyle, color: "#6677bb"}} />,
    severeStorms: <IoIosThunderstorm style={{...iconStyle, color: "#2d3656"}}/>,
    snow: <GiSnowing style={{...iconStyle, color: "#ecfffd"}} />,
    volcanoes: <MdOutlineVolcano style={{...iconStyle, color: "#f5b91d"}}/>,
    wildfires: <GiWildfires style={{...iconStyle, color: "#AA4203"}} />

  };

export const getCustomIcons = (category: IconKey) => {
    return L.divIcon({
        className: "custom-map-icon",
        html: renderToStaticMarkup(category in iconMap ? iconMap[category] : iconMap.default),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
}