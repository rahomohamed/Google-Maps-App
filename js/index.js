var map;
var markers = [];

function initMap() {
  var toronto = {
    lat: 43.648161,
    lng: -79.383075,
  };

  map = new google.maps.Map(document.getElementById("map"), {
    center: toronto,
    zoom: 13,
  });
  displayStores();
  showStoresMarkers();
}

function displayStores() {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    var address = store.address;
    var phone = store.phoneNumber;
    storesHtml += `  <div class="store-container">
    <div class="store-info-container">
        <div class="store-address">
            <span>${address.streetAddressLine1}</span>
            <span>${address.city}, ${address.countrySubdivisionCode} ${address.postalCode}</span>
        </div>
        <div class="store-phone-number">${phone}</div>
    </div>
    <div class="store-number-container">
        <div class="store-number">
            ${index+1}
        </div>
    </div>
</di>
</div>`;
  });
  document.querySelector(".stores-list").innerHTML = storesHtml;
}

function showStoresMarkers() {
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
      console.log(latlng)
var name = store.name;
var address = store.address.streetAddressLine1;
createMarker(latlng, name, address);
})
}

function createMarker(latlng, name, address) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  // google.maps.event.addListener(marker, 'click', function() {
  //   infoWindow.setContent(html);
  //   infoWindow.open(map, marker);
  // });
  markers.push(marker);
} 

