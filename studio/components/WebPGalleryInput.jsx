import React, { useState, useRef } from 'react';
import { set, useClient } from 'sanity';
import { Card, Stack, Flex, Text, Button, Spinner, Badge, Box } from '@sanity/ui';
import { ImagesIcon, CheckmarkCircleIcon, WarningOutlineIcon } from '@sanity/icons';
import { compressAndConvertToWebP } from '../utils/compressToWebp';

export default function WebPGalleryInput(props) {
  const { onChange, value } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const [status, setStatus] = useState(null); // 'processing' | 'done' | 'error'
  const [progress, setProgress] = useState({ current: 0, total: 0, detail: '' });
  const fileInputRef = useRef(null);

  const handleMultipleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setStatus('processing');
    const total = files.length;
    const uploadedItems = [];

    try {
      for (let i = 0; i < total; i++) {
        const file = files[i];
        setProgress({
          current: i + 1,
          total,
          detail: `Compressing & converting ${file.name} to WebP...`,
        });

        // Convert & compress under 500KB
        const result = await compressAndConvertToWebP(file, 500 * 1024);

        setProgress({
          current: i + 1,
          total,
          detail: `Uploading ${result.formattedCompressed} WebP to Sanity (${i + 1}/${total})...`,
        });

        const assetDoc = await client.assets.upload('image', result.file, {
          filename: result.file.name,
          contentType: 'image/webp',
        });

        uploadedItems.push({
          _type: 'image',
          _key: Math.random().toString(36).substring(2, 10),
          asset: {
            _type: 'reference',
            _ref: assetDoc._id,
          },
        });
      }

      // Append new items to existing gallery
      const existing = Array.isArray(value) ? value : [];
      onChange(set([...existing, ...uploadedItems]));

      setStatus('done');
      setProgress({
        current: total,
        total,
        detail: `Successfully optimized and added ${total} WebP photo${total > 1 ? 's' : ''}!`,
      });

      setTimeout(() => setStatus(null), 7000);
    } catch (err) {
      console.error('Gallery batch upload failed:', err);
      setStatus('error');
      setProgress((prev) => ({ ...prev, detail: err.message || 'Gallery upload failed.' }));
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
          background: 'rgba(59, 130, 246, 0.05)',
          borderColor: 'rgba(59, 130, 246, 0.35)',
        }}
      >
        <Stack space={2}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
            <Flex align="center" gap={2}>
              <Badge tone="primary" fontSize={1} padding={2}>
                ⚡ Bulk WebP &lt; 500KB
              </Badge>
              <Text size={1} weight="semibold">
                Multi-photo Batch: Auto-converts all to WebP &amp; compresses &lt; 500KB
              </Text>
            </Flex>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMultipleFiles}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            <Button
              text={
                status === 'processing'
                  ? `Processing ${progress.current}/${progress.total}...`
                  : 'Bulk Upload Photos (Auto-WebP)'
              }
              icon={ImagesIcon}
              tone="primary"
              mode="ghost"
              fontSize={1}
              disabled={status === 'processing'}
              onClick={() => fileInputRef.current?.click()}
            />
          </Flex>

          {status && (
            <Card padding={2} radius={2} tone={status === 'error' ? 'critical' : 'positive'}>
              <Flex align="center" gap={2}>
                {status === 'processing' && <Spinner size={1} />}
                {status === 'done' && <CheckmarkCircleIcon />}
                {status === 'error' && <WarningOutlineIcon />}
                <Text size={1}>{progress.detail}</Text>
              </Flex>
            </Card>
          )}
        </Stack>
      </Card>

      {/* Render default Sanity array/gallery input (reordering, delete, manual add) */}
      {props.renderDefault(props)}
    </Stack>
  );
}
