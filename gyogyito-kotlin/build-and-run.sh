#!/bin/bash

# Make gradlew executable
chmod +x gradlew

# Build and install the app
./gradlew installDebug

# If the build was successful, launch the app
if [ $? -eq 0 ]; then
  echo "Build successful! Launching app..."
  adb shell am start -n com.example.gyogyitoalakzatok/.MainActivity
else
  echo "Build failed. Please check the error messages above."
fi
