// Declare variables
let map;
let googleTerrain;
let baseTiles;
let layerControl;
let patrolledBeaches;
let beachAccessPoints;
let patrolledBeachesMarkers = [];
let beachAccessPointMarkers = [];
let searchInput;
let searchControl;
let patrolledBeachesLayer;
let patrolledBeachLocations = [];



// Execute the code when the window is loaded
document.addEventListener('DOMContentLoaded', loadMap);


// Load the map and initialize other components
async function loadMap() {
  patrolledBeaches = await loadExternalData(
    "https://gislegacy.scc.qld.gov.au/arcgis/rest/services/Society/Society_SCRC/MapServer/6/query?outFields=*&where=1%3D1&f=geojson"
  );
  beachAccessPoints = await loadExternalData(
    "https://gislegacy.scc.qld.gov.au/arcgis/rest/services/Society/Society_SCRC/MapServer/5/query?outFields=*&where=1%3D1&f=geojson"
  );

  createBaseTiles();

  // Initialize the map
  map = L.map("map", {
    center: [-26.65, 153.0967],
    zoom: 12,
    maxZoom: 20,
    minZoom: 1,
    layers: [baseTiles],
  });

  // Create markers for patrolled beaches
  createPatrolledBeachesMarkers();
  createBeachAccessPointMarkers();

  createControls();
}




// Create markers for patrolled beaches
function createPatrolledBeachesMarkers() {
  for (var counter = 0; counter < patrolledBeaches.features.length; counter++) {
    let beach = patrolledBeaches.features[counter];
    let lat = beach.geometry.coordinates[1];
    let long = beach.geometry.coordinates[0];
    let name = beach.properties.Description;
    let description = beach.properties.PatrolledBy;
    let description2 = beach.properties.PatrolFrequency;

    patrolledBeachLocations.push({
      lat: lat,
      lon: long,
      name: name,
      description: description,
      description2: description2,
    });

    beach.picture = getRandomPictureURL();

    patrolledBeachesMarkers[counter] = L.marker([lat, long], {
      icon: new L.DivIcon({
        className: "beachIcon",
        iconSize: [60, 60],
      }),
    });

    patrolledBeachesMarkers[counter].on("click", function () {
      updateCardWithBeachData(beach);
    });

    patrolledBeachesMarkers[counter].bindPopup(
      "<h3>" +
        name +
        "</h3><p>" +
        "Patrolled By:" +
        description +
        "</p><p>" +
        "Patrolled Seasons:" +
        description2 +
        "</p>"
    );
  }

  patrolledBeachesLayer = L.markerClusterGroup().addLayers(
    patrolledBeachesMarkers
  );
}

// Create markers for beach access points
function createBeachAccessPointMarkers() {
  for (
    var counter = 0;
    counter < beachAccessPoints.features.length;
    counter++
  ) {
    let accessPoint = beachAccessPoints.features[counter];
    let lat = accessPoint.geometry.coordinates[1];
    let long = accessPoint.geometry.coordinates[0];
    let accessType = accessPoint.properties.AccessType;

    beachAccessPointMarkers[counter] = L.marker([lat, long], {
      icon: new L.DivIcon({
        className: "accessPointIcon",
        iconSize: [60, 60],
      }),
    });

    beachAccessPointMarkers[counter].on("click", function () {
      updateCardWithAccessPointData(accessPoint);
    });

    beachAccessPointMarkers[counter].bindPopup(
      "<h3>Beach Access Point</h3><p>Access Type: " + accessType + "</p>"
    );
  }
  beachAccessPointMarkers = L.markerClusterGroup().addLayers(
    beachAccessPointMarkers
  );
}

// Get a random picture URL
function getRandomPictureURL() {
  const pictureURLs = ["Images/image1.jpg", "Images/image2.jpg", "Images/image3.jpg", "Images/image4.jpg", "Images/image5.jpg"];
  const randomIndex = Math.floor(Math.random() * pictureURLs.length);
  return pictureURLs[randomIndex];
}

