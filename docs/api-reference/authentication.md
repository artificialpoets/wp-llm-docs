---
id: api-authentication
title: Authentication
description: Learn how to authenticate with the WP LLM API using API keys, JWT tokens, and various authentication methods for secure access.
keywords: [WP LLM API authentication, API keys, JWT tokens, bearer tokens, authentication methods, security]
---

# 🔐 Authentication

Secure authentication methods for accessing the WP LLM API with proper security measures and best practices.

## **Authentication Methods**

WP LLM API supports multiple authentication methods to meet different security requirements and use cases.

### Bearer Token (Recommended)
Use Bearer token authentication for most API requests:

```bash
curl -X POST https://api.wp-llm.com/v1/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a custom post type"}'
```

### API Key Header
Alternative method using custom header:

```bash
curl -X POST https://api.wp-llm.com/v1/generate \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a custom post type"}'
```

### Query Parameter (Not Recommended)
For legacy applications (less secure):

```bash
curl -X POST "https://api.wp-llm.com/v1/generate?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a custom post type"}'
```

## **Request Headers**

### Required Headers
Essential headers for all API requests:

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
User-Agent: YourApp/1.0
```

### Optional Headers
Additional headers for enhanced functionality:

```http
Accept: application/json
Accept-Language: en-US,en;q=0.9
X-Request-ID: unique-request-id
X-Client-Version: 1.0.0
```

### Rate Limiting Headers
Headers for managing rate limits:

```http
X-Rate-Limit-Limit: 1000
X-Rate-Limit-Remaining: 999
X-Rate-Limit-Reset: 1640995200
```

### Security Headers
Security-related headers:

```http
X-Forwarded-For: client-ip
X-Real-IP: client-ip
X-Client-Cert: client-certificate
```

## **Error Responses**

### Authentication Errors
Common authentication error responses:

```json
{
  "error": {
    "type": "authentication_error",
    "code": "invalid_api_key",
    "message": "Invalid API key provided",
    "details": {
      "api_key": "The API key format is invalid"
    }
  }
}
```

### Rate Limit Errors
Rate limiting error responses:

```json
{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 1000,
      "reset_time": 1640995200,
      "retry_after": 60
    }
  }
}
```

### Permission Errors
Permission-related error responses:

```json
{
  "error": {
    "type": "permission_error",
    "code": "insufficient_permissions",
    "message": "Insufficient permissions for this operation",
    "details": {
      "required_permission": "write",
      "current_permission": "read"
    }
  }
}
```

## **SDK Examples**

### JavaScript SDK
Using the JavaScript SDK for authentication:

```javascript
import { WPLLM } from '@wp-llm/sdk';

const client = new WPLLM({
  apiKey: 'your-api-key',
  baseURL: 'https://api.wp-llm.com'
});

// Make authenticated request
const response = await client.generate({
  prompt: 'Create a custom post type for products'
});
```

### PHP SDK
Using the PHP SDK for authentication:

```php
<?php
use WPLLM\Client;

$client = new Client([
    'api_key' => 'your-api-key',
    'base_url' => 'https://api.wp-llm.com'
]);

// Make authenticated request
$response = $client->generate([
    'prompt' => 'Create a custom post type for products'
]);
```

### Python SDK
Using the Python SDK for authentication:

```python
from wp_llm import Client

client = Client(
    api_key="your-api-key",
    base_url="https://api.wp-llm.com"
)

# Make authenticated request
response = client.generate(
    prompt="Create a custom post type for products"
)
```

## **JWT Authentication**

### JWT Token Format
JWT tokens for advanced authentication:

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user123",
    "iss": "your-app",
    "aud": "wp-llm-api",
    "exp": 1640995200,
    "iat": 1640908800,
    "scope": "read write"
  }
}
```

### Using JWT Tokens
Authenticate with JWT tokens:

```bash
curl -X POST https://api.wp-llm.com/v1/generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a custom post type"}'
```

## **OAuth 2.0 Flows**

### Authorization Code Flow
OAuth 2.0 authorization code flow:

```javascript
// Step 1: Redirect user to authorization URL
const authUrl = 'https://api.wp-llm.com/oauth/authorize?' +
  'client_id=your-client-id' +
  '&redirect_uri=your-redirect-uri' +
  '&response_type=code' +
  '&scope=read write';

// Step 2: Exchange code for token
const tokenResponse = await fetch('https://api.wp-llm.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
    code: 'authorization-code',
    grant_type: 'authorization_code'
  })
});
```

### Client Credentials Flow
OAuth 2.0 client credentials flow:

```javascript
const tokenResponse = await fetch('https://api.wp-llm.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
    grant_type: 'client_credentials'
  })
});
```

## **Enterprise Authentication**

### SAML Authentication
SAML-based enterprise authentication:

```json
{
  "saml_config": {
    "idp_entity_id": "https://your-idp.com",
    "sp_entity_id": "https://api.wp-llm.com",
    "acs_url": "https://api.wp-llm.com/saml/acs",
    "x509_cert": "your-certificate"
  }
}
```

### LDAP Authentication
LDAP integration for enterprise environments:

```json
{
  "ldap_config": {
    "server": "ldap://your-ldap-server.com",
    "base_dn": "dc=company,dc=com",
    "bind_dn": "cn=admin,dc=company,dc=com",
    "bind_password": "admin-password"
  }
}
```

## **Security Best Practices**

### API Key Security
Best practices for API key management:

- **Store securely**: Use environment variables or secure key management
- **Rotate regularly**: Change API keys periodically
- **Scope permissions**: Use least-privilege access
- **Monitor usage**: Track API key usage and anomalies

### HTTPS Requirements
All API requests must use HTTPS:

```bash
# ✅ Correct - HTTPS
curl https://api.wp-llm.com/v1/generate

# ❌ Incorrect - HTTP (will fail)
curl http://api.wp-llm.com/v1/generate
```

### IP Whitelisting
Restrict API access to specific IP addresses:

```json
{
  "ip_whitelist": [
    "192.168.1.0/24",
    "10.0.0.0/8",
    "172.16.0.0/12"
  ]
}
```

## **Testing Authentication**

### Health Check
Test authentication with health check endpoint:

```bash
curl -X GET https://api.wp-llm.com/v1/health \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Token Validation
Validate JWT tokens:

```bash
curl -X POST https://api.wp-llm.com/v1/auth/validate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

**Need help with authentication?** Check the [API Reference](api-reference) for complete endpoint documentation, or contact support for enterprise authentication setup. 