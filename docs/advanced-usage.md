---
id: advanced-usage
title: Advanced Usage
description: Master advanced WP LLM techniques including prompt engineering, workflow integration, security best practices, and performance optimization for enterprise WordPress development.
keywords: [WP LLM advanced usage, prompt engineering, WordPress development, security best practices, performance optimization, enterprise development]
---

# 🚀 Advanced Usage Guide

Master advanced WP LLM techniques for enterprise-level WordPress development, including sophisticated prompt engineering, workflow integration, and production-ready code generation.

## **🎯 Advanced Prompt Engineering**

### Structured Prompts for Complex Tasks
Instead of simple requests, structure your prompts for complex WordPress development tasks:

**Template:**
```
Create a [component type] for [specific purpose] with the following requirements:
- Feature 1: [detailed description]
- Feature 2: [detailed description]
- Security: [specific security requirements]
- Performance: [performance considerations]
- Integration: [how it integrates with existing code]
```

**Example:**
```
Create a custom post type for 'Real Estate Properties' with the following requirements:
- Fields: price, bedrooms, bathrooms, square footage, location (address), property type
- Security: Proper sanitization, nonce verification, capability checks
- Performance: Optimized queries, caching support
- Integration: REST API endpoints, Gutenberg blocks, search functionality
- Additional: Image gallery support, virtual tour integration
```

### Multi-Step Generation Workflows
Break complex tasks into multiple steps:

**Step 1: Generate the core structure**
```bash
ollama run wp-llm "Create the basic structure for a real estate plugin with custom post type registration"
```

**Step 2: Add advanced features**
```bash
ollama run wp-llm "Add meta boxes and custom fields to the real estate post type for price, bedrooms, etc."
```

**Step 3: Create REST API endpoints**
```bash
ollama run wp-llm "Create REST API endpoints for the real estate properties with filtering and pagination"
```

**Step 4: Build Gutenberg blocks**
```bash
ollama run wp-llm "Create a property showcase Gutenberg block for displaying real estate listings"
```

### Context-Aware Prompts
Provide context about your specific WordPress setup:

```bash
ollama run wp-llm "Create a custom post type for 'Portfolio Projects' that works with:
- WordPress 6.4+
- Block theme (Twenty Twenty-Five)
- WooCommerce integration
- Custom user roles (client, designer)
- Multisite compatibility
- REST API v2 endpoints"
```

## **🔧 Integration with Development Workflows**

### IDE Integration
Integrate WP LLM into your development environment:

**VS Code Setup:**
1. Install the Ollama extension
2. Configure WP LLM as default model
3. Create custom snippets for common tasks

**Custom VS Code Snippets:**
```json
{
  "WP LLM Custom Post Type": {
    "prefix": "wp-cpt",
    "body": [
      "ollama run wp-llm \"Create a custom post type for '$1' with $2 fields\""
    ],
    "description": "Generate custom post type with WP LLM"
  },
  "WP LLM Gutenberg Block": {
    "prefix": "wp-block",
    "body": [
      "ollama run wp-llm \"Create a $1 Gutenberg block with $2 functionality\""
    ],
    "description": "Generate Gutenberg block with WP LLM"
  }
}
```

### Git Integration
Automate code generation in your Git workflow:

**Pre-commit Hook:**
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Generate documentation for new functions
if git diff --cached --name-only | grep -E '\.(php|js)$'; then
    echo "Generating documentation..."
    ollama run wp-llm "Generate PHPDoc comments for the functions in the staged PHP files"
fi
```

**Post-merge Hook:**
```bash
#!/bin/bash
# .git/hooks/post-merge

# Update changelog
ollama run wp-llm "Generate a changelog entry for the recent changes" >> CHANGELOG.md
```

### Continuous Integration
Integrate WP LLM into your CI/CD pipeline:

**GitHub Actions Example:**
```yaml
name: Generate WordPress Code
on:
  push:
    branches: [main]

jobs:
  generate-code:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Ollama
        run: |
          curl -fsSL https://ollama.ai/install.sh | sh
      - name: Download WP LLM
        run: ollama pull wp-llm
      - name: Generate API Documentation
        run: |
          ollama run wp-llm "Generate comprehensive API documentation for the plugin" > docs/api.md
      - name: Commit Generated Files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/api.md
          git commit -m "Update API documentation" || exit 0
          git push
