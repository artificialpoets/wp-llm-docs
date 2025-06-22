---
id: api-endpoints
title: API Endpoints
description: Complete reference for all WP LLM API endpoints including text generation, code analysis, block generation, and model management.
keywords: [WP LLM API endpoints, REST API, text generation, code analysis, block generation, model management]
---

# 🔌 API Endpoints

Complete reference for all WP LLM API endpoints with detailed request/response formats and examples.

## **Text Generation Endpoints**

### POST /v1/generate
Generate WordPress code and text content:

**Request:**
```json
{
  "model": "wp-llm-13b",
  "prompt": "Create a custom post type for products",
  "max_tokens": 1000,
  "temperature": 0.7,
  "top_p": 0.9,
  "stream": false
}
```

**Response:**
```json
{
  "id": "gen_123456789",
  "object": "text_generation",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "choices": [
    {
      "index": 0,
      "text": "<?php\n/**\n * Register Products Custom Post Type\n */\nfunction register_products_post_type() {\n    $labels = array(\n        'name' => __('Products', 'text-domain'),\n        'singular_name' => __('Product', 'text-domain'),\n    );\n    \n    $args = array(\n        'labels' => $labels,\n        'public' => true,\n        'show_in_rest' => true,\n        'supports' => array('title', 'editor', 'thumbnail'),\n    );\n    \n    register_post_type('product', $args);\n}\nadd_action('init', 'register_products_post_type');",
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 150,
    "total_tokens": 160
  }
}
```

**Parameters:**
- `model` (string, required): Model to use for generation
- `prompt` (string, required): Input prompt for generation
- `max_tokens` (integer, optional): Maximum tokens to generate
- `temperature` (float, optional): Creativity level (0.0-2.0)
- `top_p` (float, optional): Nucleus sampling parameter
- `stream` (boolean, optional): Enable streaming response

### POST /v1/generate/stream
Stream generated content in real-time:

**Request:**
```json
{
  "model": "wp-llm-13b",
  "prompt": "Create a Gutenberg block",
  "max_tokens": 500,
  "stream": true
}
```

**Response (Stream):**
```json
{"id":"gen_123","object":"text_generation","created":1640995200,"model":"wp-llm-13b","choices":[{"index":0,"delta":{"text":"<?php"},"finish_reason":null}]}
{"id":"gen_123","object":"text_generation","created":1640995200,"model":"wp-llm-13b","choices":[{"index":0,"delta":{"text":"\n/**"},"finish_reason":null}]}
{"id":"gen_123","object":"text_generation","created":1640995200,"model":"wp-llm-13b","choices":[{"index":0,"delta":{"text":"\n * Gutenberg Block"},"finish_reason":null}]}
{"id":"gen_123","object":"text_generation","created":1640995200,"model":"wp-llm-13b","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}
```

## **Code Analysis Endpoints**

### POST /v1/analyze
Analyze WordPress code for security, performance, and quality:

**Request:**
```json
{
  "code": "<?php echo $_POST['data']; ?>",
  "analysis_type": "security",
  "model": "wp-llm-13b"
}
```

**Response:**
```json
{
  "id": "analysis_123456789",
  "object": "code_analysis",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "analysis_type": "security",
  "issues": [
    {
      "line": 1,
      "column": 1,
      "severity": "high",
      "type": "security_vulnerability",
      "message": "Direct output of user input without sanitization",
      "suggestion": "Use wp_kses_post() or esc_html() to sanitize output",
      "code_snippet": "echo $_POST['data'];"
    }
  ],
  "score": 2.5,
  "recommendations": [
    "Always sanitize user input before output",
    "Use WordPress sanitization functions",
    "Implement proper nonce verification"
  ]
}
```

**Parameters:**
- `code` (string, required): Code to analyze
- `analysis_type` (string, required): Type of analysis (security, performance, quality)
- `model` (string, optional): Model to use for analysis

### POST /v1/analyze/batch
Analyze multiple code files in batch:

