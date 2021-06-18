FROM node:12.20.2-alpine3.12 as BASE
WORKDIR /app
COPY package*.json /app/
COPY . .

FROM BASE as DEV
WORKDIR /app
RUN npm install
# COPY --from=BASE /app ./app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
# RUN npm install --global cross-env
# Bundle app source
FROM BASE as PROD
WORKDIR /app
RUN npm install --production
# COPY --from=base /app /app
EXPOSE 3000
CMD [ "npm", "start" ]