import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message, data: error.data },
      { status: error.statusCode }
    );
  }
  
  console.error('Unexpected API error:', error);
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new ApiError(400, 'Validation failed', error);
  }
}

export function requireApiKey(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.API_KEY;
  
  // Check if request was validated by middleware (allowed origin/IP)
  const middlewareValidated = request.headers.get('x-middleware-validated') === 'true';
  
  // Allow if API key is valid OR if middleware validated the request
  if ((apiKey && apiKey === expectedKey) || middlewareValidated) {
    return;
  }
  
  throw new ApiError(401, 'Invalid or missing API key');
}

// Rate limiting (simplified for serverless compatibility)
export function checkRateLimit(apiKey: string, limit: number = 100, windowMs: number = 60000) {
  // For now, we'll skip rate limiting in the middleware context
  // In production, you might want to use Redis or a database-backed rate limiter
  // TODO: Implement proper rate limiting using the parameters:
  // - apiKey: Unique identifier for the client
  // - limit: Maximum number of requests allowed
  // - windowMs: Time window in milliseconds
  
  // Log rate limiting attempt for debugging
  //console.log(`Rate limiting check for API key: ${apiKey.substring(0, 8)}..., limit: ${limit}, window: ${windowMs}ms`);
  
  // For development, we'll allow all requests but log the attempt
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: rate limiting disabled');
    return true;
  }
  
  // In production, implement actual rate limiting here
  // For now, return true to allow all requests
  return true;
}

// Helper function to generate slugs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}  
