---
id: authentication
title: Authentication
sidebar_label: Authentication
description: Complete guide to WP LLM authentication methods and security
keywords: [authentication, api keys, security, jwt, oauth]
---

# Authentication

WP LLM provides multiple authentication methods to secure your API access and integrate with your existing systems.

## **API Key Authentication**

The primary authentication method for WP LLM is API key-based authentication.

### **Getting Your API Key**

1. **Sign Up**: Create an account at [wp-llm.com](https://wp-llm.com)
2. **Dashboard**: Navigate to your developer dashboard
3. **Generate Key**: Click "Generate API Key"
4. **Copy Key**: Store your key securely

### **Using API Keys**

**HTTP Header Method**
```bash
curl -X POST https://api.wp-llm.com/v1/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your prompt"}'
```

**JavaScript SDK**
```javascript
import { WPLLMClient } from '@wp-llm/sdk';

const client = new WPLLMClient('your-api-key-here');
```

**PHP SDK**
```php
use WPLLM\Client;

$client = new Client('your-api-key-here');
```

**Python SDK**
```python
from wp_llm import WPLLMClient

client = WPLLMClient(api_key="your-api-key-here")
```

## **JWT Token Authentication**

For enterprise applications, WP LLM supports JWT token authentication.

### **JWT Configuration**

```javascript
// Generate JWT token
const jwt = require('jsonwebtoken');

const payload = {
  user_id: 'user123',
  permissions: ['read', 'write'],
  exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
};

const token = jwt.sign(payload, 'your-secret-key', { algorithm: 'HS256' });

// Use JWT token
const client = new WPLLMClient({
  jwt: token,
  baseURL: 'https://api.wp-llm.com'
});
```

### **JWT Claims**

| Claim | Description | Required |
|-------|-------------|----------|
| `user_id` | Unique user identifier | Yes |
| `permissions` | Array of permissions | Yes |
| `exp` | Expiration time | Yes |
| `iat` | Issued at time | No |
| `iss` | Issuer | No |

## **OAuth 2.0 Integration**

WP LLM supports OAuth 2.0 for enterprise SSO integration.

### **OAuth Configuration**

```javascript
// OAuth 2.0 flow
const client = new WPLLMClient({
  oauth: {
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'https://your-app.com/callback',
    scope: 'read write'
  }
});

// Get authorization URL
const authUrl = client.getAuthorizationUrl();

// Handle callback
const token = await client.handleCallback(code);
```

### **Supported OAuth Providers**

- **Google Workspace**
- **Microsoft Azure AD**
- **Okta**
- **Auth0**
- **Custom OAuth servers**

## **Enterprise Authentication**

### **LDAP Integration**

```javascript
// LDAP configuration
const client = new WPLLMClient({
  ldap: {
    server: 'ldap://your-ldap-server.com',
    baseDN: 'dc=company,dc=com',
    username: 'service-account',
    password: 'service-password'
  }
});
```

### **SAML Integration**

```javascript
// SAML configuration
const client = new WPLLMClient({
  saml: {
    entryPoint: 'https://your-idp.com/sso',
    issuer: 'your-app-entity-id',
    cert: 'your-certificate',
    privateKey: 'your-private-key'
  }
});
```

## **Security Best Practices**

### **API Key Security**

1. **Never commit API keys to version control**
   ```bash
   # Use environment variables
   export WP_LLM_API_KEY="your-key"
   ```

2. **Rotate keys regularly**
   ```javascript
   // Check key expiration
   const keyInfo = await client.getKeyInfo();
   if (keyInfo.expiresAt < Date.now()) {
     // Rotate key
   }
   ```

3. **Use key scopes**
   ```javascript
   // Create scoped keys
   const scopedKey = await client.createScopedKey({
     permissions: ['read'],
     expiresIn: '1h'
   });
   ```

### **Rate Limiting**

```javascript
// Handle rate limits
const response = await client.generate({
  prompt: 'Your prompt'
}).catch(error => {
  if (error.code === 'rate_limit_exceeded') {
    const retryAfter = error.headers['retry-after'];
    setTimeout(() => {
      // Retry request
    }, retryAfter * 1000);
  }
});
```

### **Request Signing**

```javascript
// Sign requests for additional security
const crypto = require('crypto');

const timestamp = Date.now();
const signature = crypto
  .createHmac('sha256', 'your-secret')
  .update(`${timestamp}${JSON.stringify(payload)}`)
  .digest('hex');

const response = await fetch('/v1/generate', {
  headers: {
    'X-Timestamp': timestamp,
    'X-Signature': signature
  },
  body: JSON.stringify(payload)
});
```

## **Multi-Factor Authentication**

### **TOTP Setup**

```javascript
// Enable TOTP
const totpSecret = await client.enableTOTP();

// Verify TOTP
const isValid = await client.verifyTOTP(totpCode);
```

### **Hardware Security Keys**

```javascript
// Register security key
const challenge = await client.registerSecurityKey();

// Verify security key
const isValid = await client.verifySecurityKey(credential);
```

## **Audit Logging**

### **Enable Audit Logs**

```javascript
// Enable comprehensive logging
const client = new WPLLMClient({
  apiKey: 'your-key',
  auditLogging: {
    enabled: true,
    level: 'detailed',
    retention: '90d'
  }
});
```

### **Access Logs**

```javascript
// Get access logs
const logs = await client.getAccessLogs({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  userId: 'user123'
});
```

## **Error Handling**

### **Authentication Errors**

```javascript
try {
  const response = await client.generate({ prompt: 'Test' });
} catch (error) {
  switch (error.code) {
    case 'invalid_api_key':
      console.error('Invalid API key');
      break;
    case 'expired_token':
      console.error('Token expired');
      break;
    case 'insufficient_permissions':
      console.error('Insufficient permissions');
      break;
    default:
      console.error('Authentication error:', error.message);
  }
}
```

## **Testing Authentication**

### **Health Check**

```bash
# Test API key
curl -H "Authorization: Bearer YOUR_KEY" \
     https://api.wp-llm.com/v1/health
```

### **SDK Test**

```javascript
// Test client connection
const isConnected = await client.testConnection();
console.log('Connection status:', isConnected);
```

---

**Related Documentation:**
- [Quick Start](./quick-start.md)
- [API Reference](../api-reference.md)
- [Enterprise Features](enterprise/enterprise-overview)
- [Security Best Practices](../security-best-practices.md) 