// URL for earthquake data in json format
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Creating map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
});

// Perform a GET request to the query URL
d3.json(earthquakeUrl, function (data) {
    // Call the createFeatures function with data.features
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    // Create popup info
    L.geoJSON(earthquakeData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><h3>Location: " + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        },

        // Create layers
        pointToLayer: function (feature, latlng) {
            var color;
            var r = 255;
            var g = Math.floor(255 - 100 * feature.properties.mag);
            var b = Math.floor(255 - 80 * feature.properties.mag);
            color = "rgb(" + r + " ," + g + "," + b + ")"

            var geojsonMarkerOptions = {
                radius: 5 * feature.properties.mag,
                fillColor: color,
                color: "darkblue",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(myMap);
}

// Define streetmap 
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={ accessToken }", {
    id: "mapbox.streets",
    accessToken: API_KEY,
}).addTo(myMap);

// Define darkmap
L.layers({ "Earthquakes": earthquakes }).addTo(myMap);

function getColor(d) {
    return d < 1 ? "#FFA07A" :
        d < 2 ? "#FA8072" :
            d < 3 ? "#E9967A" :
                d < 4 ? "#F08080" :
                    d < 5 ? "#CD5C5C" :
                        d < 6 ? "#DC143C" :
                            d < 7 ? "#B22222" :
                                d < 8 ? "#FF0000" :
                                    "#8B0000";
}

