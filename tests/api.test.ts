import { expect } from 'chai';
import request from 'supertest';
import { describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import { apiPrisma } from '@/lib/api-db';

declare global {
  class chai {
    static expect: Chai.ExpectStatic;
  }
  
  namespace Chai {
    interface ExpectStatic {
      to: Chai.Assertion;
      be: Chai.Assertion;
      have: Chai.Assertion;
      equal: Chai.Assertion;
      not: Chai.Assertion;
      deep: Chai.Assertion;
      property: Chai.Assertion;
      length: Chai.Assertion;
      at: Chai.Assertion;
      include: Chai.Assertion;
      an: Chai.Assertion;
      least: Chai.Assertion;
    }
    
    interface Assertion {
      
    }
  }
}

const API_BASE = '/api/v1/blog';
const API_KEY = process.env.API_KEY || 'test-api-key';
const TEST_URL = 'http://localhost:3000';

describe('Blog API Endpoints', () => {
  let testPostId: number;
  let testTagId: number;

  beforeAll(async () => {
    // Clean database before tests
    await apiPrisma.post_tag.deleteMany();
    await apiPrisma.post.deleteMany();
    await apiPrisma.tag.deleteMany();
    
    // Create test tag
    const tag = await apiPrisma.tag.create({
      data: { name: 'Test Tag', slug: 'test-tag' }
    });
    testTagId = tag.id;
  });

  afterAll(async () => {
    // Clean database after tests
    await apiPrisma.post_tag.deleteMany();
    await apiPrisma.post.deleteMany();
    await apiPrisma.tag.deleteMany();
  });

  describe('POST /posts/create-pair', () => {
    it('should create Italian and English post pair', async () => {
      const response = await request(TEST_URL)
        .post(`${API_BASE}/posts/create-pair`)
        .set('x-api-key', API_KEY)
        .send({
          title_it: 'Test Post Italian',
          title_en: 'Test Post English',
          slug_it: 'test-post-italian',
          slug_en: 'test-post-english',
          description_it: 'Test description Italian',
          description_en: 'Test description English'
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.it).to.have.property('id');
      expect(response.body.data.it).to.have.property('slug');
      expect(response.body.data.en).to.have.property('id');
      expect(response.body.data.en).to.have.property('slug');
      
      // Store for cleanup
      testPostId = response.body.data.it.id;
    });
  });

  describe('GET /posts/[id]/metadata', () => {
    it('should get post metadata', async () => {
      // Create test post first
      const post = await apiPrisma.post.create({
        data: {
          title: 'Test Post',
          slug: 'test-post-metadata',
          content: '# Test Content',
          state: 0,
          locale: 'it'
        }
      });

      const response = await request(TEST_URL)
        .get(`${API_BASE}/posts/${post.id}/metadata`)
        .set('x-api-key', API_KEY);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('title', 'Test Post');
      expect(response.body.data).to.have.property('slug', 'test-post-metadata');
      expect(response.body.data).to.not.have.property('content'); // Content excluded
      expect(response.body.data).to.not.have.property('post_tag'); // Tags excluded
    });
  });

  describe('GET /posts/[id]/content', () => {
    it('should get post content', async () => {
      // Create test post first
      const post = await apiPrisma.post.create({
        data: {
          title: 'Test Content Post',
          slug: 'test-content-post',
          content: '# Original Content',
          state: 0,
          locale: 'it'
        }
      });
      testPostId = post.id;

      const response = await request(TEST_URL)
        .get(`${API_BASE}/posts/${testPostId}/content`)
        .set('x-api-key', API_KEY);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.content).to.equal('# Original Content');
      expect(response.body.data.title).to.equal('Test Content Post');
    });
  });

  describe('PUT /posts/[id]/content', () => {
    beforeEach(async () => {
      const post = await apiPrisma.post.create({
        data: {
          title: 'Content Update Test',
          slug: 'content-update-test',
          content: '# Original Content',
          state: 0,
          locale: 'it'
        }
      });
      testPostId = post.id;
    });

    it('should update post content', async () => {
      const newContent = '# Updated Content\n\n## New Section\nThis is updated content.';
      const response = await request(TEST_URL)
        .put(`${API_BASE}/posts/${testPostId}/content`)
        .set('x-api-key', API_KEY)
        .send({
          content: newContent
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.content).to.equal(newContent);
      expect(response.body.message).to.equal('Post content updated successfully');
    });
  });

  describe('PUT /posts/[id]/status', () => {
    beforeEach(async () => {
      const post = await apiPrisma.post.create({
        data: {
          title: 'Status Test Post',
          slug: 'status-test-post',
          content: '# Test Content',
          state: 0,
          locale: 'it'
        }
      });
      testPostId = post.id;
    });

    it('should change status from draft to published', async () => {
      const response = await request(TEST_URL)
        .put(`${API_BASE}/posts/${testPostId}/status`)
        .set('x-api-key', API_KEY)
        .send({ state: 1 });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.state).to.equal(1);
      expect(response.body.message).to.equal('Post status changed to Published');
    });
  });

  describe('GET /tags', () => {
    it('should get all tags with pagination', async () => {
      // Create multiple test tags
      await apiPrisma.tag.createMany({
        data: [
          { name: 'Tag A', slug: 'tag-a' },
          { name: 'Tag B', slug: 'tag-b' },
          { name: 'Tag C', slug: 'tag-c' }
        ]
      });

      const response = await request(TEST_URL)
        .get(`${API_BASE}/tags`)
        .set('x-api-key', API_KEY)
        .query({ limit: 2, page: 1 });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.tags).to.have.length(2);
      expect(response.body.data.total).to.be.at.least(4); // Original test tag + 3 new tags
      expect(response.body.data.page).to.equal(1);
      expect(response.body.data.limit).to.equal(2);
    });
  });

  describe('Authentication & Rate Limiting', () => {
    it('should reject requests without API key', async () => {
      const response = await request(TEST_URL)
        .get(`${API_BASE}/posts/1/metadata`);

      expect(response.status).to.equal(401);
      expect(response.body.success).to.be.false;
    });
  });
});
