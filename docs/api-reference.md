---
id: api-reference
title: API Reference
sidebar_label: API Reference
description: Complete API reference for WP LLM including authentication, endpoints, and SDKs
keywords: [api, reference, endpoints, authentication, sdk, rest]
---

# API Reference

Complete reference for the WP LLM API, including authentication, endpoints, request/response formats, and SDKs.

## **Authentication**

### **API Keys**

WP LLM uses API key authentication for secure access to the service.

```bash
# Set your API key
export WP_LLM_API_KEY="your-api-key-here"

# Or include in requests
curl -H "Authorization: Bearer your-api-key-here" \
     https://api.wp-llm.com/v1/generate
```

### **Rate Limits**

| Plan | Requests per minute | Requests per day |
|------|-------------------|------------------|
| Free | 10 | 1,000 |
| Pro | 100 | 50,000 |
| Enterprise | Custom | Custom |

### **Error Responses**

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 60
  }
}
```

## **Core Endpoints**

### **Text Generation**

#### **POST /v1/generate**

Generate WordPress code based on natural language prompts.

**Request:**
```json
{
  "prompt": "Create a custom post type for testimonials with fields for client name, company, and rating",
  "model": "wp-llm-7b",
  "max_tokens": 2048,
  "temperature": 0.7,
  "context": {
    "wordpress_version": "6.4",
    "theme": "twentytwentyfive",
    "plugins": ["woocommerce", "yoast-seo"]
  }
}
```

**Response:**
```json
{
  "id": "gen_123456789",
  "object": "text_generation",
  "created": 1640995200,
  "model": "wp-llm-7b",
  "choices": [
    {
      "index": 0,
      "text": "<?php\n// Register Custom Post Type for Testimonials\nfunction register_testimonial_post_type() {\n    $labels = array(\n        'name' => 'Testimonials',\n        'singular_name' => 'Testimonial',\n        // ... rest of the code\n    );\n}",
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 234,
    "total_tokens": 279
  }
}
```

### **Code Analysis**

#### **POST /v1/analyze**

Analyze existing WordPress code for improvements and security issues.

**Request:**
```json
{
  "code": "<?php\nfunction my_plugin_function() {\n    $user_input = $_POST['data'];\n    echo $user_input;\n}",
  "analysis_type": "security",
  "severity": "all"
}
```

**Response:**
```json
{
  "id": "analysis_123456789",
  "object": "code_analysis",
  "created": 1640995200,
  "issues": [
    {
      "type": "security",
      "severity": "high",
      "line": 3,
      "message": "Unsanitized user input detected",
      "suggestion": "Use wp_kses_post() or sanitize_text_field()"
    }
  ],
  "score": 0.3,
  "recommendations": [
    "Sanitize all user inputs",
    "Use WordPress nonces for form security",
    "Escape output with esc_html() or esc_attr()"
  ]
}
```

### **Block Generation**

#### **POST /v1/blocks/generate**

Generate Gutenberg blocks with React components.

**Request:**
```json
{
  "block_type": "testimonial",
  "attributes": {
    "client_name": "string",
    "company": "string",
    "rating": "number",
    "testimonial": "string"
  },
  "style_variants": ["default", "card", "minimal"],
  "include_editor": true
}
```

**Response:**
```json
{
  "id": "block_123456789",
  "object": "block_generation",
  "created": 1640995200,
  "files": {
    "block.json": {
      "content": "{\n  \"apiVersion\": 2,\n  \"name\": \"wp-llm/testimonial\",\n  \"title\": \"Testimonial Block\",\n  // ... block.json content\n}",
      "path": "blocks/testimonial/block.json"
    },
    "index.js": {
      "content": "import { registerBlockType } from '@wordpress/blocks';\n// ... React component code",
      "path": "blocks/testimonial/index.js"
    },
    "style.css": {
      "content": "/* Testimonial block styles */\n.wp-block-wp-llm-testimonial {\n  // ... CSS styles\n}",
      "path": "blocks/testimonial/style.css"
    }
  }
}
```

## **SDK Libraries**

### **PHP SDK**

#### **Installation**

```bash
composer require wp-llm/php-sdk
```

#### **Usage**

```php
<?php
require_once 'vendor/autoload.php';

use WPLLM\Client;

$client = new Client('your-api-key');

// Generate code
$response = $client->generate([
    'prompt' => 'Create a custom post type for products',
    'model' => 'wp-llm-7b',
    'max_tokens' => 1024
]);

echo $response->choices[0]->text;

// Analyze code
$analysis = $client->analyze([
    'code' => $phpCode,
    'analysis_type' => 'security'
]);

foreach ($analysis->issues as $issue) {
    echo "Line {$issue->line}: {$issue->message}\n";
}
```

### **JavaScript SDK**

#### **Installation**

```bash
npm install @wp-llm/js-sdk
```

#### **Usage**

```javascript
import { WPLLMClient } from '@wp-llm/js-sdk';

const client = new WPLLMClient('your-api-key');

// Generate code
const response = await client.generate({
    prompt: 'Create a REST API endpoint for user registration',
    model: 'wp-llm-7b',
    maxTokens: 1024
});

console.log(response.choices[0].text);

// Generate block
const block = await client.blocks.generate({
    blockType: 'hero-section',
    attributes: {
        title: 'string',
        subtitle: 'string',
        backgroundImage: 'string'
    }
});

console.log(block.files);
```

### **Python SDK**

#### **Installation**

```bash
pip install wp-llm-python
```

#### **Usage**

```python
from wp_llm import WPLLMClient

client = WPLLMClient(api_key="your-api-key")

# Generate code
response = client.generate(
    prompt="Create a WordPress plugin for contact forms",
    model="wp-llm-7b",
    max_tokens=1024
)

print(response.choices[0].text)

# Analyze code
analysis = client.analyze(
    code=php_code,
    analysis_type="security"
)

for issue in analysis.issues:
    print(f"Line {issue.line}: {issue.message}")
```

## **Webhooks**

### **Event Types**

WP LLM can send webhooks for various events:

- `generation.completed` - Code generation finished
- `analysis.completed` - Code analysis finished
- `block.generated` - Block generation completed
- `usage.limit_exceeded` - Rate limit exceeded

### **Webhook Setup**

```bash
# Register webhook
curl -X POST https://api.wp-llm.com/v1/webhooks \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhooks/wp-llm",
    "events": ["generation.completed", "analysis.completed"]
  }'
