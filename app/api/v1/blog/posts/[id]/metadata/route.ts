import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { updateMetadataSchema, PostMetadata } from '@/types/api';

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
        slug: true,
        title: true,
        description: true,
        date: true,
        author: true,
        state: true,
        locale: true,
        image_slug: true,
        created_at: true,
        updated_at: true
      }
    });
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const postMetadata: PostMetadata = {
      ...post,
      state: post.state as 0 | 1,
      locale: post.locale as 'it' | 'en',
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at?.toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: postMetadata 
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
    const updateData = validateRequest(updateMetadataSchema, body);
    
    const existingPost = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Check slug uniqueness if provided
    if (updateData.slug && updateData.slug !== existingPost.slug) {
      const existingSlug = await apiPrisma.post.findFirst({
        where: { 
          slug: updateData.slug,
          id: { not: postId }
        }
      });
      
      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }
    
    const post = await apiPrisma.post.update({
      where: { id: postId },
      data: {
        ...updateData,
        updated_at: new Date()
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        date: true,
        author: true,
        state: true,
        locale: true,
        image_slug: true,
        created_at: true,
        updated_at: true
      }
    });
    
    const postMetadata: PostMetadata = {
      ...post,
      state: post.state as 0 | 1,
      locale: post.locale as 'it' | 'en',
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at?.toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: postMetadata,
      message: 'Post metadata updated successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}