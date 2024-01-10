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
                [Yy]* ) echo "running > mysql -e CREATE DATABASE brainbeats\n"; break;;
                [Nn]* ) echo "exiting"; exit;;
                * ) echo "Please answer yes or no.";;
            esac
        done

        sudo mysql -e "CREATE DATABASE brainbeats"
        sudo mysql -e "CREATE USER 'brainbeats_root'@'localhost' IDENTIFIED BY ''"
        sudo mysql -e "GRANT ALL ON brainbeats.* TO 'brainbeats_root'@'localhost'"
    else
        echo "brainbeats database found, continuing."
fi

if ! [ -f .env ]; 
    then
        echo ".env file not found."

        while true; do
            read -p "Allow the script to create it? (Y/n) " yn
            case $yn in
                [Yy]* ) echo "creating .env file"; break;;
                [Nn]* ) echo "exiting"; exit;;
                * ) echo "Please answer yes or no.";;
            esac
        done
        
        echo "DATABASE_URL="mysql://brainbeats_root@localhost:3306/brainbeats"" > .env
        echo "JWT_KEY=secret" >> .env

    else
        echo ".env file found, continuing."
fi


# Push prisma 
echo "pushing prisma"
sudo npx prisma db push
sudo npm run dev
