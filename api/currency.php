<?php
  header('Content-Type: application/json; charset=utf-8');

  $API_KEY = '39cbc4bd04b4764c798b8d9cb29b94fe';
  $req_url = 'https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB&key='.$API_KEY;
  $response_json = file_get_contents($req_url);
  print_r($response_json);
?>