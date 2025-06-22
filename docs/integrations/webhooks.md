---
id: webhooks
title: Webhooks
sidebar_label: Webhooks
keywords: [webhooks, integration, real-time, notifications, events]
description: Complete guide to WP LLM webhooks for real-time notifications and integrations
---

# Webhooks

Integrate WP LLM webhooks to receive real-time notifications about events and automate your workflows.

## **Overview**

WP LLM webhooks provide real-time notifications for:
- Code generation completion
- Analysis results
- Model training progress
- Usage alerts
- System events

<MermaidDiagram chart={`
graph TD
    A[WP LLM API] --> B[Webhook Event]
    B --> C[Your Server]
    C --> D[Process Event]
    D --> E[Update Database]
    D --> F[Send Notification]
    D --> G[Trigger Action]
    
    E --> H[User Dashboard]
    F --> I[Email/Slack]
    G --> J[CI/CD Pipeline]
`} />

## **Webhook Setup**

### **Create Webhook**

```bash
curl -X POST https://api.wp-llm.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhooks/wp-llm",
    "events": ["generation.completed", "analysis.completed"],
    "description": "Production webhook",
    "secret": "your-webhook-secret"
  }'
```

### **JavaScript SDK**

```javascript
import { WPLLMClient } from '@wp-llm/sdk';

const client = new WPLLMClient('your-api-key');

const webhook = await client.webhooks.create({
  url: 'https://your-domain.com/webhooks/wp-llm',
  events: ['generation.completed', 'analysis.completed'],
  description: 'Production webhook',
  secret: 'your-webhook-secret'
});

console.log('Webhook created:', webhook.id);
```

### **PHP SDK**

```php
use WPLLM\Client;

$client = new Client('your-api-key');

$webhook = $client->webhooks->create([
    'url' => 'https://your-domain.com/webhooks/wp-llm',
    'events' => ['generation.completed', 'analysis.completed'],
    'description' => 'Production webhook',
    'secret' => 'your-webhook-secret'
]);

echo 'Webhook created: ' . $webhook->id;
```

## **Event Types**

### **Generation Events**

| Event | Description | Payload |
|-------|-------------|---------|
| `generation.completed` | Code generation finished | Generation result |
| `generation.failed` | Generation failed | Error details |
| `generation.started` | Generation started | Request details |

### **Analysis Events**

| Event | Description | Payload |
|-------|-------------|---------|
| `analysis.completed` | Code analysis finished | Analysis results |
| `analysis.failed` | Analysis failed | Error details |

### **Model Events**

| Event | Description | Payload |
|-------|-------------|---------|
| `model.training.started` | Model training started | Training details |
| `model.training.completed` | Training completed | Model info |
| `model.training.failed` | Training failed | Error details |

### **Usage Events**

| Event | Description | Payload |
|-------|-------------|---------|
| `usage.limit_exceeded` | Rate limit exceeded | Usage details |
| `usage.quota_exceeded` | Monthly quota exceeded | Quota info |
| `usage.warning` | Usage warning | Warning details |

### **System Events**

| Event | Description | Payload |
|-------|-------------|---------|
| `system.maintenance` | System maintenance | Maintenance info |
| `system.update` | System update | Update details |

## **Webhook Payloads**

### **Generation Completed**

```json
{
  "id": "evt_123456789",
  "object": "event",
  "created": 1640995200,
  "type": "generation.completed",
  "data": {
    "id": "gen_123456789",
    "object": "text_generation",
    "created": 1640995200,
    "model": "wp-llm-13b",
    "prompt": "Create a custom post type for testimonials",
    "completion": "<?php\n// Register Custom Post Type for Testimonials\nfunction register_testimonial_post_type() {\n    // ... code\n}",
    "usage": {
      "prompt_tokens": 45,
      "completion_tokens": 234,
      "total_tokens": 279
    },
    "finish_reason": "stop"
  }
}
```

### **Analysis Completed**

```json
{
  "id": "evt_123456789",
  "object": "event",
  "created": 1640995200,
  "type": "analysis.completed",
  "data": {
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
      "Use WordPress nonces for form security"
    ]
  }
}
```

### **Usage Limit Exceeded**

