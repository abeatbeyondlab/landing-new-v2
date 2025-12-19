import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError } from '@/lib/api-validation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image file is required' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image type' },
        { status: 400 }
      );
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (image.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Image size must be less than 5MB' },
        { status: 400 }
      );
    }
    
    const existingPost = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/images/blog');
    await mkdir(uploadDir, { recursive: true });
    
    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(image.name);
    const filename = `post-${postId}-${timestamp}${extension}`;
    const relativePath = `/images/blog/${filename}`;
    const absolutePath = path.join(process.cwd(), 'public', relativePath);
    
    // Save file
    const buffer = Buffer.from(await image.arrayBuffer());
    await writeFile(absolutePath, buffer);
    
    // Update post with image path
    await apiPrisma.post.update({
      where: { id: postId },
      data: { image_slug: relativePath }
    });
    
    return NextResponse.json({
      success: true,
      data: { 
        image_path: relativePath,
        filename,
        size: image.size
      },
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}