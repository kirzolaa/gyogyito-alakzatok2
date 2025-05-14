#!/bin/bash

# Set environment variables
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export ANDROID_HOME=/home/zoli/Android/Sdk
export PATH=$JAVA_HOME/bin:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

# Print environment info
echo "Using JAVA_HOME: $JAVA_HOME"
echo "Using ANDROID_HOME: $ANDROID_HOME"
echo "Java version:"
java -version
echo "Javac version:"
javac -version

# Clean the project
echo "Cleaning project..."
./gradlew clean

# Build debug APK
echo "Building debug APK..."
./gradlew assembleDebug --stacktrace

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        echo "APK created at: $APK_PATH"
        echo "You can install it on your device with:"
        echo "adb install -r $APK_PATH"
    else
        echo "APK not found at expected location: $APK_PATH"
    fi
else
    echo "Build failed. Please check the error messages above."
fi
