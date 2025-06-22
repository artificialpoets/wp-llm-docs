---
id: cursor-ide
title: Cursor IDE Integration
sidebar_label: Cursor IDE
description: Complete guide for integrating WP LLM with Cursor IDE for enhanced WordPress development
keywords: [cursor, ide, integration, development, workflow]
---

# Cursor IDE Integration

Complete guide for integrating WP LLM with Cursor IDE to enhance your WordPress development workflow with AI-powered code generation and assistance.

## **Overview**

Cursor IDE integration with WP LLM provides seamless AI assistance for WordPress development, including code generation, debugging, and optimization directly within your development environment.

<MermaidDiagram chart={`
graph TD
    A[Cursor IDE] --> B[WP LLM Extension]
    B --> C[Code Generation]
    B --> D[Code Analysis]
    B --> E[Debugging Assistance]
    
    C --> F[Custom Post Types]
    C --> G[Gutenberg Blocks]
    C --> H[Plugin Development]
    
    D --> I[Security Analysis]
    D --> J[Performance Optimization]
    D --> K[Code Quality]
    
    E --> L[Error Detection]
    E --> M[Solution Suggestions]
    E --> N[Best Practices]
    
    F --> O[PHP Code]
    G --> P[React Components]
    H --> Q[Plugin Architecture]
`} />

## **Installation**

### **Prerequisites**

- Cursor IDE installed
- WP LLM API key
- Node.js 18+ (for extension development)

### **Installation Steps**

1. **Install WP LLM Extension**
   ```bash
   # Clone the extension repository
   git clone https://github.com/wp-llm/cursor-extension.git
   cd cursor-extension
   
   # Install dependencies
   npm install
   
   # Build the extension
   npm run build
   ```

2. **Configure API Key**
   ```json
   // .cursor/settings.json
   {
     "wp-llm.apiKey": "your-api-key-here",
     "wp-llm.model": "wp-llm-13b",
     "wp-llm.maxTokens": 2048,
     "wp-llm.temperature": 0.7
   }
   ```

3. **Enable Extension**
   - Open Cursor IDE
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "WP LLM"
   - Click Install and Enable

## **Features**

### **Code Generation**

**Inline Code Generation:**
```php
// Type: "Generate a custom post type for testimonials"
// Press Ctrl+Shift+L to generate code
function register_testimonial_post_type() {
    $labels = array(
        'name' => 'Testimonials',
        'singular_name' => 'Testimonial',
        'add_new' => 'Add New Testimonial',
        'add_new_item' => 'Add New Testimonial',
        'edit_item' => 'Edit Testimonial',
        'new_item' => 'New Testimonial',
        'view_item' => 'View Testimonial',
        'search_items' => 'Search Testimonials',
        'not_found' => 'No testimonials found',
        'not_found_in_trash' => 'No testimonials found in trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'testimonial'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 5,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt')
    );

    register_post_type('testimonial', $args);
}
```

**Block Generation:**
```javascript
// Type: "Create a testimonial block with client name, company, and rating"
// Press Ctrl+Shift+B to generate block
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType('wp-llm/testimonial', {
    apiVersion: 2,
    title: 'Testimonial',
    icon: 'format-quote',
    category: 'widgets',
    attributes: {
        clientName: {
            type: 'string',
            default: ''
        },
        company: {
            type: 'string',
            default: ''
        },
        rating: {
            type: 'number',
            default: 5
        },
        testimonial: {
            type: 'string',
            default: ''
        }
    },
    edit: function(props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <RichText
                    tagName="blockquote"
                    value={attributes.testimonial}
                    onChange={(testimonial) => setAttributes({ testimonial })}
                    placeholder="Enter testimonial text..."
                />
                <div className="testimonial-meta">
                    <RichText
                        tagName="strong"
                        value={attributes.clientName}
                        onChange={(clientName) => setAttributes({ clientName })}
                        placeholder="Client name"
                    />
                    <RichText
                        tagName="span"
                        value={attributes.company}
                        onChange={(company) => setAttributes({ company })}
                        placeholder="Company"
                    />
                </div>
            </div>
        );
    },
    save: function(props) {
        const { attributes } = props;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <blockquote>{attributes.testimonial}</blockquote>
                <div className="testimonial-meta">
                    <strong>{attributes.clientName}</strong>
                    <span>{attributes.company}</span>
                </div>
            </div>
        );
    }
});
```

### **Code Analysis**

**Security Analysis:**
```php
// WP LLM will analyze this code and highlight security issues
function process_user_data() {
    $user_input = $_POST['data']; // ⚠️ Security issue detected
    echo $user_input; // ⚠️ XSS vulnerability
    
    // Suggested fix:
    $user_input = sanitize_text_field($_POST['data']);
    echo esc_html($user_input);
}
```

