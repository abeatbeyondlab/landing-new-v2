# A Beat Beyond

`this is the abeatbeyond website`




access api with key 

# From allowed origin
curl -X POST "http://localhost:3000/api/v1/blog/posts/create-pair" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"title_it": "Test", "title_en": "Test"}'

# With API key
curl -X POST "http://localhost:3000/api/v1/blog/posts/create-pair" \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key" \
  -d '{"title_it": "Test", "title_en": "Test"}'