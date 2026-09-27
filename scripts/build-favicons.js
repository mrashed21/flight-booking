const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const sharp = require(path.join(rootDir, 'node_modules', 'sharp'));

const SOURCE_IMAGE = 'C:/Users/mrashed21/.gemini/antigravity-ide/brain/9f701272-94f4-4fd1-b0a0-8d5926f7ab9d/borkot_travels_icon_clean_1790511485020.jpg';

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(i => i.buffer)]);
}

async function generate() {
  console.log('Generating Borkot Travels favicon assets...');

  const size = 512;
  const radius = 105;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="white"/></svg>`
  );

  // 1. Generate master 512x512 transparent squircle PNG
  const master512Buf = await sharp(SOURCE_IMAGE)
    .extract({ left: 126, top: 126, width: 772, height: 772 })
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Generate other sizes
  const icon192Buf = await sharp(master512Buf).resize(192, 192).png().toBuffer();
  const appleIconBuf = await sharp(master512Buf).resize(180, 180).png().toBuffer();
  const icon48Buf = await sharp(master512Buf).resize(48, 48).png().toBuffer();
  const icon32Buf = await sharp(master512Buf).resize(32, 32).png().toBuffer();
  const icon16Buf = await sharp(master512Buf).resize(16, 16).png().toBuffer();

  // 3. Build multi-resolution ICO file
  const icoBuf = createIco([
    { width: 16, height: 16, buffer: icon16Buf },
    { width: 32, height: 32, buffer: icon32Buf },
    { width: 48, height: 48, buffer: icon48Buf },
  ]);

  // 4. Create SVG wrapper
  const base64Data = master512Buf.toString('base64');
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="512" height="512" href="data:image/png;base64,${base64Data}"/>
</svg>
`;

  // Write to src/app/
  const appDir = path.join(rootDir, 'src', 'app');
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(appDir, 'icon.png'), master512Buf);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIconBuf);

  // Write to public/
  const publicDir = path.join(rootDir, 'public');
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), master512Buf);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192Buf);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIconBuf);

  // Write web manifest
  const manifest = {
    name: "Borkot Travels",
    short_name: "Borkot Travels",
    description: "Reliable Flight Booking, Tour Packages & Visa Processing in Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c74c0",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(appDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log('All favicon and icon assets generated successfully!');
}

generate().catch(console.error);
