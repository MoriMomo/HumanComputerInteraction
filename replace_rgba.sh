#!/bin/bash
# Replaces rgba(142, 154, 166, ...) (old bluish grey) with rgba(181, 158, 125, ...) (Tobacco / new primary)
find src/ -type f -exec sed -i 's/rgba(142,154,166/rgba(181,158,125/gi' {} +
# Replaces rgba(188, 201, 214, ...) and rgba(133, 146, 160, ...) and rgba(106, 120, 134, ...) in hero with Sand/Vanilla rgb values
# Vanilla: #F1EADA -> 241, 234, 218
# Sand: #CEC1A8 -> 206, 193, 168
# Mountain: #AAA396 -> 170, 163, 150
find src/ -type f -exec sed -i 's/rgba(188,201,214/rgba(241,234,218/gi' {} +
find src/ -type f -exec sed -i 's/rgba(133,146,160/rgba(206,193,168/gi' {} +
find src/ -type f -exec sed -i 's/rgba(106,120,134/rgba(170,163,150/gi' {} +
