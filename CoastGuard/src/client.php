<?php
require_once("navbar.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />



    

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet/dist/leaflet.css" />

    <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>

    <script src="https://unpkg.com/pbf@3.2.1/dist/pbf.js"></script>
    <script src="https://unpkg.com/gtfs-realtime-pbf-js-module@1.0.0/gtfs-realtime.browser.proto.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <!-- CSS FILES -->
    <link rel="stylesheet" href="css/animation.css">
    <link rel="stylesheet" href="css/main.css">



    <!-- Star Rating CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Star Rating JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-star-rating/4.0.6/js/star-rating.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.Default.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/leaflet.markercluster.js"></script>



</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <div class="container-input">
                            <div class="searchBar">
                                <svg onclick="searchLocation()" fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                                    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                                </svg>
                                <input type="text" placeholder="Search for a beach..." name="text" class="input" id="searchInput">
                            </div>
                            <ul id="searchSuggestions"></ul>
                            <div id="filterContainer" class="filter-container">
                                <select id="filterSelect" class="filter-select">
                                    <option value="name">Beach Name</option>
                                    <option value="patrolledBy">Patrolled By</option>
                                    <option value="patrolFrequency">Patrol Frequency</option>
                                    <option value="crowdLevel">Crowd Level</option>
                                    <option value="accessibility">Accessibility</option>
                                </select>
                                <div id="secondaryFilterContainer" class="secondary-filter-container"></div>
                                <button id="filterButton" class="filter-button">Filter</button>
                            </div>

                        </div>
                    </div>
                    <div class="card-body">
                        <!-- Button to trigger the update -->
                        <h3 id="cardTitle">Golden Beach</h3>
                        <img id="cardImage" width="300" height="180">
                        <div id="swellIndicator" class="indicator">
                            <i class="fas fa-water"></i>
                            <span id="swellText">Swell: 3/5</span>
                        </div>
                        <div id="swimmerIndicator" class="indicator">
                            <i class="fas fa-swimmer"></i>
                            <span id="swimmerText">Number of Swimmers: 20</span>
                        </div>
                        <div id="windIndicator" class="indicator">
                            <i class="fas fa-wind"></i>
                            <span id="windText">Wind Direction: NE</span>
                        </div>
                        <!-- Display patrolled BY info -->
                        <div id="patrolledBy" class="patrolled">
                            <i class="fa-solid fa-life-ring"></i>
                            <span id="cardPatrolledByDescription"></span>
                        </div>
                        <!-- Display patrolled season/frequency info -->
                        <div id="patrollefrequency" class="patrolledfreq">
                            <i class="fa-solid fa-cloud"></i>
                            <span id="cardPatrolFrequencyDescription"></span>
                        </div>
                        <!-- Display access by info -->
                        <div id="accessBy" class="access">
                            <i class="fa-brands fa-accessible-icon"></i>
                            <span id="cardAccessByDescription"></span>
                        </div>
                        <!-- Display street info -->
                        <div id="strt" class="street">
                            <i id="road" class="fa-solid fa-road"></i>
                            <span id="cardStreetDescription"></span>
                        </div>
                        <!-- Display Beach Asset Type Beach sing -->
                        <div id="assetType" class="assetTp">
                            <i class="fa-solid fa-sign-hanging"></i>
                            <span id="cardDescriptionAssetType"></span>
                        </div>
                        <!-- Display Beach name in accessPoint card Beach sing -->
                        <div id="beachName" class="bName">
                            <i class="fa-solid fa-umbrella-beach"></i>
                            <span id="beachNameAccessTo"></span>
                        </div>
                        <!-- Display Beach name in accessPoint card Beach sing -->
                        <div id="AlternativeAccessPoint" class="AlternativeAccess">
                            <i class="fa-sharp fa-solid fa-door-open"></i>
                            <span id="AlternativeAccessStreet"></span>
                        </div>
                        <!-- Display Beach name in accessPoint card Beach sing -->
                        <div id="DogInfo" class="DINFO">
                            <i class="fa-solid fa-dog"></i>
                            <span id="DogInfoDisplay"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="map" class="mb-3">
                <div style="margin-top:10px" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading your map...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <script>
        $(document).ready(function() {
            $('#ratingInput').rating();
        });
    </script>
    <script>
        $(document).ready(function() {
            $('#filterButton').click(function() {
                var selectedFilter = $('#filterSelect').val(); // Get the selected filter option
                // Apply the filter logic based on the selectedFilter value
                // Update the displayed data accordingly
            });
        });
    </script>
    <script>
        // Update the swell indicator
        var swellRating = 3; // Replace with the actual swell rating value
        var swellIndicator = document.getElementById("swellIndicator");
        var swellText = document.getElementById("swellText");
        swellText.textContent = "Swell: " + swellRating + "/5";

        // Update the number of swimmers
        var swimmerCount = 20; // Replace with the actual number of swimmers
        var swimmerIndicator = document.getElementById("swimmerIndicator");
        var swimmerText = document.getElementById("swimmerText");
        swimmerText.textContent = "Number of Swimmers: " + swimmerCount;

        // Update the wind direction
        var windDirection = "NE"; // Replace with the actual wind direction
        var windIndicator = document.getElementById("windIndicator");
        var windText = document.getElementById("windText");
        windText.textContent = "Wind Direction: " + windDirection;


        $(document).ready(function() {
            $('#filterSelect').change(function() {
                var selectedFilter = $(this).val();
                var secondaryFilterContainer = $('#secondaryFilterContainer');
                secondaryFilterContainer.empty(); // Clear previous secondary filter options

                if (selectedFilter === 'accessibility') {
                    var wheelchairOptions = ['Ramps', 'Parking', 'Elevators', 'Accessible Toilets'];
                    var dropdownOptions = '<select id="wheelchairOptions" class="filter-select">';
                    wheelchairOptions.forEach(function(option) {
                        dropdownOptions += '<option value="' + option.toLowerCase() + '">' + option + '</option>';
                    });
                    dropdownOptions += '</select>';
                    secondaryFilterContainer.html(dropdownOptions);
                } else if (selectedFilter === 'patrolledBy') {
                    var patrolOptions = ['Council', 'Lifeguards', 'Volunteers'];
                    var dropdownOptions = '<select id="patrolOptions" class="filter-select">';
                    patrolOptions.forEach(function(option) {
                        dropdownOptions += '<option value="' + option.toLowerCase() + '">' + option + '</option>';
                    });
                    dropdownOptions += '</select>';
                    secondaryFilterContainer.html(dropdownOptions);
                } else if (selectedFilter === 'crowdLevel') {
                    var crowdOptions = ['Low (0-50)', 'Medium (51-100)', 'High (101-200)'];
                    var dropdownOptions = '<select id="crowdOptions" class="filter-select">';
                    crowdOptions.forEach(function(option) {
                        dropdownOptions += '<option value="' + option.toLowerCase() + '">' + option + '</option>';
                    });
                    dropdownOptions += '</select>';
                    secondaryFilterContainer.html(dropdownOptions);
                } else if (selectedFilter === 'patrolFrequency') {
                    var frequencyOptions = ['Daily', 'Weekly', 'Monthly'];
                    var dropdownOptions = '<select id="frequencyOptions" class="filter-select">';
                    frequencyOptions.forEach(function(option) {
                        dropdownOptions += '<option value="' + option.toLowerCase() + '">' + option + '</option>';
                    });
                    dropdownOptions += '</select>';
                    secondaryFilterContainer.html(dropdownOptions);
                }
                // Add more conditions for other filter options

                // Example event listeners for secondary filter changes
                secondaryFilterContainer.find('#wheelchairOptions').change(function() {
                    var selectedWheelchairOption = $(this).val();
                    // Perform filtering based on the selected secondary filter option
                });

                secondaryFilterContainer.find('#patrolOptions').change(function() {
                    var selectedPatrolOption = $(this).val();
                    // Perform filtering based on the selected secondary filter option
                });

                secondaryFilterContainer.find('#crowdOptions').change(function() {
                    var selectedCrowdOption = $(this).val();
                    // Perform filtering based on the selected secondary filter option
                });

                secondaryFilterContainer.find('#frequencyOptions').change(function() {
                    var selectedFrequencyOption = $(this).val();
                    // Perform filtering based on the selected secondary filter option
                });

                // Add more event listeners for other secondary filter options
            });

            $('#filterButton').click(function() {
                var selectedFilter = $('#filterSelect').val();
                // Apply the filter logic based on the selected filter option
                // Update the displayed data accordingly
            });
        });
    </script>



    <script src="js/client.js"></script>
    <script src="js/script.js"></script>
</body>

</html>