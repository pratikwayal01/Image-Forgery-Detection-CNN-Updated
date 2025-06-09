# ====== Stage 1: Build frontend using Node.js ======
FROM node:18 AS frontend-builder

# Set working directory
WORKDIR /app/frontend

# Copy frontend source code
COPY frontend/ ./ 

# Install frontend dependencies and build
RUN npm install && npm run build


# ====== Stage 2: Backend using Python ======
FROM python:3.8-slim

# Set working directory for backend
WORKDIR /app

# Install system dependencies (for OpenCV, etc.)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/backend:$PYTHONPATH \
    DEBUG=0

# Copy and install backend Python dependencies
COPY backend/requirements-api.txt ./
RUN pip install --no-cache-dir -r requirements-api.txt

# Copy backend source code
COPY backend/ ./backend/

# Copy built frontend into backend's static folder
COPY --from=frontend-builder /app/frontend/dist/ ./backend/static/

# Expose API port
EXPOSE 8000

# Default command to run the backend API
CMD ["python", "backend/run_api.py"]
