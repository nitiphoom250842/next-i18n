# Use the official Node.js 18.18-alpine image as a base
FROM node:18.18-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn install


FROM node:18.18-alpine as builder
WORKDIR /app
COPY ./ .
COPY ./.env.production .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn run build
FROM node:18.18-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["yarn", "start", "-p" , "3000"]