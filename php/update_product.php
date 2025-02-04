<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $image = $_POST['image'];

    $sql = "UPDATE products SET name='$name', price='$price', category_id='$category_id', image='$image' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo "Product updated successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Product</title>
</head>
<body>
    <h1>Update Product</h1>
    <form action="update_product.php" method="post">
        <label for="id">Product ID:</label>
        <input type="text" id="id" name="id" required><br>
        <label for="name">Product Name:</label>
        <input type="text" id="name" name="name" required><br>
        <label for="price">Price:</label>
        <input type="text" id="price" name="price" required><br>
        <label for="category_id">Category ID:</label>
        <input type="text" id="category_id" name="category_id" required><br>
        <label for="image">Image URL:</label>
        <input type="text" id="image" name="image"><br>
        <input type="submit" value="Update Product">
    </form>
</body>
</html>