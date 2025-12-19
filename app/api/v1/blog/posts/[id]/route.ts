import { NextRequest, NextResponse } from 'next/server';
import { apiPrisma } from '@/lib/api-db';
import { requireApiKey, checkRateLimit, handleApiError } from '@/lib/api-validation';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireApiKey(request);
    const apiKey = request.headers.get('x-api-key')!;
    checkRateLimit(apiKey);
    
    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
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
    
    await apiPrisma.$transaction(async (tx) => {
      await tx.post_tag.deleteMany({ 
        where: { post_id: postId } 
      });
      
      await tx.post.delete({ 
        where: { id: postId } 
      });
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    return handleApiError(error);
  }
}