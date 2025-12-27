
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm
WORKDIR /app

# Copy root workspace configs
COPY pnpm-lock.yaml package.json turbo.json ./

# Copy packages
COPY packages/db ./packages/db
COPY services/api ./services/api
# If there were shared config packages, copy them here too

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
WORKDIR /app/packages/db
RUN pnpm prisma generate

# Build API
WORKDIR /app/services/api
RUN pnpm build

# --- Production Stage ---
FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

# Copy necessary files from base
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages ./packages
COPY --from=base /app/services/api/dist ./services/api/dist
COPY --from=base /app/services/api/package.json ./services/api/package.json
# We likely need root node_modules for workspace symlinks or flattened deps
# Ideally we prune for prod but for MVP copying node_modules is safer to ensure all deps exist.

# Set environment
ENV NODE_ENV=production
WORKDIR /app/services/api

# Expose port
EXPOSE 3001

# Start
CMD ["node", "dist/main"]
