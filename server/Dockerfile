FROM denoland/deno:latest

# Create working directory
WORKDIR /server

# Copy source
COPY . .

# Run the app
CMD ["deno", "run", "--allow-net", "main.ts"]
