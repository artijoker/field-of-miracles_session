<?php
require("./keys.php");

session_start();
$gameData = [];


if (0 === count(array_diff(KEYS, array_keys($_SESSION)))) {
    foreach (KEYS as $key) {
        $gameData[$key] = $_SESSION[$key];
    }
}

echo json_encode($gameData);
