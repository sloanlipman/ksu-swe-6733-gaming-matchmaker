This file is here to explain the files on the infrastructure_scripts folder. 

Our continuous integration scheme is very simple. As developers publish to the master branch, github sends out a POST http request (aka a webhook). The webhook goes
out to webhook.tehcodez.win. This is a separate subdomain we set up in order not to interfere with the front-end code. 

The index.php file in this folder handles that request. It returns a http message to github (which requires webhook endpoints to return in less that 10 seconds). And then 
proceeds to call a bash script on the server. 

The batch script is: automated_build.php. This file sets up the environment to run the build tools required to build the application's frontend and backend. 

The frontend is built with npm and the angular command line (ng). The backend is built with Maven (mvn) commands. 

If both the backend and the frontend are built successfully, the script moves on to the deployment portion. For the backend, the build builds a war file. The deployment is 
simply some bash scripting to make backups of the currently depoyed war file, and then to drop the new war file into Tomcat's webapps folder. Tomcat handless the unwarring automatically. 

For the frontend, a tar gunzip backup of the built app is backed up. The distribution files from the angular built are backed up too. The built frontend is wiped out and replaced by the 
latest copy (just made) of the frontend files. 

