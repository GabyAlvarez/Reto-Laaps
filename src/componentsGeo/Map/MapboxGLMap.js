import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
};


const MapboxGLMap = () => {
    const midpoint = (lat1, long1, lat2, long2, per) => { return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per]; }

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    midpoint();
    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiZGlhbnllbGFtYWxkb25hZG8iLCJhIjoiY2tlYWF0dHVlMHppNzJyazB4NW93bWVwbCJ9.Ek9X_CGe_dHZar18cG6UDw";

        let geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'image': 'assets/eco-car.png',
                        'message': 'Conductor En camino',
                        'iconSize': [60, 60]
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-99.1784, 19.4132]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'image': 'assets/parking-car.png',
                        'message': 'Tu ubicación',
                        'iconSize': [60, 60]
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-99.1518741, 19.4357993]
                    }
                },
            ]

        };

        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [-99.1784, 19.4132],
                zoom: 11.5
            });

            geojson.features.forEach(function (marker) {
                // create a DOM element for the marker
                let el = document.createElement('img');
                el.className = 'marker';
                el.src = marker.properties.image;
                el.style.width = marker.properties.iconSize[0] + 'px';
                el.style.height = marker.properties.iconSize[1] + 'px';


                el.addEventListener('click', function () {
                    window.alert(marker.properties.message);
                });

                // add marker to map
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    return <div ref={el => (mapContainer.current = el)} style={styles} />;

};

export default MapboxGLMap;