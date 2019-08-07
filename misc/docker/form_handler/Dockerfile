FROM python:3.7-alpine

RUN pip install pipenv

# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh bash

# RUN apk add --no-cache 'python3>=3.7' 'python3-dev>=3.7' bash gcc musl-dev make git alpine-sdk postgresql-dev && \
RUN apk add --no-cache 'python3-dev>=3.7' bash postgresql-dev alpine-sdk && \
    pip install --upgrade pip setuptools 'pipenv'

COPY app/ /app

WORKDIR /app


RUN pipenv install --system --deploy
ENV PYTHONPATH "${PYTONPATH}:/app/src"
# ENTRYPOINT ["bash"]
ENTRYPOINT ["waitress-serve", "--call", "src:run"]
