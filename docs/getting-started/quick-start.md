---
id: quick-start
title: Quick Start Guide
description: Get up and running with WP LLM in 5 minutes. Learn how to install, configure, and start generating WordPress code immediately.
keywords: [WP LLM quick start, WordPress AI setup, Ollama installation, WordPress development, AI code generation]
---

# 🚀 Quick Start Guide

Get WP LLM up and running in **5 minutes** and start generating production-ready WordPress code immediately.

## **⚡ What You'll Learn**

By the end of this guide, you'll:
- ✅ Install and configure WP LLM locally
- ✅ Generate your first custom post type
- ✅ Create a Gutenberg block
- ✅ Build a REST API endpoint
- ✅ Understand best practices for prompts

## **📋 Prerequisites**

- **macOS, Linux, or Windows** with WSL2
- **Node.js 18+** (for development tools)
- **WordPress development environment** (local or remote)
- **Basic familiarity** with WordPress development

## **🛠️ Step 1: Install Ollama**

### macOS & Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows (WSL2)
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Verify Installation
```bash
ollama --version
```

## **📥 Step 2: Download WP LLM**

```bash
ollama pull wp-llm
```

This downloads the specialized WordPress model (~4GB). The first run will take a few minutes.

## **🎯 Step 3: Your First WP LLM Command**

Let's create a custom post type for products:

```bash
ollama run wp-llm "Create a custom post type for 'Products' with price, SKU, and stock status meta fields"
```

**Expected Output:**
```php
<?php
/**
 * Register Products Custom Post Type
 */
function register_products_post_type() {
    $labels = array(
        'name'               => _x('Products', 'post type general name', 'your-text-domain'),
        'singular_name'      => _x('Product', 'post type singular name', 'your-text-domain'),
        'menu_name'          => _x('Products', 'admin menu', 'your-text-domain'),
        'add_new'            => _x('Add New', 'product', 'your-text-domain'),
        'add_new_item'       => __('Add New Product', 'your-text-domain'),
        'edit_item'          => __('Edit Product', 'your-text-domain'),
        'new_item'           => __('New Product', 'your-text-domain'),
        'view_item'          => __('View Product', 'your-text-domain'),
        'search_items'       => __('Search Products', 'your-text-domain'),
        'not_found'          => __('No products found', 'your-text-domain'),
        'not_found_in_trash' => __('No products found in Trash', 'your-text-domain'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'products'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-cart',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true, // Enable Gutenberg editor
    );

    register_post_type('product', $args);
}
add_action('init', 'register_products_post_type');
```

## **🎨 Step 4: Create a Gutenberg Block**

```bash
ollama run wp-llm "Create a hero section Gutenberg block with background image, heading, and call-to-action button"
```

**Expected Output:**
```php
<?php
/**
 * Register Hero Section Block
 */
function register_hero_section_block() {
    register_block_type('your-theme/hero-section', array(
        'editor_script' => 'hero-section-editor',
        'editor_style'  => 'hero-section-editor-style',
        'style'         => 'hero-section-style',
        'attributes'    => array(
            'title' => array(
                'type' => 'string',
                'default' => 'Welcome to Our Site',
            ),
            'subtitle' => array(
                'type' => 'string',
                'default' => 'Discover amazing content',
            ),
            'backgroundImage' => array(
                'type' => 'string',
                'default' => '',
            ),
            'buttonText' => array(
                'type' => 'string',
                'default' => 'Learn More',
            ),
            'buttonUrl' => array(
                'type' => 'string',
                'default' => '#',
            ),
        ),
        'render_callback' => 'render_hero_section_block',
    ));
}
add_action('init', 'register_hero_section_block');

function render_hero_section_block($attributes) {
    $title = isset($attributes['title']) ? $attributes['title'] : 'Welcome to Our Site';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : 'Discover amazing content';
    $background_image = isset($attributes['backgroundImage']) ? $attributes['backgroundImage'] : '';
    $button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : 'Learn More';
    $button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '#';

    $style = '';
    if (!empty($background_image)) {
        $style = 'background-image: url(' . esc_url($background_image) . ');';
    }

    return sprintf(
        '<div class="wp-block-hero-section" style="%s">
            <div class="hero-content">
                <h1 class="hero-title">%s</h1>
                <p class="hero-subtitle">%s</p>
                <a href="%s" class="hero-button">%s</a>
            </div>
        </div>',
        esc_attr($style),
        esc_html($title),
        esc_html($subtitle),
        esc_url($button_url),
        esc_html($button_text)
    );
}
```

