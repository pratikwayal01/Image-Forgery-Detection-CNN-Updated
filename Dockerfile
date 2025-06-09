# ==== Base: Ubuntu ====
FROM ubuntu:22.04

# Set non-interactive for apt
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# --------------------------
# Step 1: Build frontend
# --------------------------
COPY frontend/ ./frontend/
WORKDIR /app/frontend

RUN npm install && npm run build

# --------------------------
# Step 2: Set up backend
# --------------------------
WORKDIR /app

# Copy backend files
COPY backend/ ./backend/
COPY backend/requirements-api.txt .

# Install Python dependencies
RUN python3 -m pip install --no-cache-dir -r requirements-api.txt

# Copy frontend build output to backend/static
RUN mkdir -p backend/static && cp -r frontend/dist/* backend/static/

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/backend:$PYTHONPATH \
    DEBUG=0

# Expose port for Render or similar platform
EXPOSE 8000

# Command to run API
CMD ["python3", "backend/run_api.py"]
