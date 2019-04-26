<?php

// by dsantos, 04-26-19. swe6733
// this file gets called by github after a successfull push on the repo. 
// If the push is to the master branch then this script calls the automated deployment script. 

//first off, github requires a return timeout of 10 seconds for webhook endpoints. So we return immediately. 

ignore_user_abort(true);
set_time_limit(0);

ob_start();
echo "ok"; // send the response
header('Connection: close');
header('Content-Length: '.ob_get_length());
ob_end_flush();
ob_flush();
flush();

// now we continue excection even though we already made an http resonse. 

@$pass = $_GET['pass'];

// To avoid automated scripts from reaching this page and triggering stuff, I put in a little password on the GET. 
if($pass == 'swe6733')
{
	$json = json_decode($_POST['payload']);
		
	// if the push was to the master branch then we deploy.
	if ($json->ref == "refs/heads/master") {
		exec("/home/david/ci_folder/shell_scripts/automated_build.sh", $output, $return_var);
		//exec("sleep 25s && touch sleep.txt");
	}
}

?>
