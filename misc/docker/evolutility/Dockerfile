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

RUN npm install pm2@latest -g

RUN echo "Cloning evolutility source.." && \
    # git clone https://github.com/evoluteur/evolutility-server-node.git ./ && \
    git clone --single-branch --branch faster_count https://github.com/PieterjanMontens/evolutility-server-node.git ./server && \
    # git clone https://github.com/evoluteur/evolutility-ui-react ./ui
    git clone --single-branch --branch custom_interface https://github.com/PieterjanMontens/evolutility-ui-react.git ./ui

WORKDIR /src/server
# RUN git checkout patch_udate_cdate && \
#     npm install

RUN npm install

WORKDIR /src/ui
RUN npm install

WORKDIR /src
COPY ./start.sh /src/start.sh
RUN chmod +x /src/start.sh
COPY ./server/config.js /src/server/config.js
COPY ./server/*.js /src/server/models/
COPY ./ui/*.js /src/ui/src/models/

WORKDIR /src
# CMD ["/bin/bash"]
ENTRYPOINT ["/src/start.sh"]
