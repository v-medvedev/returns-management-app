<?php

  ini_set('max_execution_time', 999);
	date_default_timezone_set('Europe/London');
	error_reporting(E_ALL);
  ini_set('display_errors', '1');

  $params = $_GET;

	if (isset($params['action'])) {

    $action = $params['action'];

    //Connect to db
		$dbName = "returns-app";            // <- Database name
		$hostname = "localhost";            // <- Localhost always
		$username = "root";                 // <- User Login
    $password = "Dish%Wooden!8";        // <- User password

    $mysqli = new mysqli($hostname, $username, $password, $dbName);

    if ($action == 'getReturnItems') {
      $sql = "SELECT * FROM returns ORDER BY dateOfReturn DESC, magentoOrderNo DESC";
      $result = $mysqli->query($sql);
			$records = [];
			while ($row = $result->fetch_assoc()) {
        $records[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'magentoOrderNo' => $row['magentoOrderNo'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'reasonCode' => $row['reasonCode'],
            'packingNumber' => $row['packingNumber']
        ];
			}
			echo json_encode($records);
    } elseif ($action == 'addReturnItem') {
      $sql = "
          INSERT INTO returns
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          magentoOrderNo = '" . $mysqli->real_escape_string($params['magentoOrderNo']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          reasonCode = '" . $mysqli->real_escape_string($params['reasonCode']) . "',
          packingNumber = '" . $mysqli->real_escape_string($params['packingNumber']) . "'";
      $result = $mysqli->query($sql);
      $record = [
          'id' => $mysqli->insert_id,
          'dateOfReturn' => $params['dateOfReturn'],
          'magentoOrderNo' => $params['magentoOrderNo'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'reasonCode' => $params['reasonCode'],
          'packingNumber' => $params['packingNumber']
      ];
      echo json_encode($record);
    } elseif ($action == 'editReturnItem') {
      $id = intval($params['id'], 10);
      $sql = "
          UPDATE returns
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          magentoOrderNo = '" . $mysqli->real_escape_string($params['magentoOrderNo']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          reasonCode = '" . $mysqli->real_escape_string($params['reasonCode']) . "',
          packingNumber = '" . $mysqli->real_escape_string($params['packingNumber']) . "'
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id'],
          'dateOfReturn' => $params['dateOfReturn'],
          'magentoOrderNo' => $params['magentoOrderNo'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'reasonCode' => $params['reasonCode'],
          'packingNumber' => $params['packingNumber']
      ];
      echo json_encode($record);
    } elseif ($action == 'deleteReturnItem') {
      $id = intval($params['id'], 10);
      $sql = "
          DELETE FROM returns
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id']
      ];
      echo json_encode($record);
    } elseif ($action == 'getFaultyItems') {
            $sql = "SELECT * FROM faulty_items ORDER BY dateOfReturn DESC, magentoOrderNo DESC";
            $result = $mysqli->query($sql);
			$records = [];
			while ($row = $result->fetch_assoc()) {
        $records[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'magentoOrderNo' => $row['magentoOrderNo'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'reasonCode' => $row['reasonCode'],
            'faultDescription' => $row['faultDescription']
        ];
			}
			echo json_encode($records);
    } elseif ($action == 'addFaultyItem') {
      $sql = "
          INSERT INTO faulty_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          magentoOrderNo = '" . $mysqli->real_escape_string($params['magentoOrderNo']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          reasonCode = '" . $mysqli->real_escape_string($params['reasonCode']) . "',
          faultDescription = '" . $mysqli->real_escape_string($params['faultDescription']) . "'";
      $result = $mysqli->query($sql);
      $record = [
          'id' => $mysqli->insert_id,
          'dateOfReturn' => $params['dateOfReturn'],
          'magentoOrderNo' => $params['magentoOrderNo'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'reasonCode' => $params['reasonCode'],
          'faultDescription' => $params['faultDescription']
      ];
      echo json_encode($record);
    } elseif ($action == 'editFaultyItem') {
      $id = intval($params['id'], 10);
      $sql = "
          UPDATE faulty_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          magentoOrderNo = '" . $mysqli->real_escape_string($params['magentoOrderNo']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          reasonCode = '" . $mysqli->real_escape_string($params['reasonCode']) . "',
          faultDescription = '" . $mysqli->real_escape_string($params['packingNumber']) . "'
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id'],
          'dateOfReturn' => $params['dateOfReturn'],
          'magentoOrderNo' => $params['magentoOrderNo'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'reasonCode' => $params['reasonCode'],
          'faultDescription' => $params['faultDescription']
      ];
      echo json_encode($record);
    } elseif ($action == 'deleteFaultyItem') {
      $id = intval($params['id'], 10);
      $sql = "
          DELETE FROM faulty_items
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id']
      ];
      echo json_encode($record);
    } elseif ($action == 'getNoInfoItems') {
      $sql = "SELECT * FROM noinfo_items ORDER BY dateOfReturn DESC";
      $result = $mysqli->query($sql);
			$records = [];
			while ($row = $result->fetch_assoc()) {
        $records[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'details' => $row['details']
        ];
			}
			echo json_encode($records);
    } elseif ($action == 'addNoInfoItem') {
      $sql = "
          INSERT INTO noinfo_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          details = '" . $mysqli->real_escape_string($params['details']) . "'";
      $result = $mysqli->query($sql);
      $record = [
          'id' => $mysqli->insert_id,
          'dateOfReturn' => $params['dateOfReturn'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'details' => $params['details']
      ];
      echo json_encode($record);
    } elseif ($action == 'editNoInfoItem') {
      $id = intval($params['id'], 10);
      $sql = "
          UPDATE noinfo_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          details = '" . $mysqli->real_escape_string($params['details']) . "'
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id'],
          'dateOfReturn' => $params['dateOfReturn'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'details' => $params['details']
      ];
      echo json_encode($record);
    } elseif ($action == 'deleteNoInfoItem') {
      $id = intval($params['id'], 10);
      $sql = "
          DELETE FROM noinfo_items
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id']
      ];
      echo json_encode($record);
    } elseif ($action == 'getNotProcessedItems') {
      $sql = "SELECT * FROM notprocessed_items ORDER BY dateOfReturn DESC";
      $result = $mysqli->query($sql);
			$records = [];
			while ($row = $result->fetch_assoc()) {
        $records[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'details' => $row['details']
        ];
			}
			echo json_encode($records);
    } elseif ($action == 'addNotProcessedItem') {
      $sql = "
          INSERT INTO notprocessed_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          details = '" . $mysqli->real_escape_string($params['details']) . "'";
      $result = $mysqli->query($sql);
      $record = [
          'id' => $mysqli->insert_id,
          'dateOfReturn' => $params['dateOfReturn'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'details' => $params['details']
      ];
      echo json_encode($record);
    } elseif ($action == 'editNotProcessedItem') {
      $id = intval($params['id'], 10);
      $sql = "
          UPDATE notprocessed_items
          SET
          dateOfReturn = '" . $mysqli->real_escape_string($params['dateOfReturn']) . "',
          returnNumber = " . $mysqli->real_escape_string($params['returnNumber']) . ",
          stockNumber = '" . $mysqli->real_escape_string($params['stockNumber']) . "',
          details = '" . $mysqli->real_escape_string($params['details']) . "'
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id'],
          'dateOfReturn' => $params['dateOfReturn'],
          'returnNumber' => intval($params['returnNumber']),
          'stockNumber' => $params['stockNumber'],
          'details' => $params['details']
      ];
      echo json_encode($record);
    } elseif ($action == 'deleteNotProcessedItem') {
      $id = intval($params['id'], 10);
      $sql = "
          DELETE FROM notprocessed_items
          WHERE
          id = " . $id;
      $result = $mysqli->query($sql);
      $record = [
          'id' => $params['id']
      ];
      echo json_encode($record);
    } elseif ($action == 'getReportData') {
      $dFrom = $params['dFrom'];
      $dTo = $params['dTo'];
      // Get Returns
      $sql = "
          SELECT * FROM returns
          WHERE
          dateOfReturn >= '" . $mysqli->real_escape_string($params['dFrom']) . "'
          AND dateOfReturn <= '" . $mysqli->real_escape_string($params['dTo']) . "'";
      $result = $mysqli->query($sql);
      $returns = [];
			while ($row = $result->fetch_assoc()) {
        $returns[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'magentoOrderNo' => $row['magentoOrderNo'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'reasonCode' => $row['reasonCode'],
            'packingNumber' => $row['packingNumber']
        ];
      }
      // Get Faulty
      $sql = "
          SELECT * FROM faulty_items
          WHERE
          dateOfReturn >= '" . $mysqli->real_escape_string($params['dFrom']) . "'
          AND dateOfReturn <= '" . $mysqli->real_escape_string($params['dTo']) . "'";
      $result = $mysqli->query($sql);
      $faulty_items = [];
			while ($row = $result->fetch_assoc()) {
        $faulty_items[] = [
            'id' => intval($row['id']),
            'dateOfReturn' => $row['dateOfReturn'],
            'magentoOrderNo' => $row['magentoOrderNo'],
            'returnNumber' => intval($row['returnNumber'], 10),
            'stockNumber' => $row['stockNumber'],
            'reasonCode' => $row['reasonCode'],
            'faultDescription' => $row['faultDescription']
        ];
      }
      $data = [
          "returns" => $returns,
          "faulty_items" => $faulty_items
      ];
      echo json_encode($data);
    }

    $mysqli->close();

  }

?>
