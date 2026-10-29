import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError, validateRequest, generateSlug } from '@/lib/api-validation';
import { createPostPairSchema, CreatePostPairResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const body = await request.json();
    
    const { title_it, title_en, slug_it, slug_en, description_it, description_en } = 
      validateRequest(createPostPairSchema, body);
    
    const italianSlug = slug_it || generateSlug(title_it);
    const englishSlug = slug_en || generateSlug(title_en);
    
    const postIt = await apiPrisma.post.create({
      data: {
        title: title_it,
        slug: italianSlug,
        description: description_it,
        content: `# ${title_it}\n\nDraft content.`,
        state: 0,
        locale: 'it'
      }
    });
    
    const postEn = await apiPrisma.post.create({
      data: {
        title: title_en,
        slug: englishSlug,
        description: description_en,
        content: `# ${title_en}\n\nDraft content.`,
        state: 0,
        locale: 'en'
      }
    });
    
    const response: CreatePostPairResponse = {
      it: { id: postIt.id, slug: postIt.slug },
      en: { id: postEn.id, slug: postEn.slug }
    };
    
    return NextResponse.json({
      success: true,
      data: response,
      message: 'Post pair created successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
}