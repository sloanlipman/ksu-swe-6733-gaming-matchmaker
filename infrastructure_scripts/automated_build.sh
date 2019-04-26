#!/bin/bash

## script to deploy gamingMatchmaker project
## by dsantos, 04-22-19  
## swe6733@ksu.edu
## Explanation: This is to be used on the production server only. certain files and folders are expeced to be 
## in place already. 
## dir: /home/david/ci_folder/files/
## should already contain the needed changes for 
## 	GamingMatchMakerApplication.java
## 	pom.xml 
## file /home/david/ci_folder/files/maven_env_vars.sh
## needs to have the PATH (containing maven, JAVA_HOME and M2_HOME 
## httpd (apache) and tomcat both need te be running on deployment server. httpd on port 80 tomcat on port 8080
## docroot home for httpd should be default on nix boxes, /var/www/html/, tomcat's webapps folder should be on /opt/tomcat/webapps
## ssmtp needs to be installed for the email funtionality.

###some declarations###
# MAIL picks wether to just email me or the whole group after build. 
#MAIL="everybody"; 
MAIL="me";
BACKENDBUILDOK="no";
FRONTENDBUILDOK="no"; 

echo "Starting with backend first."

echo "getting latest code from git."
cd /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker
git checkout master
git pull 

# used later for the email at end of build. 
export AUTHOR=$(git log | head -n 5 | grep Author)
export GITDATE=$(git log | head -n 10 | grep Date | head -n1) 

# war build need special main class changes. 
# replace GamingMatchMakerApplication.java
echo "Making some necessary changes to code to publish war file. (GamingMatchMakerApplication.java)"
\cp -f /home/david/ci_folder/files/GamingMatchMakerApplication.java /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/gamingMatchMaker/src/main/java/com/gamingMatchMaker/gamingMatchMaker/GamingMatchMakerApplication.java

# same with pom, buiding a war requires pom changes to spring boot defaults. 
# replace pom.
echo "Replacing pom.xml file."
cp /home/david/ci_folder/files/pom.xml /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/gamingMatchMaker/pom.xml

# change path if not set to contain maven path. 
echo "Making sure we can excecute Maven commands."
PATH_TEST=$(echo $PATH | grep "maven" | wc -l);
            #if path does not contain maven, make it contain maven.
            if [ $PATH_TEST = 0 ]; then
                echo "making path contain maven"
                export PATH="$PATH:/opt/maven/apache-maven-3.6.0/bin"
            fi
echo "Path now contains maven: $PATH";

# load env variables
source /home/david/ci_folder/files/maven_env_vars.sh

#cd to project 
echo "Going into project dir now..."
cd /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/gamingMatchMaker

#build war, save outcome to string for later use
echo "Building the war file..."
# parse the build output, search for string delimiting success or failure and save it.
BUILD_OUTCOME=$(/opt/maven/apache-maven-3.6.0/bin/mvn clean package -Dmaven.test.skip=true | grep "\(BUILD SUCCESS\|BUILD FAILURE\)" | awk '{print $3}');

if [ $BUILD_OUTCOME = "SUCCESS" ]; then
	echo "Building the war was successfull."
	BACKENDBUILDOK="yes";

elif [ $BUILD_OUTCOME = "FAILURE" ]; then
	BACKENDBUILDOK="no";
	echo "Building the war was failed."

	# email me or the whole group about the success or failiure of the backend. 
	if [ $MAIL = "everybody" ]; then
		printf "Subject: Build Failed!!\n\nA build of the backend has failed. \n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com,sloan.lipman@gmail.com,vaid.imad@gmail.com,moffett.mckenna@gmail.com,andrewjneary@gmail.com 
	else
		printf "Subject: Build Failed!!\n\nA build of the backend has failed. \n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com 
	fi	
	#EXIT THIS SCRIPT, we encountered a failure on the backend build, so, we should NOT go on and try to build the frontend. 
	exit;
else
	# we should not get here. This would only happen if there was no build_outcome message of success or failure. 
	printf "There was no build message, this is not good."
	exit;
fi

# If we get this far is because we sucesssfully built the backend.
# so now we try building the frontend. 

######## FRONTEND #########

echo  "Dealing with the frontend now."

#1 - go to folder 
echo  "Going into frontend folder."
cd /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/matchmaker-ui

#2 - checkout master branch 
echo  "Checking out master branch."
git checkout master

#3 - pull latest 
echo  "Pulling latest on master."
git pull 

#4
echo  "Doing an npm link, cause I ran into issues not doing so..."
npm link

