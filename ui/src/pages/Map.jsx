import React, { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

export const Maps = () => {
    const [infowindowOpen, setInfowindowOpen] = useState(true);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [coordinates, setCoordinates] = useState({ lat: -34.5853, lng: -58.6692 }); // Buenos Aires, Pilar
    const [markers, setMarkers] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                // Generate random markers around the user's location
                const randomMarkers = [];
                for (let i = 0; i < 10; i++) {
                    const lat = position.coords.latitude + (Math.random() - 0.5) * 0.5;
                    const lng = position.coords.longitude + (Math.random() - 0.5) * 0.5;
                    randomMarkers.push({ lat, lng, title: i < 5 ? `Kennel ${i + 1}` : `LostPet ${i - 4}` });
                }
                setMarkers(randomMarkers);
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    const handleSearch = () => {
        // Split the search input by comma and convert to numbers
        const [lat, lng] = searchInput.split(',').map(Number);

        // Generate new markers around the searched location
        const randomMarkers = [];
        for (let i = 0; i < 10; i++) {
            const newLat = lat + (Math.random() - 0.5) * 0.5;
            const newLng = lng + (Math.random() - 0.5) * 0.5;
            randomMarkers.push({ lat: newLat, lng: newLng, title: i < 5 ? `Kennel ${i + 1}` : `LostPet ${i - 4}` });
        }
        setMarkers(randomMarkers);
        setCoordinates({ lat, lng });
    };

    return (
        <APIProvider apiKey={'AIzaSyDHJVXtTCtZdy8Ldq-K9JJz8XpbPcdJEHY'}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter coordinates (lat,lng)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleSearch}
                    style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', marginLeft: '8px' }}
                >
                    Search
                </button>
            </div>
            <Map
                mapId="20a1ff8c4441f0a2"
                style={{ width: '100vw', height: 'calc(100vh - 80px)' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <AdvancedMarker
                    position={coordinates}
                    onClick={() => setInfowindowOpen(true)}
                    title="Your Location"
                >
                    {infowindowOpen && (
                        <InfoWindow
                            anchor={marker}
                            maxWidth={200}
                            onCloseClick={() => setInfowindowOpen(false)}
                        >
                            <div>
                                Latitude: {coordinates.lat.toFixed(4)}<br />
                                Longitude: {coordinates.lng.toFixed(4)}
                            </div>
                        </InfoWindow>
                    )}
                </AdvancedMarker>

                {markers.map((marker, index) => (
                    <AdvancedMarker
                        key={index}
                        position={marker}
                        title={marker.title}
                    />
                ))}
            </Map>
        </APIProvider>
    );
};