**Request:**
```json
{
  "files": [
    {
      "name": "plugin.php",
      "content": "<?php echo $_POST['data']; ?>"
    },
    {
      "name": "functions.php",
      "content": "<?php function test() { return 'test'; } ?>"
    }
  ],
  "analysis_type": "security"
}
```

**Response:**
```json
{
  "id": "batch_analysis_123456789",
  "object": "batch_analysis",
  "created": 1640995200,
  "results": [
    {
      "file": "plugin.php",
      "issues": [
        {
          "line": 1,
          "severity": "high",
          "message": "Security vulnerability detected"
        }
      ],
      "score": 2.0
    },
    {
      "file": "functions.php",
      "issues": [],
      "score": 9.5
    }
  ],
  "summary": {
    "total_files": 2,
    "files_with_issues": 1,
    "total_issues": 1,
    "average_score": 5.75
  }
}
```

## **Block Development Endpoints**

### POST /v1/blocks/generate
Generate complete Gutenberg blocks:

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
  "features": [
    "server_side_rendering",
    "custom_controls",
    "responsive_design"
  ],
  "model": "wp-llm-13b"
}
```

**Response:**
```json
{
  "id": "block_gen_123456789",
  "object": "block_generation",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "block_type": "testimonial",
  "files": {
    "block_json": {
      "content": "{\n  \"apiVersion\": 2,\n  \"name\": \"your-theme/testimonial\",\n  \"title\": \"Testimonial\",\n  \"attributes\": {\n    \"clientName\": {\n      \"type\": \"string\"\n    },\n    \"company\": {\n      \"type\": \"string\"\n    },\n    \"rating\": {\n      \"type\": \"number\"\n    },\n    \"testimonial\": {\n      \"type\": \"string\"\n    }\n  }\n}",
      "filename": "block.json"
    },
    "editor_script": {
      "content": "// Editor script content...",
      "filename": "editor.js"
    },
    "render_callback": {
      "content": "<?php\nfunction render_testimonial_block($attributes) {\n    // Render callback content...\n}",
      "filename": "render.php"
    }
  },
  "instructions": "Place these files in your theme's blocks directory"
}
```

### POST /v1/blocks/analyze
Analyze existing Gutenberg blocks:

**Request:**
```json
{
  "block_code": "// Your block code here",
  "analysis_type": "performance",
  "model": "wp-llm-13b"
}
```

**Response:**
```json
{
  "id": "block_analysis_123456789",
  "object": "block_analysis",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "analysis_type": "performance",
  "issues": [
    {
      "type": "performance_issue",
      "message": "Block re-renders on every state change",
      "suggestion": "Use React.memo() to optimize re-renders"
    }
  ],
  "optimization_suggestions": [
    "Implement proper memoization",
    "Use CSS-in-JS for better performance",
    "Optimize attribute updates"
  ]
}
```

## **Plugin Development Endpoints**

### POST /v1/plugins/generate
Generate complete WordPress plugins:

**Request:**
```json
{
  "plugin_name": "Product Manager",
  "description": "Manage products with custom post types and REST API",
  "features": [
    "custom_post_type",
    "rest_api",
    "admin_interface",
    "meta_boxes"
  ],
  "model": "wp-llm-13b"
}
```

**Response:**
```json
{
  "id": "plugin_gen_123456789",
  "object": "plugin_generation",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "plugin_name": "Product Manager",
  "files": {
    "main_plugin": {
      "content": "<?php\n/*\nPlugin Name: Product Manager\nDescription: Manage products with custom post types and REST API\nVersion: 1.0.0\n*/\n\n// Main plugin content...",
      "filename": "product-manager.php"
    },
    "custom_post_type": {
      "content": "<?php\n// Custom post type registration...",
      "filename": "includes/post-types.php"
    },
    "rest_api": {
      "content": "<?php\n// REST API endpoints...",
      "filename": "includes/rest-api.php"
    }
  },
  "installation_instructions": "Upload the plugin files to wp-content/plugins/product-manager/"
}
```

### POST /v1/plugins/scaffold
Generate plugin scaffolding and structure:

**Request:**
```json
{
  "plugin_name": "My Plugin",
  "structure": "standard",
  "include_files": [
    "readme.txt",
    "uninstall.php",
    "languages/"
  ]
}
```

**Response:**
```json
{
  "id": "scaffold_123456789",
  "object": "plugin_scaffold",
  "created": 1640995200,
  "plugin_name": "My Plugin",
  "structure": {
    "main_file": "my-plugin.php",
    "includes_dir": "includes/",
    "assets_dir": "assets/",
    "languages_dir": "languages/",
    "readme_file": "readme.txt",
    "uninstall_file": "uninstall.php"
  },
  "files": {
    "main_file": {
      "content": "<?php\n/*\nPlugin Name: My Plugin\nDescription: Plugin description\nVersion: 1.0.0\n*/",
      "filename": "my-plugin.php"
    }
  }
}
```

## **Theme Development Endpoints**

### POST /v1/themes/generate
Generate WordPress themes:

**Request:**
```json
{
  "theme_name": "Modern Portfolio",
  "type": "block_theme",
  "features": [
    "custom_templates",
    "block_patterns",
    "theme_json",
    "responsive_design"
  ],
  "model": "wp-llm-13b"
}
```

**Response:**
```json
{
  "id": "theme_gen_123456789",
  "object": "theme_generation",
  "created": 1640995200,
  "model": "wp-llm-13b",
  "theme_name": "Modern Portfolio",
  "type": "block_theme",
  "files": {
    "style_css": {
      "content": "/*\nTheme Name: Modern Portfolio\nDescription: A modern portfolio theme\nVersion: 1.0.0\n*/",
      "filename": "style.css"
    },
    "theme_json": {
      "content": "{\n  \"version\": 2,\n  \"settings\": {\n    \"color\": {\n      \"palette\": [\n        {\n          \"slug\": \"primary\",\n          \"color\": \"#007cba\"\n        }\n      ]\n    }\n  }\n}",
      "filename": "theme.json"
    }
  }
}
```

### POST /v1/themes/analyze
Analyze WordPress themes:

**Request:**
```json
{
  "theme_files": [
    {
      "name": "functions.php",
      "content": "<?php // Theme functions ?>"
    }
  ],
  "analysis_type": "performance"
}
```

**Response:**
```json
{
  "id": "theme_analysis_123456789",
  "object": "theme_analysis",
  "created": 1640995200,
  "analysis_type": "performance",
  "results": [
    {
      "file": "functions.php",
      "issues": [],
      "score": 9.0
    }
  ]
}
```

## **Model Management Endpoints**

### GET /v1/models
List available models:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "wp-llm-7b",
      "object": "model",
      "created": 1640995200,
      "owned_by": "wp-llm",
      "permission": [
        {
          "id": "perm_123456789",
          "object": "model_permission",
          "created": 1640995200,
          "allow_create_engine": false,
          "allow_sampling": true,
          "allow_logprobs": true,
          "allow_search_indices": false,
          "allow_view": true,
          "allow_fine_tuning": false,
          "organization": "*",
          "group": null,
          "is_blocking": false
        }
      ],
      "root": "wp-llm-7b",
      "parent": null
    },
    {
      "id": "wp-llm-13b",
      "object": "model",
      "created": 1640995200,
      "owned_by": "wp-llm",
      "permission": [
        {
          "id": "perm_123456790",
          "object": "model_permission",
          "created": 1640995200,
          "allow_create_engine": false,
          "allow_sampling": true,
          "allow_logprobs": true,
          "allow_search_indices": false,
          "allow_view": true,
          "allow_fine_tuning": false,
          "organization": "*",
          "group": null,
          "is_blocking": false
        }
      ],
      "root": "wp-llm-13b",
      "parent": null
    }
  ]
}
```

