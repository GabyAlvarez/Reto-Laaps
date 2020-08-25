import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
} from "react-google-maps";

function Map() {

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
        >
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

function Geolocation() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapWrapped
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdpjyXtAodo62WoyiJWFqezrGsCA0dDQk&callback=initMap"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default Geolocation;