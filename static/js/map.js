var map;
var coords = {lat: 41.389406, lng: 2.113307};

function initMap() {
	var mapOptions = {
		center: new google.maps.LatLng(coords.lat, coords.lng),
		zoom: 17
	};

	map = new google.maps.Map(document.getElementById("map"),
								mapOptions);

	var marker = new google.maps.Marker({
		position: coords,
		map: map,
		title: 'Hello world'
	});

	/* Just for test a new marker */
	var fakeMark = {lat: 41.389906, lng: 2.113307};

	var marker2 = new google.maps.Marker({
		position: fakeMark,
		map: map,
		title: 'This is fake'
	});

}