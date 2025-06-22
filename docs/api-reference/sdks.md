---
id: api-sdks
title: SDKs & Libraries
description: Official and community SDKs for integrating WP LLM into your applications. Support for JavaScript, PHP, Python, Go, Rust, and C#.
keywords: [WP LLM SDKs, JavaScript SDK, PHP SDK, Python SDK, Go SDK, Rust SDK, C# SDK, API libraries]
---

# 📚 SDKs & Libraries

Official and community SDKs for integrating WP LLM into your applications with comprehensive language support and advanced features.

## **Available SDKs**

### JavaScript/TypeScript SDK
Official JavaScript/TypeScript SDK with full TypeScript support:

**Installation:**
```bash
npm install @wp-llm/sdk
# or
yarn add @wp-llm/sdk
```

**Basic Usage:**
```javascript
import { WPLLM } from '@wp-llm/sdk';

const client = new WPLLM({
  apiKey: 'your-api-key',
  baseURL: 'https://api.wp-llm.com'
});

// Generate WordPress code
const response = await client.generate({
  prompt: 'Create a custom post type for products',
  model: 'wp-llm-13b',
  maxTokens: 1000
});

console.log(response.choices[0].text);
```

**Advanced Features:**
```javascript
// Streaming responses
const stream = await client.generateStream({
  prompt: 'Create a Gutenberg block',
  onChunk: (chunk) => {
    console.log('Received chunk:', chunk);
  }
});

// Batch processing
const batchResponse = await client.generateBatch([
  { prompt: 'Create custom post type' },
  { prompt: 'Create REST API endpoint' },
  { prompt: 'Create Gutenberg block' }
]);

// Code analysis
const analysis = await client.analyze({
  code: 'your-php-code-here',
  analysisType: 'security'
});
```

**TypeScript Support:**
```typescript
import { WPLLM, GenerateRequest, GenerateResponse } from '@wp-llm/sdk';

const client = new WPLLM({
  apiKey: process.env.WP_LLM_API_KEY!
});

async function generateWordPressCode(prompt: string): Promise<string> {
  const request: GenerateRequest = {
    prompt,
    model: 'wp-llm-13b',
    maxTokens: 1000,
    temperature: 0.7
  };

  const response: GenerateResponse = await client.generate(request);
  return response.choices[0].text;
}
```

### PHP SDK
Official PHP SDK for WordPress development:

**Installation:**
```bash
composer require wp-llm/php-sdk
```

**Basic Usage:**
```php
<?php
use WPLLM\Client;

$client = new Client([
    'api_key' => 'your-api-key',
    'base_url' => 'https://api.wp-llm.com'
]);

// Generate WordPress code
$response = $client->generate([
    'prompt' => 'Create a custom post type for products',
    'model' => 'wp-llm-13b',
    'max_tokens' => 1000
]);

echo $response['choices'][0]['text'];
```

**WordPress Integration:**
```php
<?php
// WordPress plugin integration
class WP_LLM_Integration {
    private $client;

    public function __construct() {
        $this->client = new \WPLLM\Client([
            'api_key' => get_option('wp_llm_api_key'),
            'base_url' => 'https://api.wp-llm.com'
        ]);
    }

    public function generate_custom_post_type($post_type_name) {
        $prompt = "Create a custom post type for '{$post_type_name}' with proper WordPress standards";
        
        $response = $this->client->generate([
            'prompt' => $prompt,
            'model' => 'wp-llm-13b'
        ]);

        return $response['choices'][0]['text'];
    }

    public function analyze_plugin_code($plugin_file) {
        $code = file_get_contents($plugin_file);
        
        $analysis = $this->client->analyze([
            'code' => $code,
            'analysis_type' => 'security'
        ]);

        return $analysis;
    }
}
```

**Advanced Features:**
```php
<?php
// Streaming responses
$stream = $client->generateStream([
    'prompt' => 'Create a Gutenberg block',
    'on_chunk' => function($chunk) {
        echo "Received: " . $chunk['text'] . "\n";
    }
]);

// Batch processing
$batch = $client->generateBatch([
    ['prompt' => 'Create custom post type'],
    ['prompt' => 'Create REST API endpoint'],
    ['prompt' => 'Create Gutenberg block']
]);

// Error handling
try {
    $response = $client->generate(['prompt' => 'test']);
} catch (\WPLLM\Exceptions\AuthenticationException $e) {
    error_log('Authentication failed: ' . $e->getMessage());
} catch (\WPLLM\Exceptions\RateLimitException $e) {
    error_log('Rate limit exceeded: ' . $e->getRetryAfter());
}
```

### Python SDK
Official Python SDK with async support:

**Installation:**
```bash
pip install wp-llm
```

**Basic Usage:**
```python
from wp_llm import Client

client = Client(
    api_key="your-api-key",
    base_url="https://api.wp-llm.com"
)

# Generate WordPress code
response = client.generate(
    prompt="Create a custom post type for products",
    model="wp-llm-13b",
    max_tokens=1000
)

print(response.choices[0].text)
```

**Async Support:**
```python
import asyncio
from wp_llm import AsyncClient

async def generate_code():
    client = AsyncClient(api_key="your-api-key")
    
    response = await client.generate(
        prompt="Create a Gutenberg block",
        model="wp-llm-13b"
    )
    
    return response.choices[0].text

# Run async function
result = asyncio.run(generate_code())
print(result)
```

**Advanced Features:**
```python
# Streaming responses
async def stream_response():
    client = AsyncClient(api_key="your-api-key")
    
    async for chunk in client.generate_stream(
        prompt="Create a REST API endpoint"
    ):
        print(f"Chunk: {chunk.text}")

# Batch processing
responses = client.generate_batch([
    {"prompt": "Create custom post type"},
    {"prompt": "Create REST API endpoint"},
    {"prompt": "Create Gutenberg block"}
])

# Code analysis
analysis = client.analyze(
    code="your-php-code-here",
    analysis_type="security"
)
```

### Go SDK
Official Go SDK for high-performance applications:

**Installation:**
```bash
go get github.com/wp-llm/go-sdk
```

**Basic Usage:**
```go
package main

import (
    "fmt"
    "log"
    "github.com/wp-llm/go-sdk"
)

func main() {
    client := wpllm.NewClient("your-api-key")
    
    response, err := client.Generate(wpllm.GenerateRequest{
        Prompt:     "Create a custom post type for products",
        Model:      "wp-llm-13b",
        MaxTokens:  1000,
    })
    
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Println(response.Choices[0].Text)
}
```

### Rust SDK
Official Rust SDK for systems programming:

**Installation:**
```toml
[dependencies]
wp-llm = "0.1.0"
```

**Basic Usage:**
```rust
use wp_llm::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("your-api-key");
    
    let response = client.generate(wp_llm::GenerateRequest {
        prompt: "Create a custom post type for products".to_string(),
        model: Some("wp-llm-13b".to_string()),
        max_tokens: Some(1000),
        ..Default::default()
    }).await?;
    
    println!("{}", response.choices[0].text);
    Ok(())
}
```

### C# SDK
Official C# SDK for .NET applications:

**Installation:**
```bash
dotnet add package WPLLM.SDK
```

**Basic Usage:**
```csharp
using WPLLM;

var client = new WPLLMClient("your-api-key");

var response = await client.GenerateAsync(new GenerateRequest
{
    Prompt = "Create a custom post type for products",
    Model = "wp-llm-13b",
    MaxTokens = 1000
});

Console.WriteLine(response.Choices[0].Text);
```

## **Common Features**

All SDKs provide consistent features:

- **Authentication**: API key and JWT token support
- **Error Handling**: Comprehensive error types and retry logic
- **Rate Limiting**: Automatic rate limit handling
- **Streaming**: Real-time response streaming
- **Batch Processing**: Multiple requests in single call
- **Type Safety**: Full type definitions and validation

### Language-Specific Features

Each SDK includes language-specific optimizations:

- **JavaScript**: Promise-based, TypeScript support, browser compatibility
- **PHP**: WordPress integration, Composer support, PSR standards
- **Python**: Async/await support, Jupyter notebook integration
- **Go**: High performance, goroutine support, minimal dependencies
- **Rust**: Memory safety, zero-cost abstractions, async runtime
- **C#**: .NET integration, LINQ support, async/await patterns

## **WordPress Plugin Development**

### JavaScript SDK Integration
Integrate WP LLM into WordPress plugins:

```javascript
// WordPress plugin with WP LLM integration
class WPLLMPlugin {
    constructor() {
        this.client = new WPLLM({
            apiKey: wp_llm_settings.api_key
        });
    }

    async generateCustomPostType(name, fields) {
        const prompt = `Create a custom post type for '${name}' with fields: ${fields.join(', ')}`;
        
        const response = await this.client.generate({
            prompt,
            model: 'wp-llm-13b'
        });

        return response.choices[0].text;
    }

    async generateGutenbergBlock(blockName, attributes) {
        const prompt = `Create a Gutenberg block called '${blockName}' with attributes: ${JSON.stringify(attributes)}`;
        
        const response = await this.client.generate({
            prompt,
            model: 'wp-llm-13b'
        });

        return response.choices[0].text;
    }
}
```

### PHP SDK Integration
WordPress plugin with PHP SDK:

```php
<?php
/*
Plugin Name: WP LLM Integration
Description: Integrate WP LLM into WordPress development
Version: 1.0.0
*/

use WPLLM\Client;

class WP_LLM_WordPress_Integration {
    private $client;

    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('admin_menu', [$this, 'add_admin_menu']);
    }

    public function init() {
        $this->client = new Client([
            'api_key' => get_option('wp_llm_api_key'),
            'base_url' => 'https://api.wp-llm.com'
        ]);
    }

    public function generate_custom_post_type($name, $fields = []) {
        $prompt = "Create a custom post type for '{$name}'";
        if (!empty($fields)) {
            $prompt .= " with fields: " . implode(', ', $fields);
        }

        try {
            $response = $this->client->generate([
                'prompt' => $prompt,
                'model' => 'wp-llm-13b'
            ]);

            return $response['choices'][0]['text'];
        } catch (Exception $e) {
            error_log('WP LLM Error: ' . $e->getMessage());
            return false;
        }
    }
}

new WP_LLM_WordPress_Integration();
```

## **Automated Testing**

### JavaScript Testing
Automated testing with WP LLM:

```javascript
import { WPLLM } from '@wp-llm/sdk';

describe('WordPress Code Generation', () => {
    let client;

    beforeEach(() => {
        client = new WPLLM({
            apiKey: process.env.WP_LLM_API_KEY
        });
    });

    test('should generate valid custom post type', async () => {
        const response = await client.generate({
            prompt: 'Create a custom post type for "Products"',
            model: 'wp-llm-13b'
        });

        const code = response.choices[0].text;
        
        // Validate generated code
        expect(code).toContain('register_post_type');
        expect(code).toContain('product');
        expect(code).toContain('public');
    });

    test('should generate secure code', async () => {
        const response = await client.generate({
            prompt: 'Create a REST API endpoint with security',
            model: 'wp-llm-13b'
        });

        const code = response.choices[0].text;
        
        // Check for security measures
        expect(code).toContain('wp_verify_nonce');
        expect(code).toContain('sanitize_text_field');
        expect(code).toContain('current_user_can');
    });
});
```

### PHP Testing
PHP unit testing with WP LLM:

```php
<?php
use PHPUnit\Framework\TestCase;
use WPLLM\Client;

class WPLLMTest extends TestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = new Client([
            'api_key' => getenv('WP_LLM_API_KEY'),
            'base_url' => 'https://api.wp-llm.com'
        ]);
    }

    public function testGenerateCustomPostType()
    {
        $response = $this->client->generate([
            'prompt' => 'Create a custom post type for "Products"',
            'model' => 'wp-llm-13b'
        ]);

        $code = $response['choices'][0]['text'];
        
        $this->assertStringContainsString('register_post_type', $code);
        $this->assertStringContainsString('product', $code);
        $this->assertStringContainsString('public', $code);
    }

    public function testGenerateSecureCode()
    {
        $response = $this->client->generate([
            'prompt' => 'Create a REST API endpoint with security',
            'model' => 'wp-llm-13b'
        ]);

        $code = $response['choices'][0]['text'];
        
        $this->assertStringContainsString('wp_verify_nonce', $code);
        $this->assertStringContainsString('sanitize_text_field', $code);
        $this->assertStringContainsString('current_user_can', $code);
    }
}
```

## **CI/CD Integration**

### GitHub Actions
Automated testing and deployment:

```yaml
name: WP LLM Integration Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      env:
        WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
        
    - name: Generate documentation
      run: npm run generate-docs
      env:
        WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
```

### GitLab CI
GitLab CI/CD pipeline:

```yaml
stages:
  - test
  - generate
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm install
    - npm test
  variables:
    WP_LLM_API_KEY: $WP_LLM_API_KEY

generate:
  stage: generate
  image: node:18
  script:
    - npm install
    - npm run generate-code
  artifacts:
    paths:
      - generated/
  variables:
    WP_LLM_API_KEY: $WP_LLM_API_KEY

deploy:
  stage: deploy
  script:
    - echo "Deploying generated code"
  only:
    - main
```

## **Configuration Management**

### Environment Variables
Secure configuration management:

```bash
# .env file
WP_LLM_API_KEY=your-api-key
WP_LLM_BASE_URL=https://api.wp-llm.com
WP_LLM_MODEL=wp-llm-13b
WP_LLM_TIMEOUT=30000
```

### Configuration Files
SDK-specific configuration:

```javascript
// config/wp-llm.js
module.exports = {
  apiKey: process.env.WP_LLM_API_KEY,
  baseURL: process.env.WP_LLM_BASE_URL,
  model: process.env.WP_LLM_MODEL || 'wp-llm-13b',
  timeout: parseInt(process.env.WP_LLM_TIMEOUT) || 30000,
  retries: 3,
  rateLimit: {
    requests: 1000,
    window: 60000
  }
};
```

## **Error Handling Patterns**

### JavaScript Error Handling
Comprehensive error handling:

```javascript
class WPLLMErrorHandler {
    static async handleRequest(client, request) {
        try {
            return await client.generate(request);
        } catch (error) {
            switch (error.type) {
                case 'authentication_error':
                    console.error('Authentication failed:', error.message);
                    // Retry with new API key
                    break;
                    
                case 'rate_limit_error':
                    console.warn('Rate limited, waiting...');
                    await this.wait(error.details.retry_after);
                    return this.handleRequest(client, request);
                    
                case 'validation_error':
                    console.error('Invalid request:', error.details);
                    throw new Error('Invalid request parameters');
                    
                case 'server_error':
                    console.error('Server error:', error.message);
                    // Retry with exponential backoff
                    return this.retryWithBackoff(client, request);
                    
                default:
                    console.error('Unexpected error:', error);
                    throw error;
            }
        }
    }

    static async retryWithBackoff(client, request, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await client.generate(request);
            } catch (error) {
                if (error.type === 'server_error' && attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await this.wait(delay);
                    continue;
                }
                throw error;
            }
        }
    }

    static wait(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
}
```

## **Performance Optimization**

### Caching Strategies
Implement caching for better performance:

```javascript
class WPLLMCache {
    constructor() {
        this.cache = new Map();
        this.ttl = 3600000; // 1 hour
    }

    async get(key, generator) {
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.data;
        }

        const data = await generator();
        
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });

        return data;
    }

    async generateWithCache(client, prompt, options = {}) {
        const cacheKey = this.generateCacheKey(prompt, options);
        
        return this.get(cacheKey, () => 
            client.generate({ prompt, ...options })
        );
    }

    generateCacheKey(prompt, options) {
        return `wp-llm:${prompt}:${JSON.stringify(options)}`;
    }
}
```

---

**Ready to integrate WP LLM?** Choose your preferred SDK and start building with the [Quick Start Guide](getting-started/quick-start)! 