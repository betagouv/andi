#! /bin/sh
echo -e "DANGEROUSLY_DISABLE_HOST_CHECK=true" > /src/ui/.env.development.local
pm2 start ./server/bin/www
cd ./ui
npm start
