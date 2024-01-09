<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beach Application</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <!-- Your Custom CSS -->
    <link rel="stylesheet" href="css/navbar.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <img src="Images/logo.png" width="80" height="70">
            <a class="navbar-brand" href="#" id="greeting">CoastGuard</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" ></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="client.php"><i class="fas fa-home"></i> Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fas fa-info-circle"></i> About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="locations.php"><i class="fas fa-map-marked-alt"></i> Locations</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="ratings.php"><i class="fas fa-thumbs-up"></i>Reviews</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fas fa-envelope"></i> Contact</a>
                    </li>
                </ul>
                <div class="dropdown">
                    <button id="dropBtn" class="dropbtn" onclick="showContent()">
                        <i class="fas fa-globe"></i>
                        Language
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div id="dropDownInfo" class="dropdown-content">
                        <button id="enBtn" class="language-button" title="English">English</button>
                        <button id="esBtn" class="language-button" title="Spanish">Español</button>
                        <button id="frBtn" class="language-button" title="French">Français</button>
                        <button id="中国人Btn" class="language-button" title="Chinese">中国人</button>
                        <button id="arBtn" class="language-button" title="Arabic"> عربي</button>
                        <button id="hiBtn" class="language-button" title="Hindi"> हिंदी</button>
                        <button id="poBtn" class="language-button" title="Portuguese"> Português</button>
                        <button id="ruBtn" class="language-button" title="Russian"> Русский</button>
                        <button id="jaBtn" class="language-button" title="Japanese"> 日本</button>
                        <button id="urBtn" class="language-button" title="Western Punjabi"> اردو</button>

                        <!-- Add more language buttons as needed -->
                    </div>
                </div>
            </div>
        </div>
</nav>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Font Awesome Icons JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
</body>

</html>