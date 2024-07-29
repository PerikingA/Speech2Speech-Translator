# Use the official Python image based on Debian with Python 3.12
FROM python:3.12-slim

# Install required system packages and build tools
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libsndfile1 \
    ffmpeg && \
    pip install --upgrade pip setuptools wheel

# Set the working directory inside the container
WORKDIR /app

# Install Python dependencies manually
RUN pip install --no-cache-dir \
    Flask==3.0.3 \
    numpy==1.26.4 \
    pydub==0.25.1 \
    googletrans==4.0.0rc1 \
    whisper==1.1.10 \
    gtts==2.5.2 \
    flask-cors==4.0.1 \
    soundfile==0.12.1 \
    librosa==0.10.2.post1

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["python", "app.py"]
