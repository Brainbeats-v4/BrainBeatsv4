#!/bin/bash

echo "Stopping development..."

#stop mysql
#...


sudo screen -S Frontend -X quit
sudo screen -S Backend -X quit
