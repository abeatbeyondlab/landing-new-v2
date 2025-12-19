import { z } from 'zod';

// Base API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Post Types
export interface PostMetadata {
  id?: number;
  slug: string;
  title: string;
  description?: string | null;
  date?: string | null;
  author?: string | null;
  state: 0 | 1; // 0: Draft, 1: Published
  locale: 'it' | 'en';
  image_slug?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Post extends PostMetadata {
  content: string;
  tags: Tag[];
}

export interface Tag {
  id?: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface PostPair {
  it: PostMetadata;
  en: PostMetadata;
}

// Request Schemas
export const createPostPairSchema = z.object({
  title_it: z.string().min(1, 'Italian title is required'),
  title_en: z.string().min(1, 'English title is required'),
  slug_it: z.string().optional(),
  slug_en: z.string().optional(),
  description_it: z.string().optional(),
  description_en: z.string().optional(),
});

export const updateMetadataSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  state: z.union([z.literal(0), z.literal(1)]).optional(),
  locale: z.enum(['it', 'en']).optional(),
  image_slug: z.string().optional(),
});

export const updateTagsSchema = z.object({
  tag_ids: z.array(z.number()),
});

export const changeStatusSchema = z.object({
  state: z.union([z.literal(0), z.literal(1)]),
});

export const createTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required'),
  slug: z.string().min(1, 'Tag slug is required'),
});

export const updateTagSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
});

export const convertToWebpSchema = z.object({
  quality: z.number().min(10).max(100).optional().default(80),
});

// Request Types
export interface CreatePostPairRequest {
  title_it: string;
  title_en: string;
  slug_it?: string;
  slug_en?: string;
  description_it?: string;
  description_en?: string;
}

export interface UpdateMetadataRequest {
  slug?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  state?: 0 | 1;
  locale?: 'it' | 'en';
  image_slug?: string;
}

export interface UpdateTagsRequest {
  tag_ids: number[];
}

export interface ChangeStatusRequest {
  state: 0 | 1;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
}

export interface UpdateTagRequest {
  name?: string;
  slug?: string;
}

export interface ConvertToWebpRequest {
  quality?: number;
}

// Response Types
export interface CreatePostPairResponse {
  it: { id: number; slug: string };
  en: { id: number; slug: string };
}

export interface PostListResponse {
  posts: PostMetadata[];
  total: number;
  page?: number;
  limit?: number;
}

export interface TagListResponse {
  tags: Tag[];
  total: number;
}

export interface ImageUploadResponse {
  image_path: string;
  filename: string;
  size: number;
}

export interface ConvertToWebpResponse {
  new_image_path: string;
  original_size: number;
  converted_size: number;
  quality: number;
}