<?php
include "config/db.php";

// Fetch active ads
$sql = "SELECT * FROM ads WHERE status='active'";
$result = $conn->query($sql);

$ads = [];
while($row = $result->fetch_assoc()) {
    $ads[] = $row;
}

function displayAds($ads, $position) {
    foreach($ads as $ad) {
        if($ad['position'] == $position) {
            echo "<div class='ad {$ad['type']}'>{$ad['code']}</div>";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Homepage Ads</title>
    <style>
        .ad { margin: 10px 0; }
        /* Add responsive & auto-size styling here */
    </style>
</head>
<body>
    <header>
        <?php displayAds($ads, 'header'); ?>
    </header>

    <aside>
        <?php displayAds($ads, 'sidebar'); ?>
    </aside>

    <main>
        <h1>Welcome to Homepage</h1>
    </main>

    <footer>
        <?php displayAds($ads, 'footer'); ?>
    </footer>
</body>
</html>
