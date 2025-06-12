#!/bin/bash
cd /home/kavia/workspace/code-generation/travelsmart-ai-72-e2071575/travelsmart_ai
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

