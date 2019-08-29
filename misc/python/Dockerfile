FROM python:alpine3.7

RUN pip install pipenv
RUN apk add --no-cache bash postgresql-dev alpine-sdk && \
    pip install --upgrade pip setuptools 'pipenv'

COPY . /app
WORKDIR /app
RUN pipenv install --system --deploy

ENTRYPOINT ["bash"]
# ENTRYPOINT ["npm", "start"]