### GET Model by ID
Get specific model information:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/models/wp-llm-13b \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "wp-llm-13b",
  "object": "model",
  "created": 1640995200,
  "owned_by": "wp-llm",
  "permission": [
    {
      "id": "perm_123456790",
      "object": "model_permission",
      "created": 1640995200,
      "allow_create_engine": false,
      "allow_sampling": true,
      "allow_logprobs": true,
      "allow_search_indices": false,
      "allow_view": true,
      "allow_fine_tuning": false,
      "organization": "*",
      "group": null,
      "is_blocking": false
    }
  ],
  "root": "wp-llm-13b",
  "parent": null,
  "specifications": {
    "parameters": "13 billion",
    "context_window": "8192 tokens",
    "training_data": "WordPress ecosystem",
    "specialization": "WordPress development"
  }
}
```

## **Fine-tuning Endpoints**

### POST /v1/fine-tune
Create a fine-tuning job:

**Request:**
```json
{
  "training_file": "file_123456789",
  "validation_file": "file_123456790",
  "model": "wp-llm-13b",
  "hyperparameters": {
    "n_epochs": 3,
    "batch_size": 1,
    "learning_rate_multiplier": 0.1
  }
}
```

**Response:**
```json
{
  "id": "ft_123456789",
  "object": "fine_tuning.job",
  "created_at": 1640995200,
  "finished_at": null,
  "model": "wp-llm-13b",
  "fine_tuned_model": null,
  "organization_id": "org_123456789",
  "status": "validating_files",
  "validation_file": "file_123456790",
  "training_file": "file_123456789",
  "hyperparameters": {
    "n_epochs": 3,
    "batch_size": 1,
    "learning_rate_multiplier": 0.1
  },
  "result_files": [],
  "trained_tokens": null
}
```

### GET /v1/fine-tune
List fine-tuning jobs:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/fine-tune \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "ft_123456789",
      "object": "fine_tuning.job",
      "created_at": 1640995200,
      "finished_at": null,
      "model": "wp-llm-13b",
      "fine_tuned_model": null,
      "organization_id": "org_123456789",
      "status": "running",
      "validation_file": "file_123456790",
      "training_file": "file_123456789",
      "hyperparameters": {
        "n_epochs": 3,
        "batch_size": 1,
        "learning_rate_multiplier": 0.1
      },
      "result_files": [],
      "trained_tokens": 1000
    }
  ]
}
```

