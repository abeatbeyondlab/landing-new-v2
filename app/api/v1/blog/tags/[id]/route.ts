import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { updateTagSchema, Tag } from '@/types/api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);

    const { id } = await params;
    
    const tagId = parseInt(id);
    if (isNaN(tagId)) {
      throw new Error('Invalid tag ID');
    }
    
    const tag = await apiPrisma.tag.findUnique({
      where: { id: tagId }
    });
    
    if (!tag) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }
    
    const tagData: Tag = {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at?.toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: tagData 
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
    
    const tagId = parseInt(id);
    if (isNaN(tagId)) {
      throw new Error('Invalid tag ID');
    }
    
    const body = await request.json();
    const updateData = validateRequest(updateTagSchema, body);
    
    const existingTag = await apiPrisma.tag.findUnique({
      where: { id: tagId }
    });
    
    if (!existingTag) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }
    
    // Check slug uniqueness if provided
    if (updateData.slug && updateData.slug !== existingTag.slug) {
      const existingSlug = await apiPrisma.tag.findFirst({
        where: { 
          slug: updateData.slug,
          id: { not: tagId }
        }
      });
      
      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: 'Tag slug already exists' },
          { status: 409 }
        );
      }
    }
    
    const tag = await apiPrisma.tag.update({
      where: { id: tagId },
      data: {
        ...updateData,
        updated_at: new Date()
      }
    });
    
    const updatedTag: Tag = {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at?.toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: updatedTag,
      message: 'Tag updated successfully'
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
    
    const tagId = parseInt(id);
    if (isNaN(tagId)) {
      throw new Error('Invalid tag ID');
    }
    
    const existingTag = await apiPrisma.tag.findUnique({
      where: { id: tagId }
    });
    
    if (!existingTag) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }
    
    await apiPrisma.tag.delete({
      where: { id: tagId }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tag deleted successfully' 
    });
  } catch (error) {
    return handleApiError(error);
  }
}
