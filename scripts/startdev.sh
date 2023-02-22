#!/bin/bash

echo "Starting development..."

# Check OS
case "$OSTYPE" in
  solaris*) echo "OS: SOLARIS" ;;
  darwin*)  echo "OS: OSX" ;; 
  linux*)   echo "OS: LINUX" ;;
  bsd*)     echo "OS: BSD" ;;
  msys*)    echo "OS: WINDOWS" ;;
  cygwin*)  echo "OS: ALSO WINDOWS" ;;
  *)        echo "unknown: $OSTYPE" ;;
esac

# Start MySQL
#mysql.server start 

# Start the backend
cd ../backend
sudo screen -dm -S Backend bash startbackend.sh

# Start the frontend
cd ../frontend
sudo screen -dm -S Frontend bash startfrontend.sh

# Alert the user
echo "Started the following screen sessions for the app:"
screen -ls



