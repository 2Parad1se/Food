<?php
$_POST = json_decode(file_get_contents("php://input"), true); // строка для принятия файлов JSON
echo var_dump($_POST);