### GET Fine-tuning Job Status
Get specific fine-tuning job status:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/fine-tune/ft_123456789 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "ft_123456789",
  "object": "fine_tuning.job",
  "created_at": 1640995200,
  "finished_at": 1640998800,
  "model": "wp-llm-13b",
  "fine_tuned_model": "wp-llm-13b:ft-org-123456789",
  "organization_id": "org_123456789",
  "status": "succeeded",
  "validation_file": "file_123456790",
  "training_file": "file_123456789",
  "hyperparameters": {
    "n_epochs": 3,
    "batch_size": 1,
    "learning_rate_multiplier": 0.1
  },
  "result_files": [
    "file_123456791"
  ],
  "trained_tokens": 1000
}
```

### Cancel Fine-tuning Job
Cancel a running fine-tuning job:

**Request:**
```bash
curl -X POST https://api.wp-llm.com/v1/fine-tune/ft_123456789/cancel \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "ft_123456789",
  "object": "fine_tuning.job",
  "created_at": 1640995200,
  "finished_at": 1640998800,
  "model": "wp-llm-13b",
  "fine_tuned_model": null,
  "organization_id": "org_123456789",
  "status": "cancelled",
  "validation_file": "file_123456790",
  "training_file": "file_123456789",
  "hyperparameters": {
    "n_epochs": 3,
    "batch_size": 1,
    "learning_rate_multiplier": 0.1
  },
  "result_files": [],
  "trained_tokens": 500
}
```

## **File Management Endpoints**

### POST /v1/files
Upload files for fine-tuning:

**Request:**
```bash
curl -X POST https://api.wp-llm.com/v1/files \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@training_data.jsonl" \
  -F "purpose=fine-tune"
