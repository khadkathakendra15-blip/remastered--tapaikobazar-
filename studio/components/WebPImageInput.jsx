import React, { useState, useRef } from 'react';
import { set, useClient } from 'sanity';
import { Card, Stack, Flex, Text, Button, Spinner, Badge, Box } from '@sanity/ui';
import { UploadIcon, CheckmarkCircleIcon, WarningOutlineIcon } from '@sanity/icons';
import { compressAndConvertToWebP } from '../utils/compressToWebp';

export default function WebPImageInput(props) {
  const { onChange } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const [status, setStatus] = useState(null); // 'compressing' | 'uploading' | 'done' | 'error'
  const [info, setInfo] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatus('compressing');
      setInfo({ message: `Compressing & converting ${file.name} to WebP...` });

      // Auto compress & convert to WebP strictly under 500KB
      const result = await compressAndConvertToWebP(file, 500 * 1024);

      setStatus('uploading');
      setInfo({
        message: `Uploading ${result.formattedCompressed} WebP (saved ${result.savings})...`,
        original: result.formattedOriginal,
        compressed: result.formattedCompressed,
        savings: result.savings,
      });

      // Upload directly to Sanity Cloud Assets
      const assetDoc = await client.assets.upload('image', result.file, {
        filename: result.file.name,
        contentType: 'image/webp',
      });

      // Patch the document field with the new asset reference
      onChange(
        set({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetDoc._id,
          },
        })
      );

      setStatus('done');
      setTimeout(() => setStatus(null), 7000);
    } catch (err) {
      console.error('Image compression/upload failed:', err);
      setStatus('error');
      setInfo({ message: err.message || 'Compression or upload failed' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Stack space={3}>
      <Card
        padding={3}
        radius={2}
        tone="primary"
        border
        style={{
          background: 'rgba(34, 197, 94, 0.05)',
          borderColor: 'rgba(34, 197, 94, 0.35)',
        }}
      >
        <Stack space={2}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
            <Flex align="center" gap={2}>
              <Badge tone="positive" fontSize={1} padding={2}>
                ⚡ Auto WebP &lt; 500KB
              </Badge>
              <Text size={1} weight="semibold">
                Auto-converts any image to WebP &amp; compresses under 500KB
              </Text>
            </Flex>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFile}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <Button
              text={status === 'compressing' || status === 'uploading' ? 'Optimizing...' : 'Upload & Auto-Compress'}
              icon={UploadIcon}
              tone="positive"
              mode="ghost"
              fontSize={1}
              disabled={status === 'compressing' || status === 'uploading'}
              onClick={() => fileInputRef.current?.click()}
            />
          </Flex>

          {status && (
            <Card padding={2} radius={2} tone={status === 'error' ? 'critical' : 'positive'}>
              <Flex align="center" gap={2}>
                {(status === 'compressing' || status === 'uploading') && <Spinner size={1} />}
                {status === 'done' && <CheckmarkCircleIcon />}
                {status === 'error' && <WarningOutlineIcon />}
                <Text size={1}>
                  {status === 'done'
                    ? `✓ Converted to WebP: ${info?.original} → ${info?.compressed} (${info?.savings} saved!)`
                    : info?.message}
                </Text>
              </Flex>
            </Card>
          )}
        </Stack>
      </Card>

      {/* Render default Sanity Image input (keeps hotspot, crop, preview, remove) */}
      {props.renderDefault(props)}
    </Stack>
  );
}
