# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
# This created a directory in the container named app
WORKDIR /app

# Copy the current directory contents into the container at /app
#This copied everything in the directory where this file is located into
#the container's newly created app directory.
#so a copy of this file now lives in the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME BigWorld

# Run app.py when the container launches
CMD ["python", "app.py"]