const fs = require('fs');

// Patch FeaturesSection.tsx grid layout and sizing
let code = fs.readFileSync('src/components/sections/FeaturesSection.tsx', 'utf-8');

// The file doesn't actually use a grid right now, it uses a custom carousel implementation with flex, basis-full, min-w-full.
// The user asked to increase spacing and gaps between components.
// For the carousel, the cards are basis-full, so they don't have gaps within the viewport, they are slides.
// But we can scale up the content sizes and padding in the component.

code = code.replace(/text-lg text-white\/74/g, 'text-2xl text-white/74');
code = code.replace(/text-4xl md:text-5xl lg:text-7xl/g, 'text-5xl md:text-6xl lg:text-8xl tracking-tight');
code = code.replace(/h-14 w-14/g, 'h-20 w-20'); // icon wrapper
code = code.replace(/text-2xl text-white\/80/g, 'text-4xl text-white/80'); // icon
code = code.replace(/font-medium text-xl/g, 'font-bold text-3xl'); // card title
code = code.replace(/text-white\/74 text-sm/g, 'text-white/74 text-base'); // card description
code = code.replace(/bg-brand-darker/g, 'bg-brand-primary'); // bg color to primary
code = code.replace(/bg-brand-dark\/92/g, 'bg-brand-primary/92'); // card background to primary
code = code.replace(/py-40 md:py-52/g, 'py-48 md:py-64'); // More generous whitespace


fs.writeFileSync('src/components/sections/FeaturesSection.tsx', code);

console.log('FeaturesSection patched');
