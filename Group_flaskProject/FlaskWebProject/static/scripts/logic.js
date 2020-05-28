console.log("beginning the map....")
// Creating map object
var myMap = L.map("map", {
  center: [ 37.09, -95.71 ],
    zoom: 4
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// csv file
csv_file = "static/data/alltrails.csv"

// Grab the data with d3
d3.csv(csv_file).then(data => {

//d3.json("/markercluster").then(function(data){
  console.log("reading json....................")
  console.log(data)

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  data.forEach( row => {

    var lat = row.latitude;
    var long = row.longitude;
       
    if (lat && long) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, long])
        .bindPopup(`<h3>Trail Name: ${row.name}</h3><hr><h4>Hike Difficulty: ${row.difficulty_rating}</h4><h4>Average Rating: ${row.avg_rating}</h4><h4>Number of Reviews: ${row.num_reviews}</h4><h4>Features: ${row.features}</h4>`));
    }

  })
  
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

}
);
