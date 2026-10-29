import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { readFile } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import { convertToWebpSchema } from '@/types/api';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);

    const { id } = await params;
    
    const postId = parseInt(id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const body = await request.json();
    const { quality = 80 } = validateRequest(convertToWebpSchema, body);
    
    const post = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!post || !post.image_slug) {
      return NextResponse.json(
        { success: false, error: 'Post or image not found' },
        { status: 404 }
      );
    }
    
    const imagePath = path.join(process.cwd(), 'public', post.image_slug);
    const webpPath = imagePath.replace(/\.[^/.]+$/, '.webp');
    
    // Get original file size
    const originalBuffer = await readFile(imagePath);
    const originalSize = originalBuffer.length;
    
    // Convert to WebP
    await sharp(imagePath)
      .webp({ quality })
      .toFile(webpPath);
    
    // Get converted file size
    const convertedBuffer = await readFile(webpPath);
    const convertedSize = convertedBuffer.length;
    
    // Update database with new WebP path
    const newImageSlug = post.image_slug.replace(/\.[^/.]+$/, '.webp');
    await apiPrisma.post.update({
      where: { id: postId },
      data: { 
        image_slug: newImageSlug,
        updated_at: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        new_image_path: newImageSlug,
        original_size: originalSize,
        converted_size: convertedSize,
        quality
      },
      message: 'Image converted to WebP successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}