```

## **🎨 Advanced Block Development**

### Dynamic Blocks with Server-Side Rendering
Create sophisticated Gutenberg blocks with dynamic content:

**Example Prompt:**
```
Create a dynamic testimonial block that:
- Fetches testimonials from a custom post type
- Supports filtering by category
- Includes pagination
- Has server-side rendering for SEO
- Supports custom styling options
- Includes proper error handling
```

**Generated Code Structure:**
```php
<?php
/**
 * Dynamic Testimonial Block
 */
function register_dynamic_testimonial_block() {
    register_block_type('your-theme/dynamic-testimonial', array(
        'attributes' => array(
            'category' => array(
                'type' => 'string',
                'default' => '',
            ),
            'postsPerPage' => array(
                'type' => 'number',
                'default' => 3,
            ),
            'showPagination' => array(
                'type' => 'boolean',
                'default' => false,
            ),
        ),
        'render_callback' => 'render_dynamic_testimonial_block',
        'editor_script' => 'dynamic-testimonial-editor',
        'style' => 'dynamic-testimonial-style',
    ));
}
add_action('init', 'register_dynamic_testimonial_block');

function render_dynamic_testimonial_block($attributes) {
    $category = isset($attributes['category']) ? sanitize_text_field($attributes['category']) : '';
    $posts_per_page = isset($attributes['postsPerPage']) ? absint($attributes['postsPerPage']) : 3;
    $show_pagination = isset($attributes['showPagination']) ? $attributes['showPagination'] : false;

    $args = array(
        'post_type' => 'testimonial',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
    );

    if (!empty($category)) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'testimonial_category',
                'field' => 'slug',
                'terms' => $category,
            ),
        );
    }

    $testimonials = new WP_Query($args);
    $output = '<div class="wp-block-dynamic-testimonial">';

    if ($testimonials->have_posts()) {
        while ($testimonials->have_posts()) {
            $testimonials->the_post();
            $client_name = get_post_meta(get_the_ID(), 'client_name', true);
            $client_position = get_post_meta(get_the_ID(), 'client_position', true);
            $rating = get_post_meta(get_the_ID(), 'rating', true);

            $output .= sprintf(
                '<div class="testimonial-item">
                    <div class="testimonial-content">%s</div>
                    <div class="testimonial-author">
                        <strong>%s</strong>
                        <span>%s</span>
                    </div>
                    <div class="testimonial-rating">%s</div>
                </div>',
                get_the_content(),
                esc_html($client_name),
                esc_html($client_position),
                generate_star_rating($rating)
            );
        }
    }

    $output .= '</div>';
    wp_reset_postdata();

    return $output;
}

function generate_star_rating($rating) {
    $stars = '';
    for ($i = 1; $i <= 5; $i++) {
        $stars .= $i <= $rating ? '★' : '☆';
    }
    return '<span class="stars">' . $stars . '</span>';
}
```

### Block Variations and Transforms
Create blocks with multiple variations and transformation capabilities:

**Example:**
```php
<?php
/**
 * Advanced Button Block with Variations
 */
function register_advanced_button_block() {
    register_block_type('your-theme/advanced-button', array(
        'attributes' => array(
            'text' => array(
                'type' => 'string',
                'default' => 'Click Me',
            ),
            'url' => array(
                'type' => 'string',
                'default' => '#',
            ),
            'style' => array(
                'type' => 'string',
                'default' => 'primary',
            ),
            'size' => array(
                'type' => 'string',
                'default' => 'medium',
            ),
            'target' => array(
                'type' => 'string',
                'default' => '_self',
            ),
        ),
        'variations' => array(
            array(
                'name' => 'primary',
                'label' => 'Primary Button',
                'attributes' => array(
                    'style' => 'primary',
                ),
            ),
            array(
                'name' => 'secondary',
                'label' => 'Secondary Button',
                'attributes' => array(
                    'style' => 'secondary',
                ),
            ),
            array(
                'name' => 'cta',
                'label' => 'Call to Action',
                'attributes' => array(
                    'style' => 'cta',
                    'size' => 'large',
                ),
            ),
        ),
        'transforms' => array(
            'from' => array(
                array(
                    'type' => 'block',
                    'blocks' => array('core/button'),
                    'transform' => function($attributes, $content) {
                        return create_block('your-theme/advanced-button', array(
                            'text' => $attributes['text'] ?? 'Click Me',
                            'url' => $attributes['url'] ?? '#',
                        ));
                    },
                ),
            ),
        ),
        'render_callback' => 'render_advanced_button_block',
    ));
}
add_action('init', 'register_advanced_button_block');
```

## **🔒 Security Best Practices**

### Advanced Sanitization Patterns
Implement comprehensive input sanitization:

```php
<?php
/**
 * Advanced Input Sanitization
 */
