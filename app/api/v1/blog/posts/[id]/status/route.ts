import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { changeStatusSchema } from '@/types/api';

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
    const { state } = validateRequest(changeStatusSchema, body);
    
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
        state,
        updated_at: new Date()
      },
      select: { 
        id: true, 
        title: true, 
        state: true,
        locale: true
      }
    });
    
    const statusText = state === 1 ? 'Published' : 'Draft';
    
    return NextResponse.json({ 
      success: true, 
      data: post,
      message: `Post status changed to ${statusText}`
    });
  } catch (error) {
    return handleApiError(error);
  }
}