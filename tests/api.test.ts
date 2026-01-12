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

  // Track created IDs for cleanup
  const createdPostIds: number[] = [];
  const createdTagIds: number[] = [];

  beforeAll(async () => {
    // Create test tag with unique slug
    const timestamp = Date.now();
    const tag = await apiPrisma.tag.create({
      data: { name: `Test Tag ${timestamp}`, slug: `test-tag-${timestamp}` }
    });
    testTagId = tag.id;
    createdTagIds.push(tag.id);
  });

  afterAll(async () => {
    // Clean up created posts
    for (const id of createdPostIds) {
      try {
        await apiPrisma.post.delete({ where: { id } });
      } catch (e) {
        // Ignore errors if post already deleted
      }
    }

    // Clean up created tags
    for (const id of createdTagIds) {
      try {
        await apiPrisma.tag.delete({ where: { id } });
      } catch (e) {
        // Ignore errors if tag already deleted
      }
    }
  });

  describe('POST /posts/create-pair', () => {
    it('should create Italian and English post pair', async () => {
      const timestamp = Date.now();
      const response = await request(TEST_URL)
        .post(`${API_BASE}/posts/create-pair`)
        .set('x-api-key', API_KEY)
        .send({
          title_it: `Test Post Italian ${timestamp}`,
          title_en: `Test Post English ${timestamp}`,
          slug_it: `test-post-italian-${timestamp}`,
          slug_en: `test-post-english-${timestamp}`,
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
      createdPostIds.push(response.body.data.it.id);
      createdPostIds.push(response.body.data.en.id);
      testPostId = response.body.data.it.id;
    });
  });

  describe('GET /posts/[id]/metadata', () => {
    it('should get post metadata', async () => {
      // Create test post first
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Test Post',
          slug: `test-post-metadata-${timestamp}`,
          content: '# Test Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);

      const response = await request(TEST_URL)
        .get(`${API_BASE}/posts/${post.id}/metadata`)
        .set('x-api-key', API_KEY);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('title', 'Test Post');
      expect(response.body.data).to.have.property('slug', `test-post-metadata-${timestamp}`);
      expect(response.body.data).to.not.have.property('content'); // Content excluded
      expect(response.body.data).to.not.have.property('post_tag'); // Tags excluded
    });
  });

  describe('GET /posts/[id]/content', () => {
    it('should get post content', async () => {
      // Create test post first
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Test Content Post',
          slug: `test-content-post-${timestamp}`,
          content: '# Original Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);
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
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Content Update Test',
          slug: `content-update-test-${timestamp}`,
          content: '# Original Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);
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
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Status Test Post',
          slug: `status-test-post-${timestamp}`,
          content: '# Test Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);
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

    it('should revert status from published to draft', async () => {
      // First ensure it is published
      await request(TEST_URL)
        .put(`${API_BASE}/posts/${testPostId}/status`)
        .set('x-api-key', API_KEY)
        .send({ state: 1 });

      const response = await request(TEST_URL)
        .put(`${API_BASE}/posts/${testPostId}/status`)
        .set('x-api-key', API_KEY)
        .send({ state: 0 });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.state).to.equal(0);
      expect(response.body.message).to.equal('Post status changed to Draft');
    });
  });

  describe('GET /tags', () => {
    it('should get all tags with pagination', async () => {
      const timestamp = Date.now();
      // Create multiple test tags
      await apiPrisma.tag.createMany({
        data: [
          { name: `Tag A ${timestamp}`, slug: `tag-a-${timestamp}` },
          { name: `Tag B ${timestamp}`, slug: `tag-b-${timestamp}` },
          { name: `Tag C ${timestamp}`, slug: `tag-c-${timestamp}` }
        ]
      });
      
      // Need to find IDs to clean up
      const tags = await apiPrisma.tag.findMany({
        where: {
            slug: { in: [`tag-a-${timestamp}`, `tag-b-${timestamp}`, `tag-c-${timestamp}`] }
        }
      });
      tags.forEach(t => createdTagIds.push(t.id));

      const response = await request(TEST_URL)
        .get(`${API_BASE}/tags`)
        .set('x-api-key', API_KEY)
        .query({ limit: 2, page: 1 });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.tags).to.have.length(2);
      // We can't guarantee total counts if db is shared, but we know it should be at least 4 (3 + 1 from beforeAll)
      expect(response.body.data.total).to.be.at.least(4); 
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

  describe('GET /posts (List)', () => {
    it('should get a list of posts', async () => {
        // Create at least one post if not exists (we rely on previous tests or create one)
        const timestamp = Date.now();
        const post = await apiPrisma.post.create({
            data: {
                title: 'List Test Post',
                slug: `list-test-post-${timestamp}`,
                content: 'Content',
                state: 1,
                locale: 'it'
            }
        });
        createdPostIds.push(post.id);

        const response = await request(TEST_URL)
            .get(`${API_BASE}/posts`)
            .set('x-api-key', API_KEY)
            .query({ limit: 10, page: 1 });

        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
        expect(response.body.data.posts).to.be.an('array');
        expect(response.body.data.posts.length).to.be.greaterThan(0);
    });
  });

  describe('Tag Management (CRUD)', () => {
    let crudTagId: number;

    it('should create a new tag', async () => {
      const timestamp = Date.now();
      const response = await request(TEST_URL)
        .post(`${API_BASE}/tags`)
        .set('x-api-key', API_KEY)
        .send({
          name: `CRUD Tag ${timestamp}`,
          slug: `crud-tag-${timestamp}`
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('id');
      
      crudTagId = response.body.data.id;
      createdTagIds.push(crudTagId);
    });

    it('should update a tag', async () => {
      const timestamp = Date.now();
      const response = await request(TEST_URL)
        .put(`${API_BASE}/tags/${crudTagId}`)
        .set('x-api-key', API_KEY)
        .send({
          name: `Updated Tag ${timestamp}`
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.name).to.equal(`Updated Tag ${timestamp}`);
    });

    it('should delete a tag', async () => {
      const response = await request(TEST_URL)
        .delete(`${API_BASE}/tags/${crudTagId}`)
        .set('x-api-key', API_KEY);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      
      // Verify deletion
      const check = await request(TEST_URL)
        .get(`${API_BASE}/tags/${crudTagId}`)
        .set('x-api-key', API_KEY);
      expect(check.status).to.equal(404);
    });
  });

  describe('Post Metadata Update', () => {
    it('should update post metadata', async () => {
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Meta Test Post',
          slug: `meta-test-${timestamp}`,
          content: 'Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);

      const response = await request(TEST_URL)
        .put(`${API_BASE}/posts/${post.id}/metadata`)
        .set('x-api-key', API_KEY)
        .send({
          title: 'Updated Title',
          description: 'Updated Description'
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.title).to.equal('Updated Title');
      expect(response.body.data.description).to.equal('Updated Description');
    });
  });

  describe('Post Tags Management', () => {
    it('should assign tags to a post', async () => {
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Tag Test Post',
          slug: `tag-test-post-${timestamp}`,
          content: 'Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);

      const tag = await apiPrisma.tag.create({
        data: { name: `Assigned Tag ${timestamp}`, slug: `assigned-tag-${timestamp}` }
      });
      createdTagIds.push(tag.id);

      // Assign
      const response = await request(TEST_URL)
        .put(`${API_BASE}/posts/${post.id}/tags`)
        .set('x-api-key', API_KEY)
        .send({
          tag_ids: [tag.id]
        });

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;

      // Verify
      const getResponse = await request(TEST_URL)
        .get(`${API_BASE}/posts/${post.id}/tags`)
        .set('x-api-key', API_KEY);

      expect(getResponse.status).to.equal(200);
      expect(getResponse.body.success).to.be.true;
      expect(getResponse.body.data).to.have.length(1);
      expect(getResponse.body.data[0].id).to.equal(tag.id);
    });
  });

  describe('Post Deletion', () => {
    it('should delete a post', async () => {
      const timestamp = Date.now();
      const post = await apiPrisma.post.create({
        data: {
          title: 'Delete Test Post',
          slug: `delete-test-${timestamp}`,
          content: 'Content',
          state: 0,
          locale: 'it'
        }
      });
      createdPostIds.push(post.id);

      const response = await request(TEST_URL)
        .delete(`${API_BASE}/posts/${post.id}`)
        .set('x-api-key', API_KEY);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;

      // Verify 404
      const check = await request(TEST_URL)
        .get(`${API_BASE}/posts/${post.id}/metadata`)
        .set('x-api-key', API_KEY);
      
      expect(check.status).to.equal(404);
    });
  });
});
