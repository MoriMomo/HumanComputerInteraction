#!/bin/bash
find src/ -type f -exec perl -pi -e 's/#EEF2F4/#F1EADA/gi' {} +
find src/ -type f -exec perl -pi -e 's/#F8F8F9/#F1EADA/gi' {} +
find src/ -type f -exec perl -pi -e 's/#DBDBDE/#CEC1A8/gi' {} +
find src/ -type f -exec perl -pi -e 's/#e8edf0/#F1EADA/gi' {} +
find src/ -type f -exec perl -pi -e 's/#eef2f3/#F1EADA/gi' {} +
