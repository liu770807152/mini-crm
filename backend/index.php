<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include './config/clients.php';
$localhost = "127.0.0.1"; 
$dbname = "users";
$conn = new mysqli($localhost, $username, $password, $dbname); 
mysqli_set_charset($conn, 'utf8');

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);


if($conn->connect_error) {
  die("Error : " . $conn->connect_error);
}

function concatStr($arr, $sep) {
  $result = '';
  foreach ($arr as $field) {
    if ($field !== '') {
      $result = $result.$field.$sep;
    }
  }
  $result = substr($result, 0, -1 * strlen($sep));
  return $result;
}

function checkNotEmpty($arr) {
  for($i = 0; $i < count($arr); $i++) {
    if ($arr[$i] !== '') {
      return true;
    }
  }
  return false;
}

switch ($method) {
  case 'GET':
    if (isset($_GET['id'])) {
      $id = $_GET['id'];
      $sql = "select * from users where id=$id";
    } else if (isset($_GET['name']) || isset($_GET['email']) || isset($_GET['job'])) {
      $condition = '';
      $condition .= !empty($_GET['name']) ? 'name = "'.$_GET['name'].'" AND ' : '';
      $condition .= !empty($_GET['email']) ? 'email = "'.$_GET['email'].'" AND ' : '';
      $condition .= !empty($_GET['job']) ? 'job = "'.$_GET['job'].'"' : '';
      if (substr($condition, -5) === ' AND ') { 
        $condition = substr($condition, 0, -5);
      }
      $sql = strlen($condition) !== 0 ? "select * from users where ".$condition : "select * from users";
    } else {
      $sql = "select * from users";
    }
    break;
  case 'POST':
    if ($_SERVER['HTTP_X_REST_METHOD'] === 'POST') { 
      $name = !empty($input["name"]) ? $input["name"] : '';
      $age = !empty($input["age"]) ? $input["age"] : '';
      $dob = !empty($input["dob"]) ? $input["dob"] : '';
      $job = !empty($input["job"]) ? $input["job"] : '';
      $email = !empty($input["email"]) ? $input["email"] : '';
      $phone = !empty($input["phone"]) ? $input["phone"] : '';
      $gender = !empty($input["gender"]) ? $input["gender"] : '';
      $brief = !empty($input["brief"]) ? $input["brief"] : '';
      $sql = "insert into users (name, age, email, job, phone, gender, brief, dob) values ('$name', $age, '$email', '$job', '$phone', '$gender', '$brief', '$dob')"; 
      break;
    } elseif ($_SERVER['HTTP_X_REST_METHOD'] === 'PUT') {
      if (!isset($input["id"])) {
        return http_response_code(400);
      }
      $id = isset($input["id"]) ? $input["id"] : '';
      $tmpStore = array();
      $tmpStore[0] = !empty($input["name"]) ? 'name = "'.$input["name"].'"' : '';
      $tmpStore[1] = !empty($input["age"]) ? 'age = "'.$input["age"].'"' : '';
      $tmpStore[2] = !empty($input["dob"]) ? 'dob = "'.$input["dob"].'"' : '';
      $tmpStore[3] = !empty($input["job"]) ? 'job = "'.$input["job"].'"' : '';
      $tmpStore[4] = !empty($input["email"]) ? 'email = "'.$input["email"].'"' : '';
      $tmpStore[5] = !empty($input["phone"]) ? 'phone = "'.$input["phone"].'"' : '';
      $tmpStore[6] = !empty($input["gender"]) ? 'gender = "'. $input["gender"].'"' : '';
      $tmpStore[7] = !empty($input["brief"]) ? 'brief = "'. $input["brief"].'"' : '';
      if (checkNotEmpty($tmpStore)) {
        $fields = concatStr($tmpStore, ", ");
        $sql = "update users set " . $fields . " where id=$id";
      }
      break;
    } else { 
      if (!isset($input['id'])) {
        return http_response_code(400);
      }
      $id = $input['id'];
      $sql = "delete from users where id=$id"; 
      break;
    }
}

$result = mysqli_query($conn, $sql);

// return 404 & die if SQL query failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($conn));
}

if ($method == 'GET') {
  header('Content-Type: application/json; charset=utf-8');
  if (!isset($id)) echo '[';
  for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    echo ($i > 0 ? ',' : '').json_encode(mysqli_fetch_object($result));
  }
  if (!isset($id)) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_affected_rows($conn);
}

$conn->close();

?>
