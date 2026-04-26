#!/bin/bash

# Find files with remaining bluish-grey hexes and replace them.
# Using Mahogany #584738, Tobacco #B59E7D, Vanilla #F1EADA, Mountain #AAA396, Sand #CEC1A8

# Auth pages login/signup
find src/app/auth -name "*.tsx" -exec sed -i -E 's/(#0f1720|#182131|#24303d|#111826)/#584738/g' {} +
find src/app/auth -name "*.tsx" -exec sed -i -E 's/(#f4f6f8|#d6dce2|#d7dde4|#c7d0da)/#F1EADA/g' {} +
find src/app/auth -name "*.tsx" -exec sed -i -E 's/(#7a8591|#55606d|#5b6672|#9aa3ad|#b8c2cc|#7b8795|#778390|#66707d)/#AAA396/g' {} +

# Features section
find src/components/sections/FeaturesSection.tsx -exec sed -i -E 's/(#111c29)/#584738/g' {} +
find src/components/sections/FeaturesSection.tsx -exec sed -i -E 's/(#6f8ea9|#8caec7|#8a95a4|#a7b2be|#68879c|#89a3b4|#8d9aa8|#6f7c8a|#6b92a1|#8db3c1|#758595|#9ba9b5)/#B59E7D/g' {} +

# Material section
find src/components/sections/MaterialSection.tsx -exec sed -i -E 's/(#111b27|#111a26|#0b121a)/#584738/g' {} +

# Specs section
find src/components/sections/SpecsSection.tsx -exec sed -i -E 's/(#3b4a5a)/#584738/g' {} +

# Hero section
find src/components/sections/HeroSection.tsx -exec sed -i -E 's/(#111820|#0f141c|#131b24|#1c2631|#1a2430|#141b24)/#584738/g' {} +
find src/components/sections/HeroSection.tsx -exec sed -i -E 's/(#d9e1e7)/#F1EADA/g' {} +
find src/components/sections/HeroSection.tsx -exec sed -i -E 's/(#3b82f6)/#B59E7D/g' {} +

# Shop section
find src/components/sections/ShopSection.tsx -exec sed -i -E 's/(#3b4a5a|#1e3a5f)/#584738/g' {} +

# Other components
find src/components/products/RecentlyViewed.tsx -exec sed -i -E 's/(#111a25)/#584738/g' {} +
find src/components/3d/CardHolderScene.tsx -exec sed -i -E 's/(#93c5fd)/#B59E7D/g' {} +
find src/components/ui/ReactiveBackground.tsx -exec sed -i -E 's/(#60a5fa)/#B59E7D/g' {} +
find src/components/ui/LoadingOverlay.tsx -exec sed -i -E 's/(#131b24)/#584738/g' {} +

# Pages
find src/app/cart/page.tsx -exec sed -i -E 's/(#111a25)/#584738/g' {} +
find src/views/products/ProductsPage.tsx -exec sed -i -E 's/(#111826)/#584738/g' {} +
