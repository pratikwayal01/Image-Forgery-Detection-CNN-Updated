# Dockerfile (single container serving both backend & frontend)
FROM ubuntu:20.04

# Avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update packages and install Python 3.8, pip, curl, and other dependencies
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
# Build the frontend (production build)
# -------------------------
WORKDIR /app/frontend
RUN npm install && npm run build

# -------------------------
# Prepare Flask to serve the built frontend
# -------------------------
# Create directories if they don't exist
RUN mkdir -p /app/backend/templates && mkdir -p /app/backend/static

# Copy the built index.html into the Flask templates folder
RUN cp /app/frontend/dist/index.html /app/backend/templates/index.html

# Copy all static assets into the Flask static folder
RUN cp -r /app/frontend/dist/assets /app/backend/static/

# -------------------------
# Setup backend
# -------------------------
WORKDIR /app/backend
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Make sure Flask uses the PORT environment variable (default to 5000)
ENV PORT 5000

# Expose the port that Render will use
EXPOSE $PORT

# Start the Flask server
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
