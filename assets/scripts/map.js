mapboxgl.accessToken = 'pk.eyJ1IjoiZmxhc2hmYXN0ZHVkZSIsImEiOiJjbDI1MDV3emIwMmlnM2NvMnViZHJ1ZnZwIn0.CVDFo1kKW4I6DhaK3ATCCQ';
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding
    .forwardGeocode({
        query: 'Manitoba Institute of Trades and Technology, Winnipeg',
        autocomplete: false,
        limit: 1
    })
    .send()
    .then((response) => {
        if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
        ) {
            console.error('Invalid response:');
            console.error(response);
            return;
        }
        const feature = response.body.features[0];

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: feature.center,
            zoom: 10
        });

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    });