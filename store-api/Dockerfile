FROM node:16-alpine as node_builder

ENV NODE_ENV build

RUN deluser --remove-home node \
  && addgroup -S node -g 1000 \
  && adduser -S -G node -u 999 node

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY --chown=node:node package.json yarn.lock ./
RUN rm -rf node_modules \
  && yarn install --frozen-lockfile --ignore-scripts --immutable --immutable-cache --check-cache

ENV PATH /opt/node_app/node_modules/.bin:$PATH

HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /opt/node_app/app

COPY --chown=node:node . .

RUN yarn prisma:generate
RUN yarn prisma:seedCompile
RUN BUILD_MODE=production yarn build

RUN yarn --production --prefer-offline --force --frozen-lockfile \
  && yarn cache clean --force

FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV PATH /opt/node_app/node_modules/.bin:$PATH
ARG PORT=3333
ENV PORT $PORT

RUN apk add dumb-init

RUN deluser --remove-home node \
  && addgroup -S node -g 1000 \
  && adduser -S -G node -u 999 node

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app/app

USER node

COPY --from=node_builder /opt/node_app/app/package.json ./package.json
COPY --from=node_builder /opt/node_app/app/node_modules ./node_modules
COPY --from=node_builder /opt/node_app/app/dist ./
COPY --from=node_builder /opt/node_app/app/prisma ./

EXPOSE $PORT

CMD ["dumb-init", "node", "main.js"]
