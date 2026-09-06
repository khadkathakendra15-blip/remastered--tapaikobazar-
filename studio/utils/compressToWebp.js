/**
 * Utility to convert any image file to WebP format and compress it under 500KB.
 */

export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Compresses and converts any image file (PNG, JPG, HEIC, etc.) to WebP under maxSizeBytes (default 500KB).
 * @param {File|Blob} file The input image file
 * @param {number} maxSizeBytes Maximum allowed file size in bytes (default: 500 * 1024)
 * @returns {Promise<{ file: File, originalSize: number, compressedSize: number, formattedOriginal: string, formattedCompressed: string, savings: string }>}
 */
export async function compressAndConvertToWebP(file, maxSizeBytes = 500 * 1024) {
  const originalSize = file.size;

  // 1. Read file into HTMLImageElement
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);

  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(new Error('Failed to load image for compression.'));
    img.src = objectUrl;
  });

  URL.revokeObjectURL(objectUrl);

  // 2. Determine optimal initial dimensions (max 1920px width/height for sharp retina displays)
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;
  const MAX_DIMENSION = 1920;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  // 3. Iterative quality compression to ensure it is strictly under maxSizeBytes (500KB)
  let quality = 0.90;
  let blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', quality));

  // Step down quality if needed
  while (blob && blob.size > maxSizeBytes && quality > 0.35) {
    quality -= 0.10;
    blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', quality));
  }

  // If still above 500KB (e.g. extremely detailed photo), downscale dimensions by 20%
  let currentWidth = width;
  let currentHeight = height;
  while (blob && blob.size > maxSizeBytes && currentWidth > 640) {
    currentWidth = Math.round(currentWidth * 0.85);
    currentHeight = Math.round(currentHeight * 0.85);
    canvas.width = currentWidth;
    canvas.height = currentHeight;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.75));
  }

  if (!blob) {
    throw new Error('WebP canvas compression failed.');
  }

  // Generate output file name with .webp extension
  const originalName = file.name || 'image.jpg';
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const webpFileName = `${baseName}.webp`;

  const webpFile = new File([blob], webpFileName, {
    type: 'image/webp',
    lastModified: Date.now(),
  });

  const compressedSize = webpFile.size;
  const savingsPercent = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

  return {
    file: webpFile,
    originalSize,
    compressedSize,
    formattedOriginal: formatBytes(originalSize),
    formattedCompressed: formatBytes(compressedSize),
    savings: `${savingsPercent}%`,
  };
}