**Performance Analysis:**
```php
// WP LLM will suggest performance improvements
function get_posts_with_meta() {
    $posts = get_posts(array(
        'post_type' => 'post',
        'posts_per_page' => -1 // ⚠️ Performance issue: no limit
    ));
    
    foreach($posts as $post) {
        $meta = get_post_meta($post->ID, 'custom_field', true); // ⚠️ N+1 query problem
    }
    
    // Suggested optimization:
    $posts = get_posts(array(
        'post_type' => 'post',
        'posts_per_page' => 10,
        'meta_query' => array(
            array(
                'key' => 'custom_field',
                'compare' => 'EXISTS'
            )
        )
    ));
}
```

### **Debugging Assistance**

**Error Detection:**
```php
// WP LLM will detect and explain errors
function my_function() {
    $result = wp_insert_post($post_data); // ⚠️ $post_data not defined
    
    if ($result) {
        echo "Post created successfully";
    } else {
        echo "Error creating post"; // ⚠️ No error details
    }
}

// Suggested fix:
function my_function() {
    $post_data = array(
        'post_title' => 'My Post',
        'post_content' => 'Post content',
        'post_status' => 'publish'
    );
    
    $result = wp_insert_post($post_data);
    
    if (is_wp_error($result)) {
        echo "Error: " . $result->get_error_message();
    } else {
        echo "Post created successfully with ID: " . $result;
    }
}
```

## **Configuration**

### **Extension Settings**

```json
{
  "wp-llm.apiKey": "your-api-key-here",
  "wp-llm.model": "wp-llm-13b",
  "wp-llm.maxTokens": 2048,
  "wp-llm.temperature": 0.7,
  "wp-llm.enableAutoComplete": true,
  "wp-llm.enableCodeAnalysis": true,
  "wp-llm.enableDebugging": true,
  "wp-llm.wordpressVersion": "6.4",
  "wp-llm.theme": "twentytwentyfive",
  "wp-llm.plugins": ["woocommerce", "yoast-seo"]
}
```

### **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+L | Generate code from comment |
| Ctrl+Shift+B | Generate Gutenberg block |
| Ctrl+Shift+A | Analyze current file |
| Ctrl+Shift+D | Debug current function |
| Ctrl+Shift+O | Optimize performance |
| Ctrl+Shift+S | Security analysis |

### **Context Configuration**

**Project-specific Settings:**
```json
// .cursor/project-settings.json
{
  "wp-llm": {
    "projectType": "plugin",
    "wordpressVersion": "6.4",
    "phpVersion": "8.1",
    "codingStandards": "WordPress",
    "securityLevel": "high",
    "performanceFocus": true
  }
}
```

## **Workflow Integration**

### **Development Workflow**

1. **Project Setup**
   ```bash
   # Initialize WordPress project
   wp-llm init-project --type plugin --name my-plugin
   
   # Generate basic structure
   wp-llm generate-structure
   ```

2. **Feature Development**
   ```php
   // 1. Define requirements in comment
   // Create a custom post type for products with:
   // - Title, description, price fields
   // - Category taxonomy
   // - REST API support
   // - Admin columns
   
   // 2. Generate code (Ctrl+Shift+L)
   // 3. Review and modify generated code
   // 4. Test functionality
   // 5. Optimize performance (Ctrl+Shift+O)
   ```

3. **Code Review**
   ```bash
   # Run security analysis
   wp-llm analyze --security
   
   # Run performance analysis
   wp-llm analyze --performance
   
   # Run code quality check
   wp-llm analyze --quality
   ```

### **Testing Integration**

**Unit Test Generation:**
```php
// Type: "Generate unit tests for this function"
// Press Ctrl+Shift+T
class TestMyPlugin extends WP_UnitTestCase {
    public function test_register_product_post_type() {
        // Test post type registration
        $post_types = get_post_types();
        $this->assertArrayHasKey('product', $post_types);
        
        // Test post type properties
        $post_type_object = get_post_type_object('product');
        $this->assertEquals('Products', $post_type_object->labels->name);
        $this->assertTrue($post_type_object->public);
    }
}
```

**Integration Test Generation:**
```php
// Type: "Generate integration tests for REST API"
// Press Ctrl+Shift+I
class TestProductAPI extends WP_Test_REST_TestCase {
    public function test_create_product() {
        $request = new WP_REST_Request('POST', '/wp/v2/product');
        $request->set_param('title', 'Test Product');
        $request->set_param('content', 'Product description');
        $request->set_param('price', 29.99);
        
        $response = rest_do_request($request);
        $this->assertEquals(201, $response->get_status());
        
        $data = $response->get_data();
        $this->assertEquals('Test Product', $data['title']['rendered']);
    }
}
```

