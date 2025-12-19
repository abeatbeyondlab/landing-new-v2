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
  
  if (!apiKey || apiKey !== expectedKey) {
    throw new ApiError(401, 'Invalid or missing API key');
  }
}

// Rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(apiKey: string, limit: number = 100, windowMs: number = 60000) {
  const now = Date.now();
  const keyData = rateLimits.get(apiKey);
  
  if (!keyData || now > keyData.resetTime) {
    rateLimits.set(apiKey, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (keyData.count >= limit) {
    throw new ApiError(429, 'Rate limit exceeded');
  }
  
  keyData.count++;
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