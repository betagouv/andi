FROM python:3.7-alpine

RUN pip install pipenv

# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh bash

# RUN apk add --no-cache 'python3>=3.7' 'python3-dev>=3.7' bash gcc musl-dev make git alpine-sdk postgresql-dev && \
RUN apk add --no-cache 'python3-dev>=3.7' bash postgresql-dev alpine-sdk && \
    pip install --upgrade pip setuptools 'pipenv'

COPY app/ /app

WORKDIR /app

ARG ARG_MG_BOX="nope"
ARG ARG_MG_KEY="nope"
ENV MG_BOX=$ARG_MG_BOX
ENV MG_KEY=$ARG_MG_KEY
ARG PG_USER="user"
ARG PG_PASS="secret"
ARG PG_HOST="database"
ARG PG_PORT="54320"
ARG PG_DB="andi_entreprises"

RUN sed -i s/DBNAME/$PG_DB/ src/config.default.yaml && \
    sed -i s/DBUSER/$PG_USER/ src/config.default.yaml && \
    sed -i s/DBPASS/$PG_PASS/ src/config.default.yaml && \
    sed -i s/DBHOST/$PG_HOST/ src/config.default.yaml && \
    sed -i s/DBPORT/$PG_PORT/ src/config.default.yaml

RUN pipenv install --system --deploy
ENV PYTHONPATH "${PYTONPATH}:/app/src"
ENTRYPOINT ["waitress-serve", "--call", "src:create_app"]
