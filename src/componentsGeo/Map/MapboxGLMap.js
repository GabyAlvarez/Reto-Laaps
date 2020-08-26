import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
    width: "100vw",
    height: "100vh",
    position: "absolute"
};

const MapboxGLMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiZGlhbnllbGFtYWxkb25hZG8iLCJhIjoiY2tlYWF0dHVlMHppNzJyazB4NW93bWVwbCJ9.Ek9X_CGe_dHZar18cG6UDw";
        let geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'image': 'assets/eco-car.png',
                        'iconSize': [40, 40]
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
                        'iconSize': [40, 40]
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
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-99.1784, 19.4132],
                zoom: 11.5
            });

            geojson.features.forEach(function (marker) {
                let el = document.createElement('img');
                el.className = 'marker';
                el.src = marker.properties.image;
                el.style.width = marker.properties.iconSize[0] + 'px';
                el.style.height = marker.properties.iconSize[1] + 'px';
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
            });

            let partner = new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([-99.1784, 19.4132])
                .setHTML('<span className="popup">Socio en camino</span>')
                .addTo(map);

            let client = new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([-99.1518741, 19.4357993])
                .setHTML('<span className="popup">Tu ubicación</span>')
                .addTo(map);

            map.on("load", () => {

                map.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': [
                                [-99.1784, 19.4132],
                                [-99.1518741, 19.4357993]
                            ]
                        }
                    }
                });

                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#5ED4F4',
                        'line-width': 8
                    }
                });

                setMap(map);
                map.resize();
            });

        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;