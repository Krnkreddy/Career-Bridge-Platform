
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDeps for build)
RUN pnpm install --frozen-lockfile

# Copy source code and prisma schema
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build NestJS app
RUN pnpm build

# Cleanup dev dependencies? (Optional, but safe to keep for now)
# RUN pnpm prune --prod

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]
