var map;
var markers = [];
var infoWindow;

function initMap() {
  var toronto = {
    lat: 43.648161,
    lng: -79.383075,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: toronto,
    zoom: 11,
    styles: [
        {
          "featureType": "road",
          "stylers": [
              {
                  "hue": "#5e00ff"
              },
              {
                  "saturation": -79
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "saturation": -78
              },
              {
                  "hue": "#6600ff"
              },
              {
                  "lightness": -47
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "lightness": 22
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "hue": "#6600ff"
              },
              {
                  "saturation": -11
              }
          ]
      },
      {},
      {},
      {
          "featureType": "water",
          "stylers": [
              {
                  "saturation": -65
              },
              {
                  "hue": "#1900ff"
              },
              {
                  "lightness": 8
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "weight": 1.3
              },
              {
                  "lightness": 30
              }
          ]
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "hue": "#5e00ff"
              },
              {
                  "saturation": -16
              }
          ]
      },
      {
          "featureType": "transit.line",
          "stylers": [
              {
                  "saturation": -72
              }
          ]
      },
      {}

      ]

  });
  infoWindow = new google.maps.InfoWindow();
  displayStores();
  showStoresMarkers();
  setOnClickListener();
}

function searchStores(){
  var foundStores = [];
  var searchInput = document.getElementById('postal-code-input').value.toUpperCase().substring(0, 3);
  if(searchInput){
      stores.forEach(function(store){
          var postalCode = store.address.postalCode.toUpperCase().substring(0, 3);
          if(postalCode === searchInput){
              foundStores.push(store);
          }
      });
      console.log(foundStores)
    }
  }

function setOnClickListener() {
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click');
      })
  });
}

function displayStores() {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    var address = store.address;
    var phone = store.phoneNumber;
    storesHtml += `  <div class="store-container">
    <div class="store-container-background">
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
</div>
</div>`;
  });
  document.querySelector(".stores-list").innerHTML = storesHtml;
}

function showStoresMarkers() {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
var name = store.name;
var address = store.address.streetAddressLine1;
var statusText = store.openStatusText;
var phone = store.phoneNumber;
bounds.extend(latlng);
createMarker(latlng, name, address, statusText, phone, index);
})
map.fitBounds(bounds);
}

function pinSymbol(color) {
  return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1
  };
} 

function createMarker(latlng, name, address, statusText, phone, index) {
  var html = `
  <div class="store-info-window">
  <div class="store-info-name">
  ${name}
  </div>
  <div class="store-info-status">
  Open Until 6pm
  </div>
  <div class="store-info-address">
  <div class="circle">
  <i class="fas fa-location-arrow"></i>
  </div>
  ${address}
  </div>
  <div class="store-info-phone">
  <div class="store-info-phone">
  <div class="circle">
      <i class="fas fa-phone-alt"></i>
  </div>
  ${phone}
  </div>
  </div>
  `;
  var marker = new google.maps.Marker({
    map: map,
    icon: pinSymbol('#00704A'),
    animation: google.maps.Animation.DROP,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
} 