class WP_LLM_Sanitizer {
    
    /**
     * Sanitize complex form data
     */
    public static function sanitize_form_data($data) {
        if (!is_array($data)) {
            return array();
        }

        $sanitized = array();
        
        foreach ($data as $key => $value) {
            $key = sanitize_key($key);
            
            if (is_array($value)) {
                $sanitized[$key] = self::sanitize_form_data($value);
            } else {
                $sanitized[$key] = self::sanitize_field($key, $value);
            }
        }
        
        return $sanitized;
    }
    
    /**
     * Sanitize individual fields based on type
     */
    public static function sanitize_field($key, $value) {
        // Determine field type based on key or value
        $field_type = self::get_field_type($key, $value);
        
        switch ($field_type) {
            case 'email':
                return sanitize_email($value);
                
            case 'url':
                return esc_url_raw($value);
                
            case 'text':
                return sanitize_text_field($value);
                
            case 'textarea':
                return sanitize_textarea_field($value);
                
            case 'number':
                return absint($value);
                
            case 'float':
                return floatval($value);
                
            case 'boolean':
                return (bool) $value;
                
            case 'date':
                return sanitize_text_field($value);
                
            case 'html':
                return wp_kses_post($value);
                
            default:
                return sanitize_text_field($value);
        }
    }
    
    /**
     * Determine field type based on key name or value
     */
    private static function get_field_type($key, $value) {
        $key_lower = strtolower($key);
        
        // Check key name for type indicators
        if (strpos($key_lower, 'email') !== false) return 'email';
        if (strpos($key_lower, 'url') !== false) return 'url';
        if (strpos($key_lower, 'phone') !== false) return 'text';
        if (strpos($key_lower, 'price') !== false) return 'float';
        if (strpos($key_lower, 'quantity') !== false) return 'number';
        if (strpos($key_lower, 'active') !== false) return 'boolean';
        if (strpos($key_lower, 'date') !== false) return 'date';
        if (strpos($key_lower, 'content') !== false) return 'html';
        
        // Check value for type indicators
        if (is_numeric($value)) {
            return strpos($value, '.') !== false ? 'float' : 'number';
        }
        
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) return 'email';
        if (filter_var($value, FILTER_VALIDATE_URL)) return 'url';
        if (in_array(strtolower($value), array('true', 'false', '1', '0'))) return 'boolean';
        
        return 'text';
    }
}
```

### Advanced Nonce and Capability Checks
Implement sophisticated security checks:

```php
<?php
/**
 * Advanced Security Checks
 */
class WP_LLM_Security {
    
    /**
     * Verify request with multiple security layers
     */
    public static function verify_request($action, $nonce_field = '_wpnonce', $capability = null) {
        // Check if user is logged in
        if (!is_user_logged_in()) {
            return new WP_Error('not_logged_in', 'User must be logged in');
        }
        
        // Verify nonce
        if (!wp_verify_nonce($_POST[$nonce_field] ?? '', $action)) {
            return new WP_Error('invalid_nonce', 'Security check failed');
        }
        
        // Check capability if specified
        if ($capability && !current_user_can($capability)) {
            return new WP_Error('insufficient_permissions', 'Insufficient permissions');
        }
        
        // Rate limiting check
        if (!self::check_rate_limit($action)) {
            return new WP_Error('rate_limit_exceeded', 'Too many requests');
        }
        
        return true;
    }
    
    /**
     * Rate limiting implementation
     */
    private static function check_rate_limit($action, $limit = 10, $window = 3600) {
        $user_id = get_current_user_id();
        $key = "rate_limit_{$action}_{$user_id}";
        
        $requests = get_transient($key);
        if ($requests === false) {
            set_transient($key, 1, $window);
            return true;
        }
        
        if ($requests >= $limit) {
            return false;
        }
        
        set_transient($key, $requests + 1, $window);
        return true;
    }
    
