#!/bin/bash

# install modules
sudo npm i



# Check if there exists "brainbeats" database
# if not, we need to make it
RESULT=`sudo mysqlshow -u root brainbeats | grep -v Wildcard | grep -o brainbeats`
if [ "$RESULT" != "brainbeats" ]; 
    then
        echo "brainbeats database not found."

        while true; do
            read -p "Allow the script to create it? (Y/n) " yn
            case $yn in
                [Yy]* ) echo "running > mysql -e CREATE DATABASE brainbeats"; break;;
                [Nn]* ) echo "exiting"; exit;;
                * ) echo "Please answer yes or no.";;
            esac
        done

        mysql -e "CREATE DATABASE brainbeats"
    else
        echo "brainbeats database found, continuing."
fi

# Push prisma 
sudo npx prisma db push
sudo npm run dev