#5 - wipe out dist/matchmaker
echo "Wiping out dist/matchmaker folder."
rm -rf /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/matchmaker-ui/dist

#6 - build the dist files 
echo "running ng build --prod (building prod)"
ng build --prod

$7 - cd to dist and matchmaker
echo "going into dist folder and moving stuff around..."
cd dist/matchmaker/

#8 move everything up. 
mv * ../

#9 cd up one folder.
cd ../

#10 remove matchmaker empty folder
rmdir matchmaker/

#11 get the current date
echo "Getting today's date to append to file."
fedatestring=`date +%d-%m-%Y_%H-%m`

#12 -- compressing code into tarball. 
echo "tar gunzipping the dist folder into BUILT_FRONTEND_TARS folder."
tar -zcvf /home/david/ci_folder/BUILT_FRONTEND_TARS/matchmaker_$fedatestring.tar.gz ./

#13 make a backup of the stuff in /var/www/html
echo "Making a backup of /var/www/html"
rm -rf /tmp/frontend_backupdir
mkdir -p /tmp/frontend_backupdir
cp -r /var/www/html/* /tmp/frontend_backupdir/

# if we get here the build was sucessfull.
echo "Building the front end was ok!!"
	FRONTENDBUILDOK="yes"

# now we can test FRONTENDBUILDOK and BACKENDBUILDOK, if they are both yes, then we can go ahead and do all the actions for publishing both the backend and the frontend. 

if [ $FRONTENDBUILDOK = "yes" ] && [ $BACKENDBUILDOK = "yes" ]; then 
	echo "Doing the dangerous part of the frontend build..."

		# Wipe out /var/www/html
		echo "Wiping out /var/www/html folder."
		#14 remove contents of /var/www/html 
		rm -rf /var/www/html/* 

		# untaring latest build into /var/www/html
		# 14  dont do this yet, we are just testing. 
		tar -zxvf /home/david/ci_folder/BUILT_FRONTEND_TARS/matchmaker_$fedatestring.tar.gz -C /var/www/html/

		if [ $? -ne 0 ]; then 
			rm -rf /var/www/html/*
			cp /tmp/frontend_backupdir/* /var/www/html/

			if [ $MAIL = "everybody" ]; then
				printf "Subject: FRONTEND build failed\n\n Now the backend and frontend are out of sync\n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com,sloan.lipman@gmail.com,vaid.imad@gmail.com,moffett.mckenna@gmail.com,andrewjneary@gmail.com 
			else 
				printf "Subject: FRONTEND build failed\n\n Now the backend and frontend are out of sync\n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com
			fi
		fi

	echo "doing the dangerous part of the backend build..."

		# gotta go back to backend project folder.
		cd /home/david/ci_folder/ksu-swe-6733-gaming-matchmaker/gamingMatchMaker

		#get current date
		datestring=`date +%d-%m-%Y_%H-%m`

		#copy war into BUILT_WARS
		\cp -f ./target/demo-0.0.1-SNAPSHOT.war /home/david/ci_folder/BUILT_WARS/$datestring.war

		datetimestring=`date +%d-%m-%Y_%H-%m-%S`

		#make backup of war. 
		echo "making backup of currently deployed war."
		\cp -f /opt/tomcat/webapps/gamingMatchmaker.war  /home/david/ci_folder/war_backup_dated/$datetimestring.war

		#remove war
		echo "removing currently deployed war."
		rm -f /opt/tomcat/webapps/gamingMatchmaker.war

		# move newly created war to webapps, last war in BUILT_WARS folder 
		echo "move newly created war to webapps, last war in BUILT_WARS folder"
		\cp -f /home/david/ci_folder/BUILT_WARS/$datestring.war /opt/tomcat/webapps/gamingMatchmaker.war

		if [ $MAIL = "everybody" ]; then
			printf "Subject: Successful build\n\nA new version of the backend has been published. \n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com,sloan.lipman@gmail.com,vaid.imad@gmail.com,moffett.mckenna@gmail.com,andrewjneary@gmail.com 
		else 
			printf "Subject: Successful build\n\nA new version of the backend has been published. \n\nLast push by: $AUTHOR\n\nLast push date:$GITDATE\n\n" | ssmtp davidsantosmail@gmail.com
		fi	

else 
	echo "Either the front-end or the back-end did not build correcly. FRONTENDBUILDOK is $FRONTENDBUILDOK, BACKENDBUILDOK is $BACKENDBUILDOK." 
fi 

echo "";
echo "Boss mode activated.";
echo " (̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄ ";
echo "";

