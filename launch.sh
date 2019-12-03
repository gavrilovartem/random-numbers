#!/bin/bash
cd "tornado"
python3 index.py &
sleep 5
cd ".."
cd "electron"
echo "111"
npm start