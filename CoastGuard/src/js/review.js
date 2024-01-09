 // Sample reviews array
 var reviews = [
    {
        id: 1,
        image: "",
        name: "John Doe",
        beach: "Kings Beach",
        rating: 4,
        swellRating: 4,
        crowdLevel: "Moderate",
        comments: "Great beach with beautiful views!",
        timestamp: new Date(),
    },
    {
        id: 2,
        name: "Jane Smith",
        beach: "Dicky Beach",
        rating: 5,
        swellRating: 4,
        crowdLevel: "Low",
        comments: "Clean and peaceful beach. Highly recommended!",
        timestamp: new Date(),
    },
];

function displayReviews() {
    var reviewsContainer = document.getElementById("reviews");
    reviewsContainer.innerHTML = "";

    var sortFilter = document.getElementById("sortFilter").value;


    // Function to compare ratings for sorting
    function compareByRating(a, b) {
        return b.rating - a.rating;
    }

    // Function to compare timestamps for sorting
    function compareByTimestamp(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
    }

    // Apply the selected sorting filter
    switch (sortFilter) {
        case "rating_desc":
            reviews.sort(compareByRating);
            break;
        case "rating_asc":
            reviews.sort((a, b) => compareByRating(b, a)); // Reverse sorting for low to high rating
            break;
        case "timestamp_desc":
            reviews.sort(compareByTimestamp);
            break;
        case "timestamp_asc":
            reviews.sort((a, b) => compareByTimestamp(b, a)); // Reverse sorting for oldest first
            break;
        // Default case will use the default sorting (by ID)
        default:
            break;
    }

    reviews.forEach(function (review) {
        var card = document.createElement("div");
        card.classList.add("card");

        var imageContainer = document.getElementById("imageUpload");
        imageContainer.textContent = review.image

        var beachName = document.createElement("h3");
        beachName.textContent = "Beach: " + review.beach;

        var name = document.createElement("h3");
        name.textContent = "Name: " + review.name;

        var rating = document.createElement("p");
        rating.textContent = "Rating: " + review.rating + " stars";
        
        var swellRating = document.createElement("p");
        swellRating.textContent = "Swell Rating: " + review.swellRating;

        var crowdLevel = document.createElement("p");
        crowdLevel.textContent = "Crowd Level: " + review.crowdLevel;

        var comments = document.createElement("p");
        comments.textContent = "Comments: " + review.comments;

        var timestamp = document.createElement("p");
        timestamp.classList.add("timestamp");
        timestamp.textContent = review.timestamp.toLocaleString();

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editReview(review.id);
        });

        // Add the image to the review card if available
        if (review.image) {
            var imageContainer = document.createElement("div");
            imageContainer.classList.add("review-image");
            var image = document.createElement("img");
            image.src = review.image;
            image.alt = "Review Image";
            imageContainer.appendChild(image);
            card.appendChild(imageContainer);
        }

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button"); 
        deleteButton.addEventListener("click", function () {
            deleteReview(review.id);
        });

        card.appendChild(beachName);
        card.appendChild(name);
        card.appendChild(rating);
        card.appendChild(swellRating);
        card.appendChild(crowdLevel);
        card.appendChild(comments);
        card.appendChild(timestamp);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        reviewsContainer.appendChild(card);
        
    });
}



function addReview(event) {
    event.preventDefault();

    var beachSelect = document.getElementById("beach");
    var selectedBeach = beachSelect.value;

    var name = document.getElementById("name").value;
    var rating = document.getElementById("rating").value;
    var swellRating = document.getElementById("swell").value; // Get swell rating value
    var crowdLevel = document.getElementById("crowdLevel").value;
    var comments = document.getElementById("comments").value;

    var id = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;
    var timestamp = new Date();

    var imageInput = document.getElementById("imageUpload");
    var selectedImage = "";
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            selectedImage = e.target.result; // Convert image to Base64-encoded string
            var newReview = {
                id: id,
                beach: selectedBeach,
                name: name,
                rating: rating,
                crowdLevel: crowdLevel,
                comments: comments,
                timestamp: timestamp,
                image: selectedImage, // Add the image data to the review object
            };
            reviews.push(newReview);
            displayReviews(); // Correct function name here
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // If no image is selected, add the review without the image data
        var newReview = {
            id: id,
            beach: selectedBeach,
            name: name,
            rating: rating,
            crowdLevel: crowdLevel,
            comments: comments,
            timestamp: timestamp,
        };
        reviews.push(newReview);
        displayReviews();
    }

    // Reset the form
    document.getElementById("beach").value = "";
    document.getElementById("name").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("crowdLevel").value = "";
    document.getElementById("comments").value = "";
    document.getElementById("imageUpload").value = ""; // Reset the file input
}


