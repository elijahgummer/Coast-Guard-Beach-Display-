<?php
require_once("navbar.php");
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/ratings.css">
    <title>Beach Review</title>
</head>


<body>
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Review</h2>
            <div id="editReviewForm">
                <div>
                    <label for="editBeach">Beach:</label>
                    <select id="editBeach">
                        <option value="">Select a beach</option>
                        <option value="Kings Beach">Kings Beach</option>
                        <option value="Dicky Beach">Dicky Beach</option>
                        <option value="Wurtulla Beach">Wurtulla Beach</option>
                        <option value="Kawana Beach">Kawana Beach</option>
                        <option value="Mooloolaba Beach Catamarans">Mooloolaba Beach Catamarans</option>
                        <option value="Mooloolaba Beach Spit">Mooloolaba Beach Spit</option>
                        <option value="Mooloolaba Beach">Mooloolaba Beach</option>
                        <option value="Alexandra Headland Beach">Alexandra Headland Beach</option>
                        <option value="Maroochydore Beach">Maroochydore Beach</option>
                        <option value="Twin Waters Beach">Twin Waters Beach</option>
                        <option value="Mudjimba Beach">Mudjimba Beach</option>
                        <option value="Discovery Beach">Discovery Beach</option>
                        <option value="Marcoola Beach">Marcoola Beach</option>
                        <option value="Boardwalk Beach">Boardwalk Beach</option>
                        <option value="Hyatt Beach">Hyatt Beach</option>
                        <option value="Coolum Beach">Coolum Beach</option>
                        <option value="Coolum North Beach">Coolum (North) Beach</option>
                        <option value="Golden Beach">Golden Beach</option>
                        <option value="Bulcock Beach1">Bulcock Beach</option>
                        <option value="Bulcock Beach2">Bulcock Beach</option>
                        <option value="Kings Beach Repeat">Kings Beach</option>
                        <option value="Dicky Beach Repeat">Dicky Beach</option>
                        <option value="Currimundi Beach">Currimundi Beach</option>
                        <option value="Kawana Beach Repeat">Kawana Beach</option>
                        <option value="Mooloolaba Beach Repeat">Mooloolaba Beach</option>
                        <option value="Alexandra Headland Beach Repeat">Alexandra Headland Beach</option>
                        <option value="Maroochydore Beach Repeat">Maroochydore Beach</option>
                        <option value="Mudjimba Beach Repeat">Mudjimba Beach</option>
                        <option value="Marcoola Beach Repeat">Marcoola Beach</option>
                        <option value="Coolum Beach Repeat">Coolum Beach</option>
                        <option value="Yaroomba Beach">Yaroomba Beach</option>

                    </select>

                </div>
                <div>
                    <label for="editName">Name:</label>
                    <input type="text" id="editName" required>
                </div>
                <div>
                    <label for="editRating">Rating:</label>
                    <select id="editRating" required>
                        <!-- Rating options here -->
                        <option value="">Select a rating</option>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                    </select>
                </div>
                <div>
                <label for="editSwell">Swell Rating (out of 5):</label>
                <select id="editSwell" name="editSwell" required>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                </div>
                <div>
                    <label for="editCrowdLevel">Crowd Level:</label>
                    <select id="editCrowdLevel" required>
                        <!-- Crowd level options here -->
                        <option value="">Select a crowd level</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label for="editComments">Comments:</label>
                    <textarea id="editComments" required></textarea>
                </div>
                <div>
                    <label for="editImage">Image:</label>
                    <input type="file" id="editImage" accept="image/*">
                    <div class="image-box">
                        <img id="editImagePreview" src="" alt="Review Image">
                    </div>
                </div>
                <button id="saveChangesBtn">Save Changes</button>
            </div>
        </div>
    </div>



    <div class="form-container">
        <h2>Leave a Review</h2>
        <form id="reviewForm">
            <label for="beach">Beach:</label>
            <select id="beach" name="beach">
                <option value="">Select a beach</option>
            </select>

            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />

            <label for="rating">Rating:</label>
            <select id="rating" name="rating" required>
                <option value="">Select a rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
            </select>

            <label for="swell">Swell Rating (out of 5):</label>
            <select id="swell" name="swell" required>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>

            <label for="crowdLevel">Crowd Level:</label>
            <select id="crowdLevel" name="crowdLevel" required>
                <option value="">Select a crowd level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
            </select>



            <label for="imageUpload" class="file-input-container">
                <span class="file-input-label">Choose File</span>
                <input type="file" id="imageUpload" name="filename" class="file-input"
                    onchange="showSelectedImage(event)">
                <button type="button" class="file-input-button" onclick="triggerFileInput()">Browse</button>
            </label>

            <!-- Add a container to display the selected image -->
            <div id="imagePreviewContainer">
                <div class="image-box">
                    <img id="imagePreview" src="" alt="Selected Image">
                </div>
            </div>

            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments" rows="4" placeholder="Enter your comments" required></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>

    <div class="reviews-container">
        <h2>Reviews</h2>
        <div class="sorting-options">
            <label for="sortFilter">Sort by:</label>
            <select id="sortFilter" name="sortFilter">
                <option value="default">Default (by ID)</option>
                <option value="rating_desc">Rating (High to Low)</option>
                <option value="rating_asc">Rating (Low to High)</option>
                <option value="timestamp_desc">Most Recent</option>
                <option value="timestamp_asc">Oldest</option>
            </select>
        </div>
        <div id="reviews"></div>
    </div>

    <script src="js/review.js"></script>
</body>

</html>