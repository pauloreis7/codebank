FROM node:16-alpine as deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --chown=node:node package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then rm -rf node_modules && yarn install --frozen-lockfile --ignore-scripts --immutable --immutable-cache --check-cache; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:16-alpine as builder

WORKDIR /app

ARG NEXT_PUBLIC_STORE_API_URL='http://host.docker.internal:8080'
ARG NEXT_PUBLIC_INVOICES_URL='http://host.docker.internal:3333'
ENV NEXT_PUBLIC_STORE_API_URL=$NEXT_PUBLIC_STORE_API_URL
ENV NEXT_PUBLIC_INVOICES_URL=$NEXT_PUBLIC_INVOICES_URL

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN BUILD_MODE=production yarn build

RUN yarn --production --prefer-offline --force --frozen-lockfile \
  && yarn cache clean --force

FROM node:16-alpine as runner

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=3000
ENV PORT $PORT

RUN apk add dumb-init

RUN deluser --remove-home node \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["dumb-init", "node", "server.js"]
