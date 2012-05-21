<?PHP
  $twitter_api = "https://api.twitter.com/1/friends/ids.json?screen_name=";
  $username = $_GET["username"];
  $url = $twitter_api.$username;
  $json_ids_from_twitter = file_get_contents($url);
  echo($json_ids_from_twitter);
?>