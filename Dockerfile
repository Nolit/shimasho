FROM ubuntu:latest
RUN apt-get update && apt-get upgrade -y
RUN apt install -y nodejs npm
WORKDIR /app