#!/bin/bash
echo "Starting Expo Android..."
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I | awk '{print $1}')
npx expo start --android --tunnel --clear
