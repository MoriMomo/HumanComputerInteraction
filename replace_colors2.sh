#!/bin/bash

# Find remaining blueish-grey hex colors inside code base and replace with brown variants:
# We have #59636E (grey/blueish) -> #B59E7D
# #1C1C1E (dark grey/blue) -> #584738
# #8E9AA6 (grey/blue) -> #AAA396
# #c7d0d9 (light grey/blue) -> #F1EADA
# #BCA782 (goldish, might keep it or map to Sand, but user wanted the soft brown palette)
# Map #BCA782 -> #CEC1A8
# Map #3C2F24 -> #413429
# Map #8A683A -> #B59E7D
# Map #B48A63 -> #B59E7D (Tobacco)
# Map #f7f8f8 -> #F1EADA

find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#59636E|#59636e)/#B59E7D/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#1C1C1E|#1c1c1e)/#584738/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#8E9AA6|#8e9aa6)/#AAA396/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#c7d0d9)/#F1EADA/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#BCA782|#bca782)/#CEC1A8/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#3C2F24|#3c2f24)/#413429/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#8A683A|#8a683a)/#B59E7D/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#B48A63|#b48a63)/#B59E7D/g'
find src/ -type f -name "*.ts*" -o -name "*.css" | xargs sed -i -E 's/(#f7f8f8)/#F1EADA/g'
