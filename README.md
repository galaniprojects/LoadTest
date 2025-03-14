# LoadTest

This repository contains scripts and configurations for performing load testing using Playwright and Artillery. Make sure you have permission if you perform load tests on an application.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.

## Building the Docker Image

To build the Docker image:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/galaniprojects/LoadTest.git
   cd LoadTest

2. **Build docker image**:
    ```bash
    docker build -t loadtest .

3. **Build docker image**:
    ```bash
    docker run -it loadtest
