import { defineField, defineType } from 'sanity';
import WebPImageInput from '../components/WebPImageInput';
import WebPGalleryInput from '../components/WebPGalleryInput';

export default defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vehicle Name',
      type: 'string',
      description: 'e.g. KYC 11 seater, Xpeng G6, Honda Shine 125 BS6',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Vehicle ID / Slug',
      type: 'slug',
      description: 'Unique URL identifier (e.g. kyc11, g6, honda-shine-125)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Vehicle Category',
      type: 'string',
      description: 'Category of vehicle',
      options: {
        list: [
          { title: 'Electric Van', value: 'van' },
          { title: 'Electric Car', value: 'car' },
          { title: 'Electric Scooter', value: 'scooter' },
          { title: 'Petrol Bike / Two Wheeler', value: 'bike' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Manufacturer',
      type: 'string',
      description: 'e.g. KYC, Honda, TVS, Yamaha, Bajaj, Danfe, Xpeng, GAC Aion, Ecooter, Luyuan, DFAC, Kinglong, Sarathi, Garow',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (in NPR)',
      type: 'number',
      description: 'Numerical price in Nepalese Rupees (e.g. 4199000). Leave empty if priced at counter.',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Custom Price Label (Optional)',
      type: 'string',
      description: 'Optional display label if price varies by trim, e.g. "NPR 46,50,000 – 63,50,000"',
    }),
    defineField({
      name: 'down',
      title: 'Downpayment (in NPR)',
      type: 'number',
      description: 'Minimum downpayment figure in Nepalese Rupees (e.g. 500000). Leave 0 or empty for default calculation.',
    }),
    defineField({
      name: 'status',
      title: 'Status Badge',
      type: 'string',
      description: 'Optional status badge shown on cards (e.g. "New arrival", "Pre-booking open", "Coming soon")',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Card Thumbnail Photo (Optional)',
      type: 'image',
      description: 'Optional: Dedicated photo framed for vehicle cards & listings. Auto-converts to WebP & compresses < 500KB. (If empty, Main Photo will be used).',
      components: {
        input: WebPImageInput,
      },
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Main Photo (Store & Showcase)',
      type: 'image',
      description: 'Upload main photograph for vehicle detail page. Auto-converts any image to WebP and compresses under 500KB.',
      components: {
        input: WebPImageInput,
      },
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External Image URL (Fallback)',
      type: 'url',
      description: 'If not uploading a file directly to Sanity, paste an external image URL here.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      description: 'Upload showroom or detail photos. Supports multi-photo batch upload with automatic WebP conversion and sub-500KB compression.',
      components: {
        input: WebPGalleryInput,
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL (Review / Walkaround)',
      type: 'url',
      description: 'Paste any YouTube video or Shorts link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...). Displays clickable alongside photos on the vehicle store page.',
    }),
    defineField({
      name: 'blurb',
      title: 'Summary / Blurb',
      type: 'text',
      rows: 3,
      description: 'Brief overview displayed on vehicle card and detail page.',
    }),
    defineField({
      name: 'seatsMin',
      title: 'Minimum Seats (Vans)',
      type: 'number',
      description: 'Minimum seating capacity (e.g. 11, 14, 16)',
      hidden: ({ parent }) => parent?.type !== 'van',
    }),
    defineField({
      name: 'seatsMax',
      title: 'Maximum Seats (Vans)',
      type: 'number',
      description: 'Maximum seating capacity (e.g. 11, 16, 19)',
      hidden: ({ parent }) => parent?.type !== 'van',
    }),
    defineField({
      name: 'ac',
      title: 'Air Conditioning (AC)',
      type: 'boolean',
      description: 'Toggle on if equipped with air conditioning',
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== 'van',
    }),
    defineField({
      name: 'specs',
      title: 'Specification Table',
      type: 'array',
      description: 'Key-value specification items (e.g. Range, Battery, Motor, Mileage, Brakes)',
      of: [
        {
          type: 'object',
          name: 'specItem',
          title: 'Spec Item',
          fields: [
            { name: 'label', type: 'string', title: 'Feature / Spec Name' },
            { name: 'value', type: 'string', title: 'Value / Details' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      description: 'Bullet points highlighting key selling points and financing benefits.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order Priority',
      type: 'number',
      description: 'Lower number appears first (e.g. 1, 2, 3...)',
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      type: 'type',
      media: 'image',
      price: 'price',
      priceLabel: 'priceLabel',
      down: 'down',
    },
    prepare({ title, subtitle, type, media, price, priceLabel, down }) {
      const typeMap = {
        van: '🚐 Van',
        car: '🚗 Car',
        scooter: '🛵 Scooter',
        bike: '🏍️ Bike',
      };
      const formattedPrice = priceLabel || (price ? `NPR ${price.toLocaleString('en-IN')}` : 'Contact for price');
      const formattedDown = down ? ` (Down: NPR ${down.toLocaleString('en-IN')})` : '';
      return {
        title,
        subtitle: `${typeMap[type] || type || ''} · ${subtitle || ''} · ${formattedPrice}${formattedDown}`,
        media,
      };
    },
  },
});
