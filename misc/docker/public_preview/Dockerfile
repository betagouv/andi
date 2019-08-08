FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN echo "Cloning evolutility source.." && \
    git clone https://github.com/betagouv/andi.git ./src

WORKDIR /src
RUN npm install
ENTRYPOINT ["/bin/bash"]
# ENTRYPOINT ["npm", "start"]
