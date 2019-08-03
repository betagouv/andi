(still using default-assigned network, create docker subnet to fix this)
```
sudo docker build -t "evolutility" \
    --build-arg PG_USER=[USER] \
    --build-arg PG_PASS=[PASSWORD] \
    ./ && \
    sudo docker run -it --rm  -p=8080:3000 evolutility
```
