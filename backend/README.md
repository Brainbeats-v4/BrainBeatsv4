# Building the backend
First you need to have mysql installed. To install it on Ubuntu run this command:
```
sudo apt install mysql-server
```

Next to build, run the command
```
./startbackend.sh
```

WARNING: The version of node.js on Ubuntu 22.04 is not compatible with prisma. To install the updated version of nodejs run these command
```
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
For more information go [here](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions).
