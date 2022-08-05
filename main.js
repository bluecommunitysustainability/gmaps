var landmarks = null;
var google_maps_key = 'AIzaSyB_Ipq843n28SCIsdx5RCNd3O1Q3AKfpOA';

// Wait for page to load
document.addEventListener('DOMContentLoaded', function(event) {
	loadLandmarks();
})

function loadLandmarks() {
	let url = 'https://api.sheety.co/26bd883cf4676a241c33f41f2bbf7b92/googleMaps/landmarks';
	fetch(url)
	.then((response) => response.json())
	.then(json => {
		this.landmarks = json.landmarks;
		// Add a short desc for each landmark
		this.landmarks.forEach(landmark => {
			landmark.shortDescription = landmark.description.substring(0, 80);
		})
		// Select first landmark by default
		selectLandmark(this.landmarks[0].id);
	});
}

function drawLandmarks(landmarks) {
	var template = Handlebars.compile(document.getElementById("list-template").innerHTML);
	document.getElementById('list-container').innerHTML = template(landmarks);
}

function selectLandmark(landmarkId) {
	// Deselect landmarks
	this.landmarks.forEach(landmark => {
		landmark.isSelected = false;
	});
	
	// Select new landmark
	var landmark = this.landmarks.find(landmark => {
		return landmark.id == landmarkId;
	});
	landmark.isSelected = true;
	drawLandmarks(this.landmarks);
	drawMap(landmark);
}

function drawMap(landmark) {
	// Just pass the place name to Google Maps
	var query = encodeURIComponent(landmark.name);
	var template = Handlebars.compile(document.getElementById("map-template").innerHTML);
	document.getElementById('map-container').innerHTML = template({
		query: query,
		key: this.google_maps_key	
	});
}
