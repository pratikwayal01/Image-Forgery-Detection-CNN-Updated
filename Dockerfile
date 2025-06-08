# Start from an official Node.js image to build the frontend
FROM node:18 AS frontend-builder

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/ ./

# Build the frontend (assuming Vite or similar)
RUN npm install && npm run build

# Now use a lightweight Python image for the backend
FROM python:3.8-slim

WORKDIR /app

# Install OS dependencies for OpenCV or others
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install them
COPY backend/requirements-api.txt ./
RUN pip install --no-cache-dir -r requirements-api.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend build output into backend's static or templates directory
COPY --from=frontend-builder /app/frontend/dist/ ./backend/static/

# Set env variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/backend:$PYTHONPATH

# Expose API port
EXPOSE 3000 

# Start the backend server
CMD ["python", "backend/run_api.py"]