## **Advanced Features**

### **Custom Prompts**

**Create Custom Prompt Templates:**
```json
// .cursor/prompts.json
{
  "custom-post-type": {
    "prompt": "Create a custom post type for {post_type} with fields: {fields}. Include REST API support and admin columns.",
    "variables": ["post_type", "fields"]
  },
  "gutenberg-block": {
    "prompt": "Create a Gutenberg block for {block_name} with attributes: {attributes}. Include editor and frontend styles.",
    "variables": ["block_name", "attributes"]
  },
  "rest-api": {
    "prompt": "Create a REST API endpoint for {endpoint} with CRUD operations. Include validation and error handling.",
    "variables": ["endpoint"]
  }
}
```

**Use Custom Prompts:**
```php
// Type: "custom-post-type: testimonials, client_name company rating"
// This will use the custom prompt template
```

### **Code Templates**

**Create Reusable Templates:**
```php
// .cursor/templates/plugin-header.php
<?php
/**
 * Plugin Name: {plugin_name}
 * Plugin URI: {plugin_uri}
 * Description: {description}
 * Version: {version}
 * Author: {author}
 * License: {license}
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('{PLUGIN_NAME}_VERSION', '{version}');
define('{PLUGIN_NAME}_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('{PLUGIN_NAME}_PLUGIN_URL', plugin_dir_url(__FILE__));

// Initialize plugin
function {plugin_name}_init() {
    // Plugin initialization code
}
add_action('init', '{plugin_name}_init');
```

### **Snippets**

**Create Code Snippets:**
```json
// .cursor/snippets.json
{
  "wp-hook": {
    "prefix": "wphook",
    "body": [
      "add_action('${1:hook_name}', '${2:function_name}');"
    ],
    "description": "WordPress action hook"
  },
  "wp-filter": {
    "prefix": "wpfilter",
    "body": [
      "add_filter('${1:filter_name}', '${2:function_name}');"
    ],
    "description": "WordPress filter hook"
  },
  "wp-query": {
    "prefix": "wpquery",
    "body": [
      "$query = new WP_Query(array(",
      "    'post_type' => '${1:post}',",
      "    'posts_per_page' => ${2:10},",
      "    'post_status' => '${3:publish}'",
      "));"
    ],
    "description": "WordPress query"
  }
}
```

## **Troubleshooting**

### **Common Issues**

**Extension Not Loading:**
```bash
# Check extension status
cursor --list-extensions | grep wp-llm

# Reinstall extension
cursor --uninstall-extension wp-llm
cursor --install-extension wp-llm

# Check logs
tail -f ~/.cursor/logs/extension-host.log
```

**API Key Issues:**
```bash
# Verify API key
curl -H "Authorization: Bearer your-api-key" \
     https://api.wp-llm.com/v1/models

# Update API key in settings
# File: .cursor/settings.json
{
  "wp-llm.apiKey": "new-api-key-here"
}
```

**Performance Issues:**
```json
// Optimize settings for better performance
{
  "wp-llm.maxTokens": 1024,
  "wp-llm.temperature": 0.3,
  "wp-llm.enableAutoComplete": false,
  "wp-llm.cacheResponses": true
}
```

### **Debug Mode**

**Enable Debug Logging:**
```json
{
  "wp-llm.debug": true,
  "wp-llm.logLevel": "verbose",
  "wp-llm.logFile": "~/.cursor/logs/wp-llm.log"
}
```

**Debug Commands:**
```bash
# Test API connection
wp-llm test-connection

# Check extension health
wp-llm health-check

# Reset extension settings
wp-llm reset-settings
```

## **Best Practices**

### **Efficient Usage**

1. **Use Specific Prompts**: Be clear and specific about what you want to generate
2. **Review Generated Code**: Always review and test generated code before using in production
3. **Iterate and Refine**: Use the generated code as a starting point and refine as needed
4. **Maintain Context**: Keep related code in the same file for better context

### **Security Considerations**

1. **API Key Security**: Never commit API keys to version control
2. **Code Review**: Always review generated code for security issues
3. **Input Validation**: Ensure generated code includes proper input validation
4. **Output Escaping**: Verify generated code includes proper output escaping

### **Performance Optimization**

1. **Limit Token Usage**: Use appropriate max_tokens settings
2. **Cache Responses**: Enable response caching for repeated requests
3. **Batch Requests**: Combine related requests when possible
4. **Optimize Prompts**: Use concise, focused prompts

---

**Related Documentation:**
- [VS Code Integration](./vs-code.md)
- [WP-CLI Integration](./wp-cli.md)
- [API Reference](../api-reference.md)
- [Advanced Usage](../advanced-usage.md) 