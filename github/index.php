<?PHP
  $github_users_api = "http://github.com/api/v2/json/user/show/";
  $username = $_GET["username"];
  $url = $github_users_api.$username.'/following';
  $github_following = file_get_contents($url);
  echo($github_following);
?>