    /**
     * Validate and sanitize file uploads
     */
    public static function validate_file_upload($file, $allowed_types = array(), $max_size = 5242880) {
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            return new WP_Error('invalid_file', 'Invalid file upload');
        }
        
        // Check file size
        if ($file['size'] > $max_size) {
            return new WP_Error('file_too_large', 'File size exceeds limit');
        }
        
        // Check file type
        $file_type = wp_check_filetype($file['name']);
        if (empty($file_type['type']) || !in_array($file_type['type'], $allowed_types)) {
            return new WP_Error('invalid_file_type', 'File type not allowed');
        }
        
        // Additional security checks
        $file_content = file_get_contents($file['tmp_name']);
        if (self::contains_malicious_content($file_content)) {
            return new WP_Error('malicious_file', 'File contains malicious content');
        }
        
        return true;
    }
    
    /**
     * Basic malicious content detection
     */
    private static function contains_malicious_content($content) {
        $suspicious_patterns = array(
            '/<\?php/i',
            '/<script/i',
            '/javascript:/i',
            '/vbscript:/i',
            '/onload=/i',
            '/onerror=/i',
        );
        
        foreach ($suspicious_patterns as $pattern) {
            if (preg_match($pattern, $content)) {
                return true;
            }
        }
        
        return false;
    }
}
```

## **🚀 Performance Optimization**

### Caching Strategies
Implement comprehensive caching for generated content:

```php
<?php
/**
 * Advanced Caching Implementation
 */
class WP_LLM_Cache {
    
    /**
     * Cache generated content with intelligent invalidation
     */
    public static function cache_generated_content($key, $content, $expiration = 3600) {
        $cache_key = 'wp_llm_generated_' . md5($key);
        
        // Store with metadata for intelligent invalidation
        $cache_data = array(
            'content' => $content,
            'generated_at' => current_time('timestamp'),
            'expires_at' => current_time('timestamp') + $expiration,
            'dependencies' => self::get_content_dependencies($content),
        );
        
        return set_transient($cache_key, $cache_data, $expiration);
    }
    
    /**
     * Get cached content with dependency checking
     */
    public static function get_cached_content($key) {
        $cache_key = 'wp_llm_generated_' . md5($key);
        $cached = get_transient($cache_key);
        
        if ($cached === false) {
            return false;
        }
        
        // Check if dependencies have changed
        if (self::dependencies_changed($cached['dependencies'])) {
            delete_transient($cache_key);
            return false;
        }
        
        return $cached['content'];
    }
    
    /**
     * Determine content dependencies
     */
    private static function get_content_dependencies($content) {
        $dependencies = array();
        
        // Check for post type dependencies
        if (preg_match_all('/register_post_type\([\'"]([^\'"]+)[\'"]/', $content, $matches)) {
            $dependencies['post_types'] = $matches[1];
        }
        
        // Check for taxonomy dependencies
        if (preg_match_all('/register_taxonomy\([\'"]([^\'"]+)[\'"]/', $content, $matches)) {
            $dependencies['taxonomies'] = $matches[1];
        }
        
        // Check for option dependencies
        if (preg_match_all('/get_option\([\'"]([^\'"]+)[\'"]/', $content, $matches)) {
            $dependencies['options'] = $matches[1];
        }
        
        return $dependencies;
    }
    
    /**
     * Check if dependencies have changed
     */
    private static function dependencies_changed($dependencies) {
        foreach ($dependencies as $type => $items) {
            switch ($type) {
                case 'post_types':
                    foreach ($items as $post_type) {
                        if (get_option("post_type_{$post_type}_version") !== get_option("post_type_{$post_type}_version_cached")) {
                            return true;
                        }
                    }
                    break;
                    
                case 'options':
                    foreach ($items as $option) {
                        if (get_option($option) !== get_option("{$option}_cached")) {
                            return true;
                        }
                    }
                    break;
            }
        }
        
        return false;
    }
    
    /**
     * Clear all WP LLM caches
     */
    public static function clear_all_caches() {
        global $wpdb;
        
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
                '%_transient_wp_llm_generated_%'
            )
        );
        
        wp_cache_flush();
    }
}
```

### Database Query Optimization
Optimize database queries for better performance:

```php
<?php
/**
 * Optimized Database Queries
 */
