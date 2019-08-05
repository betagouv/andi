FROM node:9

ARG PG_USER="user"
ARG PG_PASS="secret"
ARG PG_HOST="database"
ARG PG_PORT="54320"
ARG PG_DB="andi_entreprises"
ENV DATABASE_URL=postgres://$PG_USER:$PG_PASS@$PG_HOST:$PG_PORT/$PG_DB

RUN mkdir /src
WORKDIR /src

# For testing
# RUN apt-get update && \
#     apt-get install postgresql-client -y

COPY start.sh ./start.sh
RUN npm install pm2@latest -g && \
    chmod +x ./start.sh

RUN echo "Cloning evolutility source.." && \
    # git clone https://github.com/evoluteur/evolutility-server-node.git ./ && \
    git clone https://github.com/PieterjanMontens/evolutility-server-node.git ./server && \
    git clone https://github.com/evoluteur/evolutility-ui-react ./ui

WORKDIR /src/server
RUN git checkout patch_udate_cdate && \
    npm install

COPY ./server/config.js ./config.js
COPY ./server/*.js ./models/

WORKDIR /src/ui
RUN npm install
COPY ./ui/*.js ./src/models/

WORKDIR /src

# ENTRYPOINT ["/bin/bash"]
ENTRYPOINT ["/src/start.sh"]
