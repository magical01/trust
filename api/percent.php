<?php
  header('Content-Type: application/json; charset=utf-8');

  $data = Array(
    'percent' => '3.7'
  );

  echo(json_encode($data));
?>