// Function to edit a review
function editReview(id) {
    var review = reviews.find(function (review) {
      return review.id === id;
    });
  
    if (review) {
      var editModal = document.getElementById("editModal");
      var closeModalButton = document.querySelector("#editModal .close");
      var saveChangesButton = document.getElementById("saveChangesBtn");
      var editBeachSelect = document.getElementById("editBeach");
      var editNameInput = document.getElementById("editName");
      var editRatingSelect = document.getElementById("editRating");
      var editSwellSelect = document.getElementById("editSwell"); // Get the swell select element
      var editCrowdLevelSelect = document.getElementById("editCrowdLevel");
      var editCommentsTextarea = document.getElementById("editComments");
      var editImageInput = document.getElementById("editImage");
      var editImagePreview = document.getElementById("editImagePreview");
  
      // Populate the form fields with the review data
      editBeachSelect.value = review.beach;
      editNameInput.value = review.name;
      editRatingSelect.value = review.rating;
      editSwellSelect.value = review.swellRating; // Set the swell select value
      editCrowdLevelSelect.value = review.crowdLevel;
      editCommentsTextarea.value = review.comments;
      editImagePreview.src = review.image; // Display the existing image
  
      // Open the modal
      editModal.style.display = "block";
  
      // Close the modal when the close button is clicked
      closeModalButton.onclick = function () {
        editModal.style.display = "none";
      };
  
      // Close the modal when the user clicks outside the modal
      window.onclick = function (event) {
        if (event.target === editModal) {
          editModal.style.display = "none";
        }
      };
  
      // Save the changes when the "Save Changes" button is clicked
      saveChangesButton.onclick = function () {
        // Update the review data with the new values from the form fields
        review.beach = editBeachSelect.value;
        review.name = editNameInput.value;
        review.rating = editRatingSelect.value;
        review.swellRating = editSwellSelect.value; // Set the swell rating value
        review.crowdLevel = editCrowdLevelSelect.value;
        review.comments = editCommentsTextarea.value;
        // If a new image is selected, update the review image
        if (editImageInput.files && editImageInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            review.image = e.target.result;
            displayReviews(); // Refresh the reviews display
            editModal.style.display = "none"; // Close the modal after saving changes
          };
          reader.readAsDataURL(editImageInput.files[0]);
        } else {
          // If no new image is selected, keep the existing image
          displayReviews(); // Refresh the reviews display
          editModal.style.display = "none"; // Close the modal after saving changes
        }
      };
    }
  }



// Function to delete a review
function deleteReview(id) {
    var index = reviews.findIndex(function (review) {
        return review.id === id;
    });

    if (index !== -1) {
        reviews.splice(index, 1);
        displayReviews();
    }
}

// Function to load beach options dynamically
function loadBeachOptions() {
    var beachSelect = document.getElementById("beach");

    // Replace this section with your code to fetch beach options from a data source
    var beachOptions = [
        { value: "Kings Beach", label: "Kings Beach" },
        { value: "Dicky Beach", label: "Dicky Beach" },
        { value: "Wurtulla Beach", label: "Wurtulla Beach" },
        { value: "Kawana Beach", label: "Kawana Beach" },
        { value: "Mooloolaba Beach Catamarans", label: "Mooloolaba Beach (Catamarans)" },
        { value: "Mooloolaba Beach Spit", label: "Mooloolaba Beach (The Spit)" },
        { value: "Mooloolaba Beach", label: "Mooloolaba Beach" },
        { value: "Alexandra Headland Beach", label: "Alexandra Headland Beach" },
        { value: "Maroochydore Beach", label: "Maroochydore Beach" },
        { value: "Twin Waters Beach", label: "Twin Waters Beach" },
        { value: "Mudjimba Beach", label: "Mudjimba Beach" },
        { value: "Discovery Beach", label: "Discovery Beach" },
        { value: "Marcoola Beach", label: "Marcoola Beach" },
        { value: "Boardwalk Beach", label: "Boardwalk Beach" },
        { value: "Hyatt Beach", label: "Hyatt Beach" },
        { value: "Coolum Beach", label: "Coolum Beach" },
        { value: "Coolum North Beach", label: "Coolum (North) Beach" },
        { value: "Golden Beach", label: "Golden Beach" },
        { value: "Bulcock Beach1", label: "Bulcock Beach" },
        { value: "Bulcock Beach2", label: "Bulcock Beach" },
        { value: "Kings Beach Repeat", label: "Kings Beach" },
        { value: "Dicky Beach Repeat", label: "Dicky Beach" },
        { value: "Currimundi Beach", label: "Currimundi Beach" },
        { value: "Kawana Beach Repeat", label: "Kawana Beach" },
        { value: "Mooloolaba Beach Repeat", label: "Mooloolaba Beach" },
        { value: "Alexandra Headland Beach Repeat", label: "Alexandra Headland Beach" },
        { value: "Maroochydore Beach Repeat", label: "Maroochydore Beach" },
        { value: "Mudjimba Beach Repeat", label: "Mudjimba Beach" },
        { value: "Marcoola Beach Repeat", label: "Marcoola Beach" },
        { value: "Coolum Beach Repeat", label: "Coolum Beach" },
        { value: "Yaroomba Beach", label: "Yaroomba Beach" },
    ];


    beachOptions.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        beachSelect.appendChild(optionElement);
    });
}

// Event listener for form submission
document.getElementById("reviewForm").addEventListener("submit", addReview);

// Event listener for sorting selection
document.getElementById("sortFilter").addEventListener("change", function () {
    displayReviews();
});

// Initial display of reviews
displayReviews();

// Load beach options dynamically
loadBeachOptions();


// Function to trigger file input when "Browse" button is clicked
function triggerFileInput() {
    var fileInput = document.querySelector('.file-input');
    fileInput.click();
}

// Function to show the selected image in the preview
function showSelectedImage(event) {
    var fileInput = event.target;
    var imagePreview = document.getElementById('imagePreview');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        // Set the selected image as the source of the preview
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // If no file is selected, clear the preview
        imagePreview.src = "";
    }
}