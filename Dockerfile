# Docker context should be "<repo-root>"

FROM node:8-alpine
LABEL maintainer="OpusCapita"

ENV HOST 0.0.0.0
ENV PORT 3020

COPY ./ /demo

WORKDIR /demo

RUN npm i --unsafe-perm && \
  cd ./packages/examples/complete-demo && \
  npm run demo:build

WORKDIR /demo/packages/examples/complete-demo

CMD ["npm", "run", "demo:start"]

EXPOSE $PORT