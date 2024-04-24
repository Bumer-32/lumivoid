#!/bin/bash

sudo rm -rf /var/www/html/*
find . -maxdepth 1 ! -name "$(basename "$0")" -exec sudo mv {}/* /var/www/html/ \;

