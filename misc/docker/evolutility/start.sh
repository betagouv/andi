#! /bin/sh
pm2 start ./server/bin/www
cd ./ui
npm start