class WP_LLM_Query_Optimizer {
    
    /**
     * Optimized WP_Query with caching
     */
    public static function optimized_query($args) {
        // Add query optimization
        $args['no_found_rows'] = true; // Don't count total rows
        $args['update_post_meta_cache'] = false; // Don't cache post meta
        $args['update_post_term_cache'] = false; // Don't cache terms
        
        // Use object cache if available
        $cache_key = 'wp_llm_query_' . md5(serialize($args));
        $cached_result = wp_cache_get($cache_key);
        
        if ($cached_result !== false) {
            return $cached_result;
        }
        
        $query = new WP_Query($args);
        wp_cache_set($cache_key, $query, '', 300); // Cache for 5 minutes
        
        return $query;
    }
    
    /**
     * Batch process large datasets
     */
    public static function batch_process($callback, $batch_size = 100) {
        $offset = 0;
        $total_processed = 0;
        
        do {
            $args = array(
                'post_type' => 'any',
                'posts_per_page' => $batch_size,
                'offset' => $offset,
                'post_status' => 'publish',
                'no_found_rows' => true,
            );
            
            $query = new WP_Query($args);
            $posts = $query->posts;
            
            if (empty($posts)) {
                break;
            }
            
            foreach ($posts as $post) {
                $callback($post);
                $total_processed++;
            }
            
            $offset += $batch_size;
            
            // Prevent memory issues
            wp_cache_flush();
            
        } while (!empty($posts));
        
        return $total_processed;
    }
    
    /**
     * Optimized meta queries
     */
    public static function optimized_meta_query($meta_key, $meta_value = '', $compare = '=') {
        global $wpdb;
        
        $sql = $wpdb->prepare(
            "SELECT p.ID, p.post_title, pm.meta_value 
             FROM {$wpdb->posts} p 
             INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id 
             WHERE p.post_status = 'publish' 
             AND pm.meta_key = %s",
            $meta_key
        );
        
        if (!empty($meta_value)) {
            $sql .= $wpdb->prepare(" AND pm.meta_value {$compare} %s", $meta_value);
        }
        
        return $wpdb->get_results($sql);
    }
}
```

## **🔄 Advanced Automation**

### Batch Processing with WP LLM
Automate large-scale code generation:

```php
<?php
/**
 * Batch Code Generation
 */
class WP_LLM_Batch_Processor {
    
    /**
     * Generate multiple components in batch
     */
    public static function generate_components($components) {
        $results = array();
        
        foreach ($components as $component) {
            $prompt = self::build_prompt($component);
            $generated_code = self::call_wp_llm($prompt);
            
            $results[] = array(
                'component' => $component,
                'code' => $generated_code,
                'status' => 'success',
                'timestamp' => current_time('timestamp'),
            );
        }
        
        return $results;
    }
    
    /**
     * Build optimized prompts for components
     */
    private static function build_prompt($component) {
        $base_prompt = "Create a WordPress {$component['type']} with the following specifications:\n";
        
        foreach ($component['specifications'] as $spec) {
            $base_prompt .= "- {$spec}\n";
        }
        
        $base_prompt .= "\nRequirements:\n";
        $base_prompt .= "- Follow WordPress coding standards\n";
        $base_prompt .= "- Include proper security measures\n";
        $base_prompt .= "- Optimize for performance\n";
        $base_prompt .= "- Include comprehensive documentation\n";
        
        return $base_prompt;
    }
    
    /**
     * Call WP LLM API
     */
    private static function call_wp_llm($prompt) {
        // Implementation depends on your WP LLM setup
        // This is a placeholder for the actual API call
        return "Generated code for: " . substr($prompt, 0, 50) . "...";
    }
}

// Usage example
$components = array(
    array(
        'type' => 'custom post type',
        'specifications' => array(
            'Name: Portfolio Projects',
            'Fields: title, description, client, date, technologies',
            'Taxonomy: Project Categories',
            'REST API support',
        ),
    ),
    array(
        'type' => 'Gutenberg block',
        'specifications' => array(
            'Name: Project Showcase',
            'Dynamic content from portfolio post type',
            'Filtering by category',
            'Responsive design',
        ),
    ),
);

$results = WP_LLM_Batch_Processor::generate_components($components);
```

### Template Generation
Generate code templates for common patterns:

```php
<?php
/**
 * Template Generator
 */