// Update the card with beach data
function updateCardWithBeachData(beach) {
  let cardTitle = document.getElementById("cardTitle");
  let cardPatrolledByDescription = document.getElementById("cardPatrolledByDescription");
  let cardPatrolFrequencyDescription = document.getElementById("cardPatrolFrequencyDescription");
  let cardImage = document.getElementById("cardImage");
  let cardBody = document.querySelector(".card-body");
  let swellText = document.querySelector('#swellText');
  let swimmers = document.querySelector('#swimmerText');
  let randomNum = Math.floor(Math.random()*6);
  let randomSwimmers = Math.floor(Math.random()*151);

  // Show the swell, number of swimmers, and wind direction and not display the access point data but show the patrolled beach data 
  document.getElementById("patrolledBy").style.display = "block";
  document.getElementById("cardImage").style.display = "block";
  document.getElementById("swellIndicator").style.display = "block";
  document.getElementById("swimmerIndicator").style.display = "block";
  document.getElementById("windIndicator").style.display = "block";
  document.getElementById("patrollefrequency").style.display = "block";
  document.getElementById("strt").style.display = "none";
  document.getElementById("assetType").style.display = "none";
  document.getElementById("accessBy").style.display = "none";
  document.getElementById("beachName").style.display = "none";
  document.getElementById("AlternativeAccessPoint").style.display = "none";
  document.getElementById("DogInfo").style.display = "none";
  
 

  cardTitle.innerHTML = beach.properties.Description;
  cardPatrolledByDescription.innerHTML = "Patrolled By: " + beach.properties.PatrolledBy;
  cardPatrolFrequencyDescription.innerHTML =  "Patrolled frequency: " + beach.properties.PatrolFrequency;
  cardImage.src = beach.picture;
  swellText.innerHTML = 'Swell: ' + randomNum + '/5';
  swimmers.innerHTML = 'Swimmers: ' + randomSwimmers;

  cardBody.style.display = "block";
}

// Get access points for a beach
function getAccessPointsForBeach(beach) {
  var accessPoints = beachAccessPoints.features.filter(function (accessPoint) {
    return accessPoint.properties.Beach === beach.properties.Description;
  });

  return accessPoints;
}

// Update the card with access point data
function updateCardWithAccessPointData(accessPoint) {
  let cardTitle = document.getElementById("cardTitle");
  let cardStreetDescription = document.getElementById("cardStreetDescription");
  let cardAccessByDescription = document.getElementById(
    "cardAccessByDescription"
  );
  let cardDescriptionAssetType = document.getElementById(
    "cardDescriptionAssetType"
  );
  let cardImage = document.getElementById("cardImage");
  let cardBody = document.querySelector(".card-body");
  let beachName = document.getElementById("beachNameAccessTo");
  let AlternativeAccess = document.getElementById("AlternativeAccessStreet");
  let DogInfoDisplayCard = document.getElementById("DogInfoDisplay");


  // Hide the swell, number of swimmers, and wind direction
  document.getElementById("cardImage").style.display = "none";
  document.getElementById("patrolledBy").style.display = "none";
  document.getElementById("swellIndicator").style.display = "none";
  document.getElementById("swimmerIndicator").style.display = "none";
  document.getElementById("windIndicator").style.display = "none"; 
  document.getElementById("patrollefrequency").style.display = "none";
  document.getElementById("strt").style.display = "block";
  document.getElementById("assetType").style.display = "block";
  document.getElementById("accessBy").style.display = "block";
  document.getElementById("beachName").style.display = "block";
  document.getElementById("AlternativeAccessPoint").style.display = "block";
  document.getElementById("DogInfo").style.display = "block";
 

  

  cardTitle.innerHTML = "Beach Access Point   " + accessPoint.properties.BeachAccessNo;
  cardDescriptionAssetType.innerHTML = "Asset Type: " + accessPoint.properties.AssetType;
  cardStreetDescription.innerHTML = "Street: " + accessPoint.properties.Street;
  cardAccessByDescription.innerHTML = "Access Type: " + accessPoint.properties.AccessType;
  beachName.innerHTML = "Beach: " + accessPoint.properties.Beach;
  AlternativeAccess.innerHTML = "Alternative Access Point: " + accessPoint.properties.AlternativeAccess;
  DogInfoDisplayCard.innerHTML = "Dog Info: " + accessPoint.properties.DogInfo;


  cardImage.src = ""; // Clear image

  cardBody.style.display = "block";
}

// Create the layer controls
function createControls() {
  let baseLayers = {
    "Roads & Suburbs": baseTiles,
    Satellite: googleTerrain,
  };

  let overlays = {
    "Patrolled Beaches": patrolledBeachesLayer,
    "Beach Access Points": beachAccessPointMarkers,
  };

  layerControl = L.control
    .layers(baseLayers, overlays, {
      autoZIndex: false,
      hideSingleBase: true,
    })
    .addTo(map);
}

// Create the base map tiles
function createBaseTiles() {
  baseTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  googleTerrain = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );
}

// Trigger CSS animation
function triggerAnimation(element, animation) {
  element.style.animation = "none";
  void element.offsetWidth;
  element.style.animation = animation;
}

// Search for a location
function searchLocation() {
  var searchInput = document.getElementById("searchInput").value;

  var searchResults = patrolledBeachLocations.filter(function (beach) {
    return beach.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  if (searchResults.length > 0) {
    var beach = searchResults[0];
    var latLng = L.latLng(beach.lat, beach.lon);
    map.setView(latLng, 12);
    updateCardWithBeachData(beach);
  }
}

// Load external data
async function loadExternalData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


