#!/bin/bash
docker build -t "docker_python" \
    ./ && \
docker run -it --rm \
	--add-host=database:172.17.0.1 \
	-v /home/pieterjan/docs/andi/misc/python/raw_data:/data \
	docker_python

