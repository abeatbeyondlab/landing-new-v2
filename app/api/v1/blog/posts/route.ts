import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError } from '@/lib/api-validation';
import { PostMetadata } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    
    // Optional filters
    const stateParam = searchParams.get('state');
    const localeParam = searchParams.get('locale');
    
    const where: any = {};
    if (stateParam !== null) where.state = parseInt(stateParam);
    if (localeParam) where.locale = localeParam;

    const [posts, total] = await Promise.all([
      apiPrisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
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
      }),
      apiPrisma.post.count({ where })
    ]);
    
    const postList: PostMetadata[] = posts.map(post => ({
      ...post,
      state: post.state as 0 | 1,
      locale: post.locale as 'it' | 'en',
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at?.toISOString()
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: {
        posts: postList,
        total,
        page,
        limit
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