class WP_LLM_Template_Generator {
    
    /**
     * Generate plugin template
     */
    public static function generate_plugin_template($plugin_name, $features) {
        $template = "<?php\n";
        $template .= "/**\n";
        $template .= " * Plugin Name: {$plugin_name}\n";
        $template .= " * Description: Generated by WP LLM\n";
        $template .= " * Version: 1.0.0\n";
        $template .= " */\n\n";
        
        $template .= "// Prevent direct access\n";
        $template .= "if (!defined('ABSPATH')) {\n";
        $template .= "    exit;\n";
        $template .= "}\n\n";
        
        foreach ($features as $feature) {
            $template .= self::generate_feature_code($feature);
        }
        
        return $template;
    }
    
    /**
     * Generate feature code
     */
    private static function generate_feature_code($feature) {
        switch ($feature['type']) {
            case 'custom_post_type':
                return self::generate_cpt_code($feature);
            case 'meta_box':
                return self::generate_meta_box_code($feature);
            case 'rest_api':
                return self::generate_rest_api_code($feature);
            default:
                return "// Feature: {$feature['type']}\n";
        }
    }
    
    /**
     * Generate custom post type code
     */
    private static function generate_cpt_code($feature) {
        $cpt_name = $feature['name'];
        $cpt_slug = sanitize_title($cpt_name);
        
        return "
/**
 * Register {$cpt_name} Custom Post Type
 */
function register_{$cpt_slug}_post_type() {
    \$labels = array(
        'name' => __('{$cpt_name}', 'text-domain'),
        'singular_name' => __('{$cpt_name}', 'text-domain'),
    );
    
    \$args = array(
        'labels' => \$labels,
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
    );
    
    register_post_type('{$cpt_slug}', \$args);
}
add_action('init', 'register_{$cpt_slug}_post_type');
\n";
    }
}
```

## **📊 Testing and Quality Assurance**

### Automated Testing with WP LLM
Generate test cases for your WordPress code:

```php
<?php
/**
 * Test Case Generator
 */
class WP_LLM_Test_Generator {
    
    /**
     * Generate PHPUnit tests for WordPress code
     */
    public static function generate_tests($code_file) {
        $code_content = file_get_contents($code_file);
        $functions = self::extract_functions($code_content);
        
        $test_code = "<?php\n";
        $test_code .= "use PHPUnit\\Framework\\TestCase;\n\n";
        $test_code .= "class GeneratedTest extends TestCase {\n";
        
        foreach ($functions as $function) {
            $test_code .= self::generate_function_tests($function);
        }
        
        $test_code .= "}\n";
        
        return $test_code;
    }
    
    /**
     * Extract functions from code
     */
    private static function extract_functions($code) {
        preg_match_all('/function\s+(\w+)\s*\([^)]*\)\s*{/', $code, $matches);
        return $matches[1] ?? array();
    }
    
    /**
     * Generate tests for a function
     */
    private static function generate_function_tests($function_name) {
        return "
    /**
     * Test {$function_name}
     */
    public function test_{$function_name}() {
        // Test basic functionality
        \$result = {$function_name}();
        \$this->assertNotNull(\$result);
        
        // Test with parameters
        \$result = {$function_name}('test');
        \$this->assertIsString(\$result);
    }
\n";
    }
}
```

## **🎯 Advanced Prompt Templates**

### Reusable Prompt Templates
Create templates for common development tasks:

```php
<?php
/**
 * Prompt Templates
 */
class WP_LLM_Prompt_Templates {
    
    /**
     * Get template for custom post type
     */
    public static function custom_post_type($name, $fields = array(), $taxonomies = array()) {
        $template = "Create a custom post type for '{$name}' with the following specifications:\n\n";
        
        if (!empty($fields)) {
            $template .= "Custom Fields:\n";
            foreach ($fields as $field) {
                $template .= "- {$field}\n";
            }
            $template .= "\n";
        }
        
        if (!empty($taxonomies)) {
            $template .= "Taxonomies:\n";
            foreach ($taxonomies as $taxonomy) {
                $template .= "- {$taxonomy}\n";
            }
            $template .= "\n";
        }
        
        $template .= "Requirements:\n";
        $template .= "- Follow WordPress coding standards\n";
        $template .= "- Include proper labels and capabilities\n";
        $template .= "- Enable REST API support\n";
        $template .= "- Include security best practices\n";
        $template .= "- Add comprehensive documentation\n";
        
        return $template;
    }
    
