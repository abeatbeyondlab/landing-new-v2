#!/bin/bash

API_URL="http://localhost:3000/api/v1/blog"
API_KEY="test-api-key"

echo "========================================"
echo "Testing Blog API at $API_URL"
echo "========================================"

# 1. Create Post Pair
echo -e "\n1. Creating Post Pair..."
RESPONSE=$(curl -s -X POST "$API_URL/posts/create-pair" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title_it": "Curl Test IT",
    "title_en": "Curl Test EN",
    "description_it": "Created via curl",
    "description_en": "Created via curl"
  }')

echo "Response: $RESPONSE"
POST_ID_IT=$(echo $RESPONSE | jq -r '.data.it.id')
POST_ID_EN=$(echo $RESPONSE | jq -r '.data.en.id')

if [ "$POST_ID_IT" == "null" ] || [ -z "$POST_ID_IT" ]; then
  echo "Failed to create post. Exiting."
  exit 1
fi

echo ">> Created Post ID (IT): $POST_ID_IT"
echo ">> Created Post ID (EN): $POST_ID_EN"

# 2. Update Metadata
echo -e "\n2. Updating Metadata for Post IT ($POST_ID_IT)..."
curl -s -X PUT "$API_URL/posts/$POST_ID_IT/metadata" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title IT via Curl",
    "slug": "curl-test-post-it-'$POST_ID_IT'"
  }' | jq .

echo -e "\n2b. Updating Metadata for Post EN ($POST_ID_EN)..."
curl -s -X PUT "$API_URL/posts/$POST_ID_EN/metadata" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title EN via Curl",
    "slug": "curl-test-post-en-'$POST_ID_EN'"
  }' | jq .

# 3. Create Tag
echo -e "\n3. Creating new Tag..."
TAG_NAME="CurlTag_$(date +%s)"
RESPONSE=$(curl -s -X POST "$API_URL/tags" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "'$TAG_NAME'",
    "slug": "curl-tag-'$(date +%s)'"
  }')

echo "Response: $RESPONSE"
TAG_ID=$(echo $RESPONSE | jq -r '.data.id')

if [ "$TAG_ID" == "null" ] || [ -z "$TAG_ID" ]; then
  echo "Failed to create tag. Exiting."
  exit 1
fi

echo ">> Created Tag ID: $TAG_ID"

# 4. Assign Tag
echo -e "\n4. Assigning Tag $TAG_ID to Post IT ($POST_ID_IT)..."
curl -s -X PUT "$API_URL/posts/$POST_ID_IT/tags" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tag_ids": ['$TAG_ID']
  }' | jq .

echo -e "\n4b. Assigning Tag $TAG_ID to Post EN ($POST_ID_EN)..."
curl -s -X PUT "$API_URL/posts/$POST_ID_EN/tags" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tag_ids": ['$TAG_ID']
  }' | jq .

# 5. Upload Image
echo -e "\n5. Uploading Image to Post IT ($POST_ID_IT)..."
# Create dummy image
echo "fake image content IT" > test-image-it.jpg

curl -s -X POST "$API_URL/posts/$POST_ID_IT/image/upload" \
  -H "x-api-key: $API_KEY" \
  -F "image=@test-image-it.jpg;type=image/jpeg" | jq .

echo -e "\n5b. Uploading Image to Post EN ($POST_ID_EN)..."
# Create dummy image
echo "fake image content EN" > test-image-en.jpg

curl -s -X POST "$API_URL/posts/$POST_ID_EN/image/upload" \
  -H "x-api-key: $API_KEY" \
  -F "image=@test-image-en.jpg;type=image/jpeg" | jq .

# Cleanup images
rm test-image-it.jpg test-image-en.jpg

echo -e "\n========================================"
echo "Test Sequence Complete."
echo "========================================"