```

**Response:**
```json
{
  "id": "file_123456789",
  "object": "file",
  "bytes": 12345,
  "created_at": 1640995200,
  "filename": "training_data.jsonl",
  "purpose": "fine-tune",
  "status": "uploaded",
  "status_details": null
}
```

### GET /v1/files
List uploaded files:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/files \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "file_123456789",
      "object": "file",
      "bytes": 12345,
      "created_at": 1640995200,
      "filename": "training_data.jsonl",
      "purpose": "fine-tune",
      "status": "processed",
      "status_details": null
    }
  ]
}
```

### GET File Information
Get specific file information:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/files/file_123456789 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "file_123456789",
  "object": "file",
  "bytes": 12345,
  "created_at": 1640995200,
  "filename": "training_data.jsonl",
  "purpose": "fine-tune",
  "status": "processed",
  "status_details": null
}
```

### Delete File
Delete an uploaded file:

**Request:**
```bash
curl -X DELETE https://api.wp-llm.com/v1/files/file_123456789 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "file_123456789",
  "object": "file",
  "deleted": true
}
```

## **Usage and Billing Endpoints**

### GET /v1/usage
Get API usage statistics:

**Request:**
```bash
curl -X GET "https://api.wp-llm.com/v1/usage?date=2024-01-01" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "usage",
  "daily_costs": [
    {
      "timestamp": 1640995200,
      "line_items": [
        {
          "name": "wp-llm-13b",
          "cost": 0.002
        }
      ]
    }
  ],
  "total_usage": 0.002
}
```

## **Billing Endpoints**

### GET /v1/billing/subscription
Get subscription information:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/billing/subscription \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "subscription",
  "id": "sub_123456789",
  "status": "active",
  "current_period_start": 1640995200,
  "current_period_end": 1643587200,
  "plan": {
    "id": "pro",
    "name": "Professional",
    "price": 29.99,
    "currency": "usd",
    "interval": "month"
  },
  "usage": {
    "tokens_used": 1000000,
    "tokens_limit": 10000000
  }
}
```

### POST /v1/billing/subscription
Update subscription:

**Request:**
```json
{
  "plan": "enterprise",
  "payment_method": "pm_123456789"
}
```

**Response:**
```json
{
  "object": "subscription",
  "id": "sub_123456789",
  "status": "active",
  "plan": {
    "id": "enterprise",
    "name": "Enterprise",
    "price": 99.99,
    "currency": "usd",
    "interval": "month"
  }
}
```

## **Webhook Endpoints**

### POST /v1/webhooks
Create a webhook:

**Request:**
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["generation.completed", "analysis.completed"],
  "description": "Webhook for generation events"
}
```

**Response:**
```json
{
  "id": "webhook_123456789",
  "object": "webhook",
  "url": "https://your-domain.com/webhook",
  "events": ["generation.completed", "analysis.completed"],
  "status": "active",
  "created_at": 1640995200,
  "secret": "whsec_123456789"
}
```

### GET /v1/webhooks
List webhooks:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "id": "webhook_123456789",
      "object": "webhook",
      "url": "https://your-domain.com/webhook",
      "events": ["generation.completed"],
      "status": "active",
      "created_at": 1640995200
    }
  ]
}
```

### Delete Webhook
Delete a webhook:

**Request:**
```bash
curl -X DELETE https://api.wp-llm.com/v1/webhooks/webhook_123456789 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": "webhook_123456789",
  "object": "webhook",
  "deleted": true
}
```

## **System Endpoints**

### GET /v1/health
Health check endpoint:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": 1640995200,
  "version": "1.0.0",
  "services": {
    "generation": "healthy",
    "analysis": "healthy",
    "models": "healthy"
  }
}
```

### GET /v1/status
System status endpoint:

**Request:**
```bash
curl -X GET https://api.wp-llm.com/v1/status
```

**Response:**
```json
{
  "status": "operational",
  "timestamp": 1640995200,
  "uptime": 99.9,
  "response_time": 150,
  "active_requests": 1250,
  "queue_size": 50
}
```

---

**Need help with specific endpoints?** Check the [Authentication](authentication) guide for setup instructions, or review [Error Handling](errors) for troubleshooting. 