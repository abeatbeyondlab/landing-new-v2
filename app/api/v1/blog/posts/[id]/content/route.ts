import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { z } from 'zod';

const updateContentSchema = z.object({
  content: z.string().min(1, 'Content is required')
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const post = await apiPrisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        content: true,
        locale: true,
        state: true
      }
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        locale: post.locale,
        state: post.state
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const body = await request.json();
    const { content } = validateRequest(updateContentSchema, body);
    
    const existingPost = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const post = await apiPrisma.post.update({
      where: { id: postId },
      data: {
        content,
        updated_at: new Date()
      },
      select: {
        id: true,
        title: true,
        content: true,
        locale: true,
        updated_at: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        locale: post.locale,
        updated_at: post.updated_at?.toISOString()
      },
      message: 'Post content updated successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}