import FallbackSpinner from "@components/spinner";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import "./App.css";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
  });
  const markers = [
    { lat: -26.1741902, lng: 28.1324164 },
    // { lat: 18.5314, lng: 73.8446 },
    // { lat: 18.5642, lng: 73.7769 },
  ];

  const onLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  return (
    <div className="h-full w-full">
      {!isLoaded ? (
        <h1>
          <FallbackSpinner />
        </h1>
      ) : (
        <GoogleMap mapContainerClassName="h-full w-full" onLoad={onLoad}>
          {markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
