#!/bin/bash
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#F1EADA\]/brand-cream/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#CEC1A8\]/brand-sand/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#AAA396\]/brand-mountain/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#B59E7D\]/brand-primary/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#584738\]/brand-dark/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/\[#413429\]/brand-darker/g'

find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#F1EADA"/"var(--color-brand-cream)"/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#CEC1A8"/"var(--color-brand-sand)"/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#AAA396"/"var(--color-brand-mountain)"/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#B59E7D"/"var(--color-brand-primary)"/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#584738"/"var(--color-brand-dark)"/g'
find src/ -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i -E 's/"#413429"/"var(--color-brand-darker)"/g'
