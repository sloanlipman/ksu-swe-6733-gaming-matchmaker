<?php
       /*
	* This file is the script that seeds the database. Basically it generates 100 users. It randomizes their names and last names(1000 most common names in america)
	* creates their email addresses (random domains). It also randomly picks a location within the 15 most populous cities in USA. 
	* it then populates their interests and their priorities. That way we have a good set of seed fake data to show. 
	* it was written in php because of the short notice on this. But the production environment alrady suports php for the gitwebhook
	*/	

	Class Person
	{
		// variables //

		public $timings;
		public $priorities;

		// functions // 
		function __construct($conn, $first_names,$last_names,$city_clusters,$domain_array) {
			$this->first_name = $first_names[rand(0, (sizeof($first_names) -1))];
			$this->last_name = $last_names[rand(0, (sizeof($last_names) -1))];

			$random_domain = $domain_array[(rand(0,sizeof($domain_array) - 1))];
			$this->email = $this->first_name.".".$this->last_name.$random_domain;

			$this->age = rand(18,65);

			$this->location_id = $this->get_random_location($conn,$city_clusters);
			$active_rand = rand(1,10);
			if($active_rand <= 8) {
				$this->is_active = true;
			}
			else {
				$this->is_active = false;
			}

			$this->password = '$2a$10$OU3YCfPdVyFMOULbKDPgGujTWWJpVXC4EN/4Cs/PwoVXIp51cuqUq';
			$this->user_type = 2;
			$this->generate_timings();
			$this->generate_priorities();
			$this->generate_interests($conn);
			$this->generate_genres($conn);
		}

		// from 1 to 4 //
		function generate_timings() {
			// number of timings, im trying to do a probability distribution here where most people will have a 1 timing 
			// fewer will have 2, fewer will have 3, fewer will have 4.
			$timings_prob = rand(1,100);
			if ($timings_prob > 0 && $timings_prob <= 50) {
				$timings_prob = 1;
			}
			if ($timings_prob > 50 && $timings_prob <= 70) {
				$timings_prob = 2;
			}
			if ($timings_prob > 70 && $timings_prob <= 90) {
				$timings_prob = 2;
			}
			if ($timings_prob > 90 && $timings_prob < 100) {
				$timings_prob = 4;
			}
				
			for($i=0;$i<4;$i++) {
				$this->timings[] = rand(1,4);
			}
		}

		// from 1 to 4 //
		function generate_priorities() {
			$priorities_array = array(1,2,3,4);
			for($i=0;$i<4;$i++) {
					
				$picked_index = rand(0,(sizeof($priorities_array)-1));
				//echo "picked index: ".$picked_index."\n";
				//echo "priorities_array[$picked_index] is: ".$priorities_array[$picked_index]."\n\n";
				$this->priorities[] = $priorities_array[$picked_index];
				unset($priorities_array[$picked_index]);
				$priorities_array = array_values($priorities_array);
			}
			//echo "-----------------------------------------------------\n";
			//exit();
		}

		// generates 10 to 15 random interests. 
		function generate_interests($conn) {
			// number of interests
			$num_interests = rand(10,15);

			$query = "select id from interests";
			$result = mysqli_query($conn,$query);
			$all_interests = array();
			while($res = mysqli_fetch_assoc($result)) {
				$all_interests[] = $res['id'];
			}	
 
			for($i=0; $i<$num_interests; $i++) {
				$this->interests[] = rand(0,sizeof($all_interests));
			}
		}

		function generate_genres($conn) {
			// number of interests
			$num_genres = rand(2,6);

			$query = "select id from game_genre";
			$result = mysqli_query($conn,$query);
			$all_genres = array();
			while($res = mysqli_fetch_assoc($result)) {
				$all_genres[] = $res['id'];
			}	
 
			for($i=0; $i<$num_genres; $i++) {
				$this->genres[] = rand(0,sizeof($all_genres));
			}
		}

		function get_random_location($conn,$city_clusters){
			// randomly select a city. 
			$random_index = rand(0,sizeof($city_clusters) - 1);
			$random_city = $city_clusters[$random_index][0];
			$random_state = $city_clusters[$random_index][1];

			// query all ids in that city. 
			$query = "select id from locations where city = '".$random_city."' and state = '".$random_state."'";
			$result = mysqli_query($conn,$query);
			$all_location_ids = array();
			while($res = mysqli_fetch_assoc($result)) {
				$all_location_ids[] = $res['id'];
			}	

			// now randomly select one of the indexes of the returned location ids. 
			$random_location_index = rand(0,sizeof($all_location_ids) - 1);
			$random_location_id = $all_location_ids[$random_location_index];
			return $random_location_id;
		}

		function create_user_db($conn) {
			$query = "insert into users (first_name,last_name,email,password,age,location_id,is_active,user_type) values ('".$this->first_name."','".$this->last_name."','".$this->email."','".$this->password."','".$this->age."','".$this->location_id."','".$this->is_active."','".$this->user_type."')";
			echo "$query.\n\n";

			mysqli_query($conn,$query)or die('something went wrong');

			$last_insert_id = mysqli_insert_id($conn);

			// inserting timings 
			foreach($this->timings as $value) {
				$query = "insert into users_timings (user_rec_id,timings_id)values('".$last_insert_id."','".$value."')";
				mysqli_query($conn,$query);
			}

			// insert priorities //
			$counter = 1;
			foreach($this->priorities as $value) {
				$query = "insert into priority_map (user_id,priority_id, the_order)values('".$last_insert_id."','".$value."','".$counter."')";
				mysqli_query($conn,$query);
				$counter++;
			}

			// insert interests //
			foreach($this->interests as $value) {
				$query = "insert into users_interests (interest_id,user_id)values('".$value."','".$last_insert_id."')";
				mysqli_query($conn,$query);
			}

			// insert users_genres //
			foreach($this->genres as $value) {
				$query = "insert into users_genres (user_rec_id,genres_id)values('".$last_insert_id."','".$value."')";
				mysqli_query($conn,$query);
			}
		}
	}

	// end of class //

	// some script functions // 
	function connect_db() {
		//$conn = mysqli_connect("localhost", "root", "B@nana123!@#", "gaming_matchmaker_dev_david")or die("no db connection");
		$conn = mysqli_connect("localhost", "root", "B@nana123!@#", "gaming_matchmaker_dev")or die("no db connection");
		
		if($conn !== false)
			return $conn;
	}

	// truncates tables 
	function truncate_table($conn, $table_name) {
		$query = "TRUNCATE TABLE ".$table_name;
		echo "This query run: ".$query."\n";
		$truncate_result = mysqli_query($conn,$query);
		if($truncate_result == false) {
			exit("FAILED TO TRUNCATE $table_name");
		}
	}

	function delete_table($conn, $table_name) {
		$query = "DELETE FROM ".$table_name;
		echo $query."\n";
		$delete_table_result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if($delete_table_result == false) {
			exit("FAILED TO DELETE $table_name");
		}
	}

	//update hibernate_sequence
	// need to find out what the largest user_id is and set the hibernate_sequences next_val to that + 1;
	function update_hibernate_sequence($conn) {
		$query = "select id from users order by users desc limit 1";
		$result = mysqli_query($conn,$query);
		$res = mysqli_fetch_assoc($result);
		$next_val = $res['id'] + 1;

		$query = "update hibernate_sequence set next_val = '".$next_val."'";
		mysqli_query($conn,$query);
	}

	// BEGIN SCRIPT //

	// putting this outside of the class since not every object needs to save this as an instance variable. 
	$first_names = array("Emma","Olivia","Ava","Isabella","Sophia","Mia","Charlotte","Amelia","Evelyn","Abigail","Harper","Emily","Avery","Sofia","Ella","Madison","Scarlett","Victoria","Aria","Grace","Camila","Penelope","Riley","Layla","Lillian","Nora","Zoey","Mila","Aubrey","Hannah","Lily","Addison","Eleanor","Natalie","Luna","Brooklyn","Leah","Zoe","Stella", "Hazel","Ellie","Paisley","Audrey","Skylar","Violet","Claire","Bella","Aurora","Lucy","Anna","Samantha","Caroline","Genesis","Aaliyah","Kennedy", "Kinsley","Allison","Maya","Sarah","Madelyn","Adeline","Alexa","Ariana","Elena","Gabriella","Naomi","Alice","Sadie","Hailey","Eva","Emilia", "Autumn","Quinn","Nevaeh","Piper","Ruby","Serenity","Willow","Everly","Cora","Kaylee","Lydia","Aubree","Arianna","Eliana","Peyton","Melanie","Gianna","Isabelle","Julia","Valentina","Nova","Clara","Vivian","Reagan","Mackenzie","Madeline","Liam","Noah","William","James","Logan","Benjamin","Mason","Elijah","Oliver","Jacob","Lucas","Michael","Ethan","Daniel","Matthew","Aiden"	,"Henry","Joseph","Jackson","Samuel","David","Carter","Wyatt","Jayden","John","Owen","Dylan","Luke","Gabriel","Anthony","Isaac","Grayson","Jack","Julian","Levi","Joshua","Andrew","Lincoln", "Mateo","Ryan","Jaxon","Nathan","Aaron","Isaiah","Thomas	","Charles","Caleb","Josiah","Christian","Hunter","Eli","Jonathan","Connor	","Landon","Adrian","Asher","Cameron","Leo","Theodore","Jeremiah","Hudson","Robert","Easton","Nolan","Nicholas","Ezra","Colton","Angel","Brayden","Jordan","Dominic","Austin","Ian","Adam","Elias","Jaxson","Greyson","Jose","Ezekiel","Carson","Evan","Maverick","Bryson","Jace","Cooper","Xavier","Parker","Roman","Jason","Santiago","Chase","Sawyer","Gavin","Leonardo","Kayden","Ayde","Jameson");
	$last_names = array("Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez","Campbell","Mitchell","Roberts ","Carter","Phillips","Evans","Turner","Torres","Parker","Collins","Edwards","Stewart","Flores","Morris","Nguyen","Murphy","Rivera","Cook","Rogers","Morgan","Peterson","Cooper","Reed","Bailey","Bell","Gomez","Kelly","Howard","Ward","Cox","Diaz","Richards","Wood","Watson","Brooks","Bennett","Gray","James","Reyes","Cruz","Hughes","Price","Myers","Long","Foster","Sanders","Ross","Morales","Powell","Sullivan","Russell","Ortiz","Jenkins","Gutierre","Perry","Butler","Barnes","Fisher");

	$domain_array = array('@gmail.com', '@yahoo.com', '@aol.com', '@hotmail.com', '@mail.com','@foomail.com');

	$city_clusters = array(
		array('NEW YORK', 'NY'),
		array('MIAMI', 'FL'), 
		array('ATLANTA', 'GA'), 
		array('SEATTLE', 'WA'), 
		array('CHICAGO', 'IL'), 
		array('LOS ANGELES', 'CA'), 
		array('SAN FRANCISCO', 'CA'), 
		array('DALLAS', 'TX'), 
		array('BOSTON', 'MA'), 
		array('MEMPHIS', 'TN'),
		array('LAS VEGAS', 'NV'), 
		array('NEW ORLEANS', 'LA'), 
		array('CINCINNATI', 'OH'), 
		array('DENVER', 'CO'), 
		array('OMAHA', 'NE')
	);


	echo "\nThis is the seed database script. It wipes out the following tables from the database: \n";
	echo "\tusers\n"; 
	echo "\tusers_timings\n"; 
	echo "\tusers_priorities\n";
	echo "\tusers_interests\n";
	echo "\tusers_genres\n";
	echo "\tpriority_map\n";
	echo "\n";

	echo "It then populates the user table with more realisitic users and populates the above tables with more realistic data.\n";

	echo "truncating tables now\n";
	
	$conn = connect_db(); 
	truncate_table($conn, 'users_priorities');
	truncate_table($conn, 'priority_map');
	truncate_table($conn, 'users_genres');
	truncate_table($conn, 'users_interests');
	truncate_table($conn, 'users_timings');
	delete_table($conn, 'users');

	$all_users = array();
	for($i=0;$i<100; $i++) {
		$person = new Person($conn,$first_names,$last_names,$city_clusters,$domain_array);
		$all_users[] = $person;
	}

	foreach($all_users as $value) {
		$value->create_user_db($conn);
	}
?>
