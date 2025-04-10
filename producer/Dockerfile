# ---------- Build Stage ----------
FROM node:23-alpine3.20 AS builder

WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./
RUN npm install

# Copy source code and build script
COPY . .

# Build with esbuild
RUN npm run build


# ---------- Production Stage ----------
FROM node:23-alpine3.20 AS runner

WORKDIR /app

# Install only prod dependencies (optional if not needed at runtime)
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files and any required runtime files
COPY --from=builder /app/dist ./dist

EXPOSE 3014

CMD ["node", "dist/index.js"]
