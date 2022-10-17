<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM parts";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $parts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $parts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($parts);
        break;
    case "POST":
        $part = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO parts (id, part_number, part_description, stock_quantity, created_at, updated_at) VALUES(null, :part_number, :part_description, :stock_quantity, :created_at, null)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':part_number', $part->part_number);
        $stmt->bindParam(':part_description', $part->part_description);
        $stmt->bindParam(':stock_quantity', $part->stock_quantity);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $part = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE parts SET part_number= :part_number, part_description =:part_description, stock_quantity =:stock_quantity, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y/m/d H:i:s');
        $stmt->bindParam(':id', $part->id);
        $stmt->bindParam(':part_number', $part->part_number);
        $stmt->bindParam(':part_description', $part->part_description);
        $stmt->bindParam(':stock_quantity', $part->stock_quantity);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM parts WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}