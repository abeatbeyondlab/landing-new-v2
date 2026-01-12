import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { updateTagsSchema, Tag } from '@/types/api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);

    const { id } = await params;
    
    const postId = parseInt(id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const postExists = await apiPrisma.post.findUnique({
      where: { id: postId },
      select: { id: true }
    });
    
    if (!postExists) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const postTags = await apiPrisma.post_tag.findMany({
      where: { post_id: postId },
      include: { tag: true }
    });
    
    const tags: Tag[] = postTags.map(pt => ({
      id: pt.tag.id,
      name: pt.tag.name,
      slug: pt.tag.slug,
      created_at: pt.tag.created_at.toISOString(),
      updated_at: pt.tag.updated_at?.toISOString()
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: tags 
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const { tag_ids } = validateRequest(updateTagsSchema, body);
    
    const postExists = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!postExists) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Validate all tag IDs exist
    const existingTags = await apiPrisma.tag.findMany({
      where: { id: { in: tag_ids } },
      select: { id: true }
    });
    
    if (existingTags.length !== tag_ids.length) {
      return NextResponse.json(
        { success: false, error: 'One or more tag IDs are invalid' },
        { status: 400 }
      );
    }
    
    await apiPrisma.$transaction(async (tx) => {
      await tx.post_tag.deleteMany({ where: { post_id: postId } });
      
      for (const tagId of tag_ids) {
        await tx.post_tag.create({
          data: { post_id: postId, tag_id: tagId }
        });
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post tags updated successfully' 
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);

    const { id } = await params;
    
    const postId = parseInt(id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }
    
    const postExists = await apiPrisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!postExists) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }
    
    await apiPrisma.post_tag.deleteMany({ 
      where: { post_id: postId } 
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'All post tags removed successfully' 
    });
  } catch (error) {
    return handleApiError(error);
  }
}
