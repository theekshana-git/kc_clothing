<?php
include 'db_connect.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Name: " . $row["name"]. " - Price: " . $row["price"]. " - Category ID: " . $row["category_id"]. " - Image: " . $row["image"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>