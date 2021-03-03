FROM node:8-alpine
WORKDIR /home/app
# NPM install packages
COPY . .
RUN npm install --production --silent
# NPM is done, now copy in the the whole project to the workdir
EXPOSE 3000
ENTRYPOINT [ "npm" , "start" ]