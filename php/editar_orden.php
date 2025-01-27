<?php
include_once 'conexion1.php'; 
include_once 'cors.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $orderId = $_POST['orderId'];
    $client = $_POST['Cliente'];
    $provider = $_POST['Proveedor'];
    $observations = $_POST['Observaciones'];
    $amount = $_POST['Monto'];

    if (empty($orderId) || empty($client) || empty($provider) || empty($observations) || empty($amount)) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos']);
        exit;
    }
    try {
        $conexionPDO = new PDO("mysql:host=$servidor;dbname=$bd;charset=UTF8", $usuario, $clave);

        $sql = "UPDATE ORDEN SET cliente_id = :client, proveedor_id = :provider, observaciones = :observations, monto_total = :amount WHERE id = :orderId";
        $statement = $conexionPDO->prepare($sql);
        $statement->execute([
            'client' => $client,
            'provider' => $provider,
            'observations' => $observations,
            'amount' => $amount,
            'orderId' => $orderId
        ]);

        $uploadedFiles = [];
        foreach ($_FILES as $fileKey => $file) {
            if ($file['error'] === UPLOAD_ERR_OK) {
                $uploadDir = 'uploads/'; 
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true); 
                }
        
                $originalName = basename($file['name']);
                $finalName = $originalName;
                $filePath = $uploadDir . $finalName;
                $i = 1;
        
                while (file_exists($filePath)) {
                    $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);
                    $fileBaseName = pathinfo($originalName, PATHINFO_FILENAME);
                    $finalName = $fileBaseName . "_{$i}." . $fileExtension;
                    $filePath = $uploadDir . $finalName;
                    $i++;
                }
        
                if (move_uploaded_file($file['tmp_name'], $filePath)) {
                    $uploadedFiles[] = $finalName;
                    $sql2 = "INSERT INTO ARCHIVOS (orden_id, nombre) VALUES (:orderId, :fileName)";
                    $statementFile = $conexionPDO->prepare($sql2);
                    $statementFile->execute(['orderId' => $orderId, 'fileName' => $finalName]);
                } else {
                    throw new Exception("Error al mover el archivo: " . $file['name']);
                }
            } else {
                throw new Exception("Error al subir archivo: " . $file['name']);
            }
        }
        echo json_encode(['success' => true, 'message' => 'Cotización y archivos actualizados correctamente']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al procesar la solicitud: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