```json
{
  "id": "evt_123456789",
  "object": "event",
  "created": 1640995200,
  "type": "usage.limit_exceeded",
  "data": {
    "limit": 100,
    "current_usage": 100,
    "reset_time": 1640995260,
    "retry_after": 60
  }
}
```

## **Webhook Endpoint Implementation**

### **Node.js/Express**

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

const WEBHOOK_SECRET = 'your-webhook-secret';

// Verify webhook signature
function verifySignature(payload, signature) {
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhooks/wp-llm', (req, res) => {
  const signature = req.headers['x-wp-llm-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifySignature(payload, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'generation.completed':
      handleGenerationCompleted(event.data);
      break;
    case 'analysis.completed':
      handleAnalysisCompleted(event.data);
      break;
    case 'usage.limit_exceeded':
      handleUsageLimitExceeded(event.data);
      break;
    default:
      console.log('Unknown event type:', event.type);
  }
  
  res.json({ received: true });
});

function handleGenerationCompleted(data) {
  console.log('Generation completed:', data.id);
  
  // Update database
  updateGenerationStatus(data.id, 'completed');
  
  // Send notification
  sendNotification('Code generation completed', data);
  
  // Trigger CI/CD
  triggerDeployment(data);
}

function handleAnalysisCompleted(data) {
  console.log('Analysis completed:', data.id);
  
  if (data.issues.length > 0) {
    // Create GitHub issue
    createGitHubIssue(data);
    
    // Send alert
    sendAlert('Security issues found', data);
  }
}