## **🔌 Step 5: Build a REST API Endpoint**

```bash
ollama run wp-llm "Create a REST API endpoint that returns all published products with authentication and proper sanitization"
```

**Expected Output:**
```php
<?php
/**
 * Register Products REST API Endpoint
 */
function register_products_rest_endpoint() {
    register_rest_route('wp-llm/v1', '/products', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'get_products_endpoint',
        'permission_callback' => 'check_products_permission',
        'args'                => array(
            'per_page' => array(
                'default'           => 10,
                'sanitize_callback' => 'absint',
                'validate_callback' => function($param) {
                    return is_numeric($param) && $param > 0 && $param <= 100;
                }
            ),
            'page' => array(
                'default'           => 1,
                'sanitize_callback' => 'absint',
            ),
        ),
    ));
}
add_action('rest_api_init', 'register_products_rest_endpoint');

function check_products_permission($request) {
    return true; // Public read access
}

function get_products_endpoint($request) {
    $per_page = $request->get_param('per_page');
    $page = $request->get_param('page');

    $args = array(
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    $query = new WP_Query($args);
    $products = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $products[] = array(
                'id'    => get_the_ID(),
                'title' => get_the_title(),
                'content' => get_the_content(),
                'date'  => get_the_date('c'),
                'link'  => get_permalink(),
            );
        }
    }
    wp_reset_postdata();

    return new WP_REST_Response($products, 200);
}
```

## **🎯 Step 6: Pro Tips for Better Results**

### Be Specific in Your Prompts
Instead of: `"Create a contact form"`
Use: `"Create a contact form with name, email, message fields, honeypot protection, and email notification"`

### Provide Context
```bash
ollama run wp-llm "Create a custom post type for 'Portfolio Projects' with client name, project date, technologies used, and gallery support. Use modern WordPress standards and include REST API support."
```

### Ask for Complete Solutions
```bash
ollama run wp-llm "Create a complete testimonial system with custom post type, Gutenberg block, and REST API endpoint. Include proper sanitization and security measures."
```

## **🔧 Step 7: Integration with Your Workflow**

### VS Code Integration
1. Install the Ollama extension
2. Configure custom prompts
3. Use the command palette for quick access

### Git Integration
```bash
# Generate code and commit in one workflow
ollama run wp-llm "Create a custom post type for 'Team Members'" > team-members.php
git add team-members.php
git commit -m "Add team members custom post type"
```

### CI/CD Pipeline
```bash
# Generate and test code automatically
ollama run wp-llm "Create unit tests for the products custom post type" > tests/test-products.php
```

## **🚀 Next Steps**

Now that you're up and running, explore:

- **[Key Capabilities](capabilities)** - Master the seven core WordPress development tasks
- **[Advanced Usage](advanced-usage)** - Learn advanced techniques and workflows
- **[Examples & Templates](examples)** - Real-world examples and reusable templates
- **[Troubleshooting](troubleshooting)** - Common issues and solutions

## **🎉 Congratulations!**

You've successfully:
- ✅ Installed and configured WP LLM
- ✅ Generated production-ready WordPress code
- ✅ Created custom post types, blocks, and APIs
- ✅ Learned best practices for effective prompts

**Ready to build something amazing?** Start with the [Key Capabilities](capabilities) guide to master all seven core WordPress development tasks!

---

**💡 Pro Tip**: The more specific and detailed your prompts, the better the generated code will be. Always provide context about your WordPress version, theme, and specific requirements! 