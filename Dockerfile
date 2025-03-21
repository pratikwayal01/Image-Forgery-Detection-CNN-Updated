# Start from a Node image which includes Node 18.16.0
FROM node:18.16.0

# Install Python 3.8.2 and pip
RUN apt-get update && apt-get install -y python3.8 python3-pip && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy backend and install Python dependencies
COPY backend/ ./backend/
WORKDIR /app/backend
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Copy frontend and install Node dependencies
WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install

# Expose both ports (backend:5000, frontend:3000)
EXPOSE 5000 3000

# Use a shell script to run both servers concurrently
WORKDIR /app
CMD sh -c "cd backend && python3 app.py & cd frontend && npm run dev"
