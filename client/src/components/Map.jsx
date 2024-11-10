import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ destinations }) => {

    // Map.js


    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';


    const Map = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [exploredPlaces, setExploredPlaces] = useState([]);
    const explorationRadius = 100; // Define exploration radius in meters

    useEffect(() => {
        // Initialize Mapbox
        const mapboxMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.9856, 40.7484],
        zoom: 12,
        });

        setMap(mapboxMap);

        // Add historical place markers with custom images
        destinations.forEach((place) => {
        const el = document.createElement('div');
        el.className = 'place-marker';
        el.style.backgroundImage = `url(${place.imageUrl})`;
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.backgroundSize = 'cover';
        el.style.filter = 'grayscale(100%)';

        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${place.name}</h3><p>${place.description}</p>`
        );

        // Add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(place.coordinates)
            .setPopup(popup)
            .addTo(mapboxMap);

        place.markerElement = el; // Store the element for updating later
        });

        // Cleanup on unmount
        return () => mapboxMap.remove();
    }, []);

    // Add the exploration dot and handle dragging
    useEffect(() => {
        if (!map) return;

        const explorationDot = new mapboxgl.Marker({ color: 'blue', draggable: true })
        .setLngLat([-73.9856, 40.7484])
        .addTo(map);

        explorationDot.on('dragend', () => {
        const dotCoordinates = explorationDot.getLngLat();
        checkExploration(dotCoordinates);
        });

        // Check if the dot is within range of any historical place
        function checkExploration(dotCoordinates) {
        const updatedExploredPlaces = destinations.map((place) => {
            const distance = mapboxgl.LngLat.convert(place.coordinates).distanceTo(dotCoordinates);

            // If within exploration radius, mark as explored
            if (distance <= explorationRadius) {
            place.markerElement.style.filter = 'none'; // Remove grayscale filter
            return place.id; // Return the explored place ID
            }
            return null;
        }).filter(Boolean); // Filter out null values

        setExploredPlaces(updatedExploredPlaces);
        }
    }, [map]);

    return <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }} />;
    };

export default Map;