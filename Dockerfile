# Dockerfile (single container)
FROM ubuntu:20.04

# Avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update packages and install Python 3.8, pip, and curl (needed for Node)
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node 18.x from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy the entire project into the container
COPY . /app

# -------------------------
# Setup backend
# -------------------------
# Install Python dependencies (models, configs, etc. are now available)
RUN pip3 install --upgrade pip && pip3 install -r backend/requirements.txt

# -------------------------
# Setup frontend
# -------------------------
WORKDIR /app/frontend
RUN npm install

# Expose the ports for backend and frontend
EXPOSE 5000 3000

# Start both processes (for development only)
WORKDIR /app
CMD sh -c "cd backend && python3.8 app.py & cd frontend && npm run dev"