function handleUsageLimitExceeded(data) {
  console.log('Usage limit exceeded');
  
  // Send notification
  sendNotification('Rate limit exceeded', data);
  
  // Pause non-critical operations
  pauseNonCriticalOperations();
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### **PHP/Laravel**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class WebhookController extends Controller
{
    private $webhookSecret = 'your-webhook-secret';
    
    public function handle(Request $request)
    {
        // Verify signature
        $signature = $request->header('X-WP-LLM-Signature');
        $payload = $request->getContent();
        
        if (!$this->verifySignature($payload, $signature)) {
            return response()->json(['error' => 'Invalid signature'], 401);
        }
        
        $event = $request->all();
        
        switch ($event['type']) {
            case 'generation.completed':
                $this->handleGenerationCompleted($event['data']);
                break;
            case 'analysis.completed':
                $this->handleAnalysisCompleted($event['data']);
                break;
            case 'usage.limit_exceeded':
                $this->handleUsageLimitExceeded($event['data']);
                break;
            default:
                Log::info('Unknown event type: ' . $event['type']);
        }
        
        return response()->json(['received' => true]);
    }
    
    private function verifySignature($payload, $signature)
    {
        $expectedSignature = hash_hmac('sha256', $payload, $this->webhookSecret);
        return hash_equals($expectedSignature, $signature);
    }
    
    private function handleGenerationCompleted($data)
    {
        Log::info('Generation completed: ' . $data['id']);
        
        // Update database
        $this->updateGenerationStatus($data['id'], 'completed');
        
        // Send notification
        $this->sendNotification('Code generation completed', $data);
        
        // Trigger deployment
        $this->triggerDeployment($data);
    }
    
    private function handleAnalysisCompleted($data)
    {
        Log::info('Analysis completed: ' . $data['id']);
        
        if (!empty($data['issues'])) {
            // Create GitHub issue
            $this->createGitHubIssue($data);
            
            // Send alert
            $this->sendAlert('Security issues found', $data);
        }
    }
    
    private function handleUsageLimitExceeded($data)
    {
        Log::warning('Usage limit exceeded');
        
        // Send notification
        $this->sendNotification('Rate limit exceeded', $data);
        
        // Pause operations
        $this->pauseOperations();
    }
}
```

### **Python/Flask**

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

WEBHOOK_SECRET = 'your-webhook-secret'

def verify_signature(payload, signature):
    """Verify webhook signature"""
    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature)

@app.route('/webhooks/wp-llm', methods=['POST'])
def webhook():
    signature = request.headers.get('X-WP-LLM-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_signature(payload, signature):
        return jsonify({'error': 'Invalid signature'}), 401
    
    event = request.json
    
    if event['type'] == 'generation.completed':
        handle_generation_completed(event['data'])
    elif event['type'] == 'analysis.completed':
        handle_analysis_completed(event['data'])
    elif event['type'] == 'usage.limit_exceeded':
        handle_usage_limit_exceeded(event['data'])
    else:
        logging.info(f"Unknown event type: {event['type']}")
    
    return jsonify({'received': True})

def handle_generation_completed(data):
    logging.info(f"Generation completed: {data['id']}")
    
    # Update database
    update_generation_status(data['id'], 'completed')
    
    # Send notification
    send_notification('Code generation completed', data)
    
    # Trigger deployment
    trigger_deployment(data)

def handle_analysis_completed(data):
    logging.info(f"Analysis completed: {data['id']}")
    
    if data['issues']:
        # Create GitHub issue
        create_github_issue(data)
        
        # Send alert
        send_alert('Security issues found', data)

def handle_usage_limit_exceeded(data):
    logging.warning("Usage limit exceeded")
    
    # Send notification
    send_notification('Rate limit exceeded', data)
    
    # Pause operations
    pause_operations()

if __name__ == '__main__':
    app.run(port=3000)
```

## **Webhook Management**

### **List Webhooks**

```javascript
const webhooks = await client.webhooks.list();
console.log('Webhooks:', webhooks.data);
```

### **Get Webhook**

```javascript
const webhook = await client.webhooks.retrieve('webhook_123456789');
console.log('Webhook:', webhook);
```

### **Update Webhook**

```javascript
const updatedWebhook = await client.webhooks.update('webhook_123456789', {
  events: ['generation.completed', 'analysis.completed', 'usage.limit_exceeded'],
  description: 'Updated webhook'
});
```

### **Delete Webhook**

```javascript
await client.webhooks.del('webhook_123456789');
console.log('Webhook deleted');
```

### **Test Webhook**

```javascript
const testEvent = await client.webhooks.test('webhook_123456789', {
  type: 'generation.completed',
  data: {
    id: 'test_123',
    prompt: 'Test prompt',
    completion: 'Test completion'
  }
});
```

## **Security Best Practices**

### **Signature Verification**

Always verify webhook signatures to ensure requests come from WP LLM:

```javascript
function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### **Idempotency**

Handle duplicate events gracefully:

```javascript
const processedEvents = new Set();

function handleWebhook(event) {
  if (processedEvents.has(event.id)) {
    console.log('Event already processed:', event.id);
    return;
  }
  
  processedEvents.add(event.id);
  
  // Process event
  processEvent(event);
}
```

### **Rate Limiting**

Implement rate limiting for webhook endpoints:

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/webhooks/wp-llm', webhookLimiter);
```

### **Error Handling**

Implement proper error handling:

```javascript
app.post('/webhooks/wp-llm', async (req, res) => {
  try {
    // Verify signature
    if (!verifySignature(req.body, req.headers['x-wp-llm-signature'])) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Process event
    await processEvent(req.body);
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Return 200 to prevent retries for processing errors
    res.status(200).json({ 
      received: true, 
      error: 'Processing failed' 
    });
  }
});
```

## **Testing Webhooks**

### **Local Testing with ngrok**

```bash
# Install ngrok
npm install -g ngrok

# Start your webhook server
node webhook-server.js

# In another terminal, expose your local server
ngrok http 3000

# Use the ngrok URL in your webhook configuration
curl -X POST https://api.wp-llm.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-ngrok-url.ngrok.io/webhooks/wp-llm",
    "events": ["generation.completed"]
  }'
```

### **Webhook Testing Tools**

```javascript
// Test webhook locally
const testEvent = {
  id: 'evt_test_123',
  object: 'event',
  created: Date.now() / 1000,
  type: 'generation.completed',
  data: {
    id: 'gen_test_123',
    prompt: 'Test prompt',
    completion: 'Test completion'
  }
};

// Send test event to your endpoint
fetch('http://localhost:3000/webhooks/wp-llm', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-LLM-Signature': generateSignature(JSON.stringify(testEvent))
  },
  body: JSON.stringify(testEvent)
});
```

---

**Related Documentation:**
- [GitHub Actions Integration](./github-actions.md)
- [API Reference](../api-reference.md)
- [Authentication](../api-reference/authentication.md)
- [Error Handling](../api-reference/errors.md) 