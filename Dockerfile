FROM ubuntu:focal
# What is ubuntu:focal Command?
# The ubuntu:focal command is used to pull the ubuntu image from the docker hub. The ubuntu image will then be used to create the container. The ubuntu image is a Linux image that is used to create the container. The ubuntu image is a lightweight


RUN apt-get update

RUN apt-get install -y curl
# What is curl?
# curl is a command-line tool for transferring data and supports about 22 protocols including HTTP, HTTPS, FTP, FTPS, and many more. It is a very useful tool for transferring data between servers and clients. It is also used to download files from the internet. The curl command is used to transfer data between servers and clients. It is a very useful tool for transferring data between servers and clients. It is also used to download files from the internet.

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN apt-get install -y git

WORKDIR /Vercel-Clone
COPY main.sh main.sh

ENTRYPOINT [ "/Vercel-Clone/main.sh" ]