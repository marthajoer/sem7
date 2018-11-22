//global variables


var osm = L.tileLayer(
 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 maxZoom: 18,
 attribution: 'Map data © \
 <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
 });

// henter bygnings polygoner
var riskByg = new L.geoJson(null, {
	style: function (feature) {
		return {
			color: '#9a9afc',
			weight: 2,
			opacity: 1
		};
	},
	onEachFeature: function (feature, layer) {
	  if (feature.properties) {
	    var content = '<table border="1" style="border-collapse:collapse;" cellpadding="2">' +
        '<tr>' + '<th>CDTA Route</th>' + '<td>' + feature.properties.gid + '</td>' + '</tr>' +
        '<tr>' + '<th>Route</th>' + '<td>' + feature.properties.bygn_type + '</td>' + '</tr>' +
        '<tr>' + '<th>Identification</th>' + '<td>' + feature.properties.bygn_type + '</td>' + '</tr>' +
        '<tr>' + '<th>Description</th>' + '<td>' + feature.properties.bygn_type + '</td>' + '</tr>' +
        '<table>';
	    layer.bindPopup(content);
	  }
	}
});

$.getJSON("php/getBygData.php", function (data) {
  riskByg.addData(data);
});

//henter adgangsaddrese punkter
bikeRacks = new L.geoJson(null, {
	style: function (feature) {
		return {
      radius: '2',
			color: 'red',
			weight: 2,
			opacity: 1
		};
	},
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = '<table border="1" style="border-collapse:collapse;" cellpadding="2">' +
        '<tr>' + '<th>ID</th>' + '<td>' + feature.properties.gid + '</td>' + '</tr>' +
        '<tr>' + '<th>Name</th>' + '<td>' + feature.properties.vej_navn + '</td>' + '</tr>' +
        '<tr>' + '<th>Address</th>' + '<td>' + feature.properties.vej_navn + '</td>' + '</tr>' +
        '<tr>' + '<th>Town</th>' + '<td>' + feature.properties.vej_navn + '</td>' + '</tr>' +
        '<table>';
      layer.bindPopup(content);
    }
  }
});

$.getJSON("php/getPointData.php", function (data) {
  riskByg.addData(data);
});



map = new L.Map("map",{
   center: [57.051111, 9.919444],
   zoom: 13,
   layers: [osm, riskByg]
 });