    /**
     * Get template for Gutenberg block
     */
    public static function gutenberg_block($name, $attributes = array(), $features = array()) {
        $template = "Create a Gutenberg block called '{$name}' with the following specifications:\n\n";
        
        if (!empty($attributes)) {
            $template .= "Attributes:\n";
            foreach ($attributes as $attr) {
                $template .= "- {$attr}\n";
            }
            $template .= "\n";
        }
        
        if (!empty($features)) {
            $template .= "Features:\n";
            foreach ($features as $feature) {
                $template .= "- {$feature}\n";
            }
            $template .= "\n";
        }
        
        $template .= "Requirements:\n";
        $template .= "- Use modern React/JSX syntax\n";
        $template .= "- Include proper TypeScript types\n";
        $template .= "- Follow WordPress block standards\n";
        $template .= "- Include responsive design\n";
        $template .= "- Add comprehensive documentation\n";
        
        return $template;
    }
    
    /**
     * Get template for REST API endpoint
     */
    public static function rest_api_endpoint($endpoint, $methods = array('GET'), $features = array()) {
        $template = "Create a REST API endpoint '{$endpoint}' with the following specifications:\n\n";
        
        $template .= "Methods: " . implode(', ', $methods) . "\n\n";
        
        if (!empty($features)) {
            $template .= "Features:\n";
            foreach ($features as $feature) {
                $template .= "- {$feature}\n";
            }
            $template .= "\n";
        }
        
        $template .= "Requirements:\n";
        $template .= "- Include proper authentication\n";
        $template .= "- Add input validation and sanitization\n";
        $template .= "- Implement error handling\n";
        $template .= "- Follow WordPress REST API standards\n";
        $template .= "- Include comprehensive documentation\n";
        
        return $template;
    }
}

// Usage examples
$cpt_prompt = WP_LLM_Prompt_Templates::custom_post_type(
    'Portfolio Projects',
    array('Client Name', 'Project Date', 'Technologies Used', 'Project URL'),
    array('Project Categories', 'Technologies')
);

$block_prompt = WP_LLM_Prompt_Templates::gutenberg_block(
    'Project Showcase',
    array('title', 'description', 'image', 'link'),
    array('Dynamic content loading', 'Filtering options', 'Responsive grid layout')
);

$api_prompt = WP_LLM_Prompt_Templates::rest_api_endpoint(
    '/wp-llm/v1/projects',
    array('GET', 'POST'),
    array('Pagination', 'Filtering', 'Search', 'Authentication')
);
```

---

## **Endpoint**

The WP LLM API provides programmatic access to the model.

## **Request Format**

```json
{
  "model": "wp-llm",
  "prompt": "Create a custom post type for Products",
  "stream": false,
  "options": {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 2000
  }
}
```

## **Response Format**

```json
{
  "model": "wp-llm",
  "created_at": "2024-01-01T00:00:00Z",
  "response": "Generated WordPress code...",
  "done": true,
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 500,
    "total_tokens": 510
  }
}
```

## **Example Usage (cURL)**

```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "wp-llm",
    "prompt": "Create a custom post type for Portfolio Projects with client name and project date fields"
  }'
```

## **Example Usage (PHP)**

```php
<?php
function call_wp_llm_api($prompt) {
    $url = 'http://localhost:11434/api/generate';
    $data = array(
        'model' => 'wp-llm',
        'prompt' => $prompt,
        'stream' => false
    );
    
    $response = wp_remote_post($url, array(
        'headers' => array('Content-Type' => 'application/json'),
        'body' => json_encode($data),
        'timeout' => 60
    ));
    
    if (is_wp_error($response)) {
        return false;
    }
    
    $body = wp_remote_retrieve_body($response);
    $result = json_decode($body, true);
    
    return $result['response'] ?? false;
}

// Usage
$code = call_wp_llm_api('Create a custom post type for Events');
if ($code) {
    echo $code;
}
?>
```

---

**Ready to master advanced WP LLM techniques?** Start with the [Key Capabilities](capabilities) guide to understand the fundamentals, then explore these advanced patterns for enterprise-level WordPress development! 