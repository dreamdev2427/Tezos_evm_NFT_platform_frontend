FROM node:16


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock /usr/src/app/
COPY . /usr/src/app

RUN yarn install

# TODO: Compil contracts then send it to docker registry

# RUN npx hardhat compile
# RUN npx hardhat run --network avatest scripts/deploy.ts

# RUN yarn run build

EXPOSE 3000

# Running the application
CMD "yarn" "run" "dev"
