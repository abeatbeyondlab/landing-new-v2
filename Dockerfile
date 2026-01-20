# Use the official Bun image (Debian/glibc based for better stability with native modules)
FROM oven/bun:latest AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
# Check https://github.com/oven-sh/bun/issues/239 for how to cache bun.lockb
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ARG FNOX_AGE_KEY
ENV FNOX_AGE_KEY=$FNOX_AGE_KEY
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install fnox in builder to use it for prisma generate if needed (though bunx prisma might not need it yet)
RUN apt-get update && apt-get install -y curl ca-certificates && \
    curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz && \
    tar -xzf /tmp/fnox.tar.gz -C /tmp && \
    mv /tmp/fnox /usr/local/bin/fnox && \
    chmod +x /usr/local/bin/fnox && \
    rm /tmp/fnox.tar.gz

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN bunx prisma generate
# Use explicit path or bunx to ensure next is found
RUN fnox exec -- bun run bbuild

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG FNOX_AGE_KEY
ENV FNOX_AGE_KEY=$FNOX_AGE_KEY
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Install Tini (init system) to handle signals/zombies correctly
# Update apt and install dependencies (oven/bun:slim is Debian based)
RUN apt-get update && \
    apt-get install -y --no-install-recommends tini curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install fnox
RUN curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz && \
    tar -xzf /tmp/fnox.tar.gz -C /tmp && \
    mv /tmp/fnox /usr/local/bin/fnox && \
    chmod +x /usr/local/bin/fnox && \
    rm /tmp/fnox.tar.gz

# Create user with correct permissions
RUN groupadd -g 1001 -r nodejs && \
    useradd -u 1001 -r -g nodejs -d /home/nextjs -m -s /bin/bash nextjs

COPY --from=builder /app/public ./public

# Copy prisma schema and data directories
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

# Copy fnox.toml for secrets
COPY --from=builder --chown=nextjs:nodejs /app/fnox.toml ./fnox.toml

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
# Set permissions for data directory to allow SQLite writes
RUN chown -R nextjs:nodejs ./data

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Use Tini as the entrypoint to manage processes
ENTRYPOINT ["/usr/bin/tini", "--"]

# server.js is created by next build from the standalone output
CMD ["sh", "-c", "fnox exec -- bun server.js"]
