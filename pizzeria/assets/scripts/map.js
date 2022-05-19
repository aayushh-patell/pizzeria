"use strict";
 
 
mapboxgl.accessToken = "pk.eyJ1IjoiZmxhc2hmYXN0ZHVkZSIsImEiOiJjbDI1MDV3emIwMmlnM2NvMnViZHJ1ZnZwIn0.CVDFo1kKW4I6DhaK3ATCCQ";
 
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [20, 50],
    zoom: 7,
});
 
const size = 100;
 
const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
 
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },
 
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;
 
        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;
 
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(122, 163, 238, ${1 - t})`;
        context.fill();
 
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
 
        context.fillStyle = 'rgba(40, 111, 242, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();
 
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;
 
        map.triggerRepaint();
 
        return true;
    }
};
 
map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
 
    map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [20, 50]
                    }
                }
            ]
        }
    });
 
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
});