```

### **Webhook Payload**

```json
{
  "id": "evt_123456789",
  "object": "event",
  "created": 1640995200,
  "type": "generation.completed",
  "data": {
    "id": "gen_123456789",
    "object": "text_generation",
    "prompt": "Create a custom post type...",
    "completion": "<?php\n// Generated code...",
    "usage": {
      "prompt_tokens": 45,
      "completion_tokens": 234,
      "total_tokens": 279
    }
  }
}
```

## **Error Codes**

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `invalid_api_key` | Invalid or missing API key | 401 |
| `rate_limit_exceeded` | Rate limit exceeded | 429 |
| `invalid_request` | Invalid request parameters | 400 |
| `model_not_found` | Specified model not available | 404 |
| `insufficient_quota` | API quota exceeded | 402 |
| `server_error` | Internal server error | 500 |

## **Response Formats**

### **Standard Response**

All API responses follow a consistent format:

```json
{
  "id": "unique_identifier",
  "object": "object_type",
  "created": 1640995200,
  "data": {
    // Response-specific data
  },
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 234,
    "total_tokens": 279
  }
}
```

### **Error Response**

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "param": "parameter_name",
    "type": "error_type"
  }
}
```

## **Rate Limiting**

### **Headers**

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995260
```

### **Handling Rate Limits**

```javascript
// JavaScript example
const response = await fetch('/v1/generate', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
});

if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    // Retry request
}
```

## **Best Practices**

### **API Usage**

1. **Batch Requests**: Combine multiple related requests when possible
2. **Caching**: Cache responses for repeated prompts
3. **Error Handling**: Implement proper error handling and retry logic
4. **Rate Limiting**: Respect rate limits and implement exponential backoff

### **Security**

1. **API Key Management**: Store API keys securely, never in client-side code
2. **Input Validation**: Validate all inputs before sending to API
3. **Output Sanitization**: Sanitize generated code before execution
4. **HTTPS**: Always use HTTPS for API communications

### **Performance**

1. **Connection Pooling**: Reuse HTTP connections when possible
2. **Request Optimization**: Minimize request payload size
3. **Response Handling**: Process responses asynchronously when appropriate

---

**Related Documentation:**
- [Getting Started](./getting-started/local-setup-ollama.md)
- [Advanced Usage](./advanced-usage.md)
- [Examples](./examples.md)
- [Troubleshooting](./troubleshooting.md) 