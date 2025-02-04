<?php
include 'db_connect.php';

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : 0;
$offset = ($page - 1) * $limit;

if ($product_id > 0) {
    // Fetch a single product's details
    $sql = "SELECT p.id, p.name, p.price, p.image, c1.name AS subcategory, c2.name AS maincategory
            FROM products p
            JOIN categories c1 ON p.category_id = c1.id
            LEFT JOIN categories c2 ON c1.parent_id = c2.id
            WHERE p.id = $product_id";
    $result = $conn->query($sql);

    $product = null;
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($product);
} else {
    // Fetch a list of products with pagination and optional category filter
    $sql = "SELECT p.id, p.name, p.price, p.image, c1.name AS subcategory, c2.name AS maincategory
            FROM products p
            JOIN categories c1 ON p.category_id = c1.id
            LEFT JOIN categories c2 ON c1.parent_id = c2.id";
    if ($category_id > 0) {
        $sql .= " WHERE p.category_id = $category_id";
    }
    $sql .= " LIMIT $limit OFFSET $offset";
    $result = $conn->query($sql);

    $products = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    // Get total number of products for pagination
    $total_sql = "SELECT COUNT(*) as total FROM products";
    if ($category_id > 0) {
        $total_sql .= " WHERE category_id = $category_id";
    }
    $total_result = $conn->query($total_sql);
    $total_row = $total_result->fetch_assoc();
    $total_products = $total_row['total'];

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode(['products' => $products, 'total' => $total_products]);
}
?>