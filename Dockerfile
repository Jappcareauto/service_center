# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# System deps
RUN apk add --no-cache libc6-compat

# Copy dependency files first (better caching)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# ✅ Install dependencies AS ROOT (important)
RUN \
  if [ -f yarn.lock ]; then \
    yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install --frozen-lockfile; \
  else \
    npm install --legacy-peer-deps; \
  fi

# Create non-root user AFTER install
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup \
  && chown -R viteuser:vitegroup /app

USER viteuser

# Copy the rest of the app
COPY --chown=viteuser:vitegroup . .

EXPOSE 5173

# ❌ DO NOT define VITE_* secrets here
# Use .env or docker-compose instead

CMD ["npm", "run", "dev", "--", "--host"]
