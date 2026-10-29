import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest } from '@/lib/api-validation';
import { createTagSchema, Tag } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    
    const [tags, total] = await Promise.all([
      apiPrisma.tag.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      apiPrisma.tag.count()
    ]);
    
    const tagList: Tag[] = tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at?.toISOString()
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: {
        tags: tagList,
        total,
        page,
        limit
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const body = await request.json();
    const { name, slug } = validateRequest(createTagSchema, body);
    
    // Check if slug already exists
    const existingSlug = await apiPrisma.tag.findUnique({
      where: { slug }
    });
    
    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: 'Tag slug already exists' },
        { status: 409 }
      );
    }
    
    const tag = await apiPrisma.tag.create({
      data: { name, slug }
    });
    
    const newTag: Tag = {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      created_at: tag.created_at.toISOString(),
      updated_at: tag.updated_at?.toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: newTag,
      message: 'Tag created successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}