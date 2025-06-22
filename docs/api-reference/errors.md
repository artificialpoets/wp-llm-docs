---
id: api-errors
title: Error Handling
description: Comprehensive guide to handling errors from the WP LLM API, including error codes, response formats, and best practices for error handling.
keywords: [WP LLM API errors, error handling, error codes, HTTP status codes, error responses, debugging]
---

# ⚠️ Error Handling

Comprehensive guide to handling errors from the WP LLM API with proper error codes, response formats, and debugging strategies.

## **HTTP Status Codes**

### Success Codes
Successful API responses:

| Code | Description |
|------|-------------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `202` | Accepted - Request accepted for processing |

### Client Error Codes
Client-side errors (4xx):

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid request format |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource not found |
| `429` | Too Many Requests - Rate limit exceeded |

### Server Error Codes
Server-side errors (5xx):

| Code | Description |
|------|-------------|
| `500` | Internal Server Error - Server error |
| `502` | Bad Gateway - Gateway error |
| `503` | Service Unavailable - Service temporarily unavailable |
| `504` | Gateway Timeout - Request timeout |

## **Error Response Format**

All error responses follow a consistent format:

```json
{
  "error": {
    "type": "error_type",
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    },
    "request_id": "unique-request-id",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## **Common Error Types**

### Invalid API Key
Authentication error when API key is invalid:

```json
{
  "error": {
    "type": "authentication_error",
    "code": "invalid_api_key",
    "message": "Invalid API key provided",
    "details": {
      "api_key": "The API key format is invalid or expired"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Verify API key is correct
2. Check if API key has expired
3. Ensure API key has required permissions
4. Regenerate API key if necessary

### Expired Token
JWT token has expired:

```json
{
  "error": {
    "type": "authentication_error",
    "code": "token_expired",
    "message": "JWT token has expired",
    "details": {
      "expired_at": "2024-01-01T00:00:00Z",
      "current_time": "2024-01-01T01:00:00Z"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T01:00:00Z"
  }
}
```

**Solutions:**
1. Refresh the JWT token
2. Request a new token from the authentication endpoint
3. Check token expiration time
4. Implement automatic token refresh

### Insufficient Permissions
User lacks required permissions:

```json
{
  "error": {
    "type": "authorization_error",
    "code": "insufficient_permissions",
    "message": "Insufficient permissions for this operation",
    "details": {
      "required_permission": "write",
      "current_permission": "read",
      "resource": "models"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Upgrade API key permissions
2. Contact administrator for access
3. Use a different API key with required permissions
4. Check resource-specific permissions

### Rate Limit Exceeded
Too many requests in a time period:

```json
{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_time": 1640995200,
      "retry_after": 60
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Wait for rate limit reset
2. Implement exponential backoff
3. Reduce request frequency
4. Upgrade to higher rate limit tier

### Quota Exceeded
Monthly quota has been exceeded:

```json
{
  "error": {
    "type": "quota_error",
    "code": "quota_exceeded",
    "message": "Monthly quota exceeded",
    "details": {
      "quota_limit": 1000000,
      "quota_used": 1000000,
      "reset_date": "2024-02-01T00:00:00Z"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Upgrade to higher quota tier
2. Wait for quota reset
3. Optimize request usage
4. Contact support for quota increase

### Invalid Request Parameters
Request contains invalid parameters:

```json
{
  "error": {
    "type": "validation_error",
    "code": "invalid_parameters",
    "message": "Invalid request parameters",
    "details": {
      "field": "prompt",
      "issue": "Prompt cannot be empty",
      "value": ""
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Check parameter format and values
2. Ensure required fields are provided
3. Validate input before sending
4. Review API documentation

### Model Not Found
Requested model doesn't exist:

```json
{
  "error": {
    "type": "resource_error",
    "code": "model_not_found",
    "message": "Model not found",
    "details": {
      "model_id": "wp-llm-v2",
      "available_models": ["wp-llm", "wp-llm-7b", "wp-llm-13b"]
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Check model name spelling
2. Use available model from list
3. Check model availability in your region
4. Contact support for model access

### Content Filter
Content was filtered by safety filters:

```json
{
  "error": {
    "type": "content_error",
    "code": "content_filtered",
    "message": "Content was filtered by safety filters",
    "details": {
      "filter_type": "safety",
      "filtered_content": "inappropriate content",
      "suggestion": "Please rephrase your request"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Rephrase the request
2. Remove inappropriate content
3. Use more professional language
4. Contact support if false positive

### Context Length Exceeded
Request exceeds maximum context length:

```json
{
  "error": {
    "type": "validation_error",
    "code": "context_length_exceeded",
    "message": "Request exceeds maximum context length",
    "details": {
      "max_tokens": 8192,
      "request_tokens": 10000,
      "excess_tokens": 1808
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Reduce prompt length
2. Break request into smaller chunks
3. Remove unnecessary context
4. Use more concise language

### Internal Server Error
Unexpected server error:

```json
{
  "error": {
    "type": "server_error",
    "code": "internal_error",
    "message": "An unexpected error occurred",
    "details": {
      "error_id": "err_987654321",
      "component": "generation_service"
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Retry the request
2. Check service status
3. Contact support with error ID
4. Wait and try again later

### Service Unavailable
Service is temporarily unavailable:

```json
{
  "error": {
    "type": "server_error",
    "code": "service_unavailable",
    "message": "Service is temporarily unavailable",
    "details": {
      "estimated_recovery": "2024-01-01T02:00:00Z",
      "maintenance_mode": false
    },
    "request_id": "req_123456789",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Solutions:**
1. Wait for service recovery
2. Check service status page
3. Implement retry logic
4. Use fallback endpoints

## **SDK Error Handling**

### JavaScript SDK
Handle errors in JavaScript:

```javascript
import { WPLLM } from '@wp-llm/sdk';

const client = new WPLLM({
  apiKey: 'your-api-key'
});

try {
  const response = await client.generate({
    prompt: 'Create a custom post type'
  });
  console.log(response);
} catch (error) {
  if (error.type === 'authentication_error') {
    console.error('Authentication failed:', error.message);
  } else if (error.type === 'rate_limit_error') {
    console.error('Rate limit exceeded, retry after:', error.details.retry_after);
  } else if (error.type === 'validation_error') {
    console.error('Invalid request:', error.details);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### PHP SDK
Handle errors in PHP:

```php
<?php
use WPLLM\Client;
use WPLLM\Exceptions\AuthenticationException;
use WPLLM\Exceptions\RateLimitException;
use WPLLM\Exceptions\ValidationException;

$client = new Client([
    'api_key' => 'your-api-key'
]);

try {
    $response = $client->generate([
        'prompt' => 'Create a custom post type'
    ]);
    echo $response;
} catch (AuthenticationException $e) {
    error_log('Authentication failed: ' . $e->getMessage());
} catch (RateLimitException $e) {
    error_log('Rate limit exceeded, retry after: ' . $e->getRetryAfter());
} catch (ValidationException $e) {
    error_log('Invalid request: ' . $e->getDetails());
} catch (Exception $e) {
    error_log('Unexpected error: ' . $e->getMessage());
}
```

### Python SDK
Handle errors in Python:

```python
from wp_llm import Client
from wp_llm.exceptions import AuthenticationError, RateLimitError, ValidationError

client = Client(api_key="your-api-key")

try:
    response = client.generate(
        prompt="Create a custom post type"
    )
    print(response)
except AuthenticationError as e:
    print(f"Authentication failed: {e.message}")
except RateLimitError as e:
    print(f"Rate limit exceeded, retry after: {e.retry_after}")
except ValidationError as e:
    print(f"Invalid request: {e.details}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## **Best Practices**

### Implement Retry Logic
Handle transient errors with retry logic:

```javascript
async function makeRequestWithRetry(client, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.generate(options);
    } catch (error) {
      if (error.type === 'rate_limit_error') {
        const retryAfter = error.details.retry_after || 60;
        console.log(`Rate limited, waiting ${retryAfter} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      } else if (error.type === 'server_error' && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Server error, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

### Log Errors Appropriately
Implement proper error logging:

```javascript
function logError(error, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    error_type: error.type,
    error_code: error.code,
    message: error.message,
    request_id: error.request_id,
    context: context
  };

  if (error.type === 'server_error') {
    console.error('Server error:', logEntry);
    // Send to error monitoring service
  } else if (error.type === 'authentication_error') {
    console.warn('Authentication error:', logEntry);
  } else {
    console.log('Client error:', logEntry);
  }
}
```

### Handle Errors Gracefully
Provide user-friendly error messages:

```javascript
function getUserFriendlyMessage(error) {
  switch (error.type) {
    case 'authentication_error':
      return 'Please check your API key and try again.';
    case 'rate_limit_error':
      return 'Too many requests. Please wait a moment and try again.';
    case 'quota_error':
      return 'Monthly quota exceeded. Please upgrade your plan.';
    case 'validation_error':
      return 'Invalid request. Please check your input and try again.';
    case 'server_error':
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
```

---

**Need help with error handling?** Check the [API Reference](api-reference) for complete endpoint documentation, or contact support for assistance with specific error scenarios. 
- [Rate Limiting](../api-reference.md#rate-limiting) 