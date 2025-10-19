# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@10.18.1 && pnpm install --frozen-lockfile

COPY . .


ARG NEXT_PUBLIC_BASE_ROUTE
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_PORT



ENV NEXT_PUBLIC_BASE_ROUTE=${NEXT_PUBLIC_BASE_ROUTE}
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_BASE_PORT=${NEXT_PUBLIC_BASE_PORT}
ENV NODE_ENV=production


RUN pnpm run build

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
