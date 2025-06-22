---
id: capabilities
title: Key Capabilities
description: Learn about the seven core WordPress development capabilities of WP LLM - custom post types, REST API endpoints, shortcodes, Gutenberg blocks, plugin lifecycle hooks, meta boxes, and complex WP_Query loops.
keywords: [WordPress capabilities, custom post types, REST API, shortcodes, Gutenberg blocks, plugin development, meta boxes, WP_Query, WordPress development, code generation]
---

# 🚀 Key Capabilities of WP LLM

WP LLM is the **only** AI model specifically designed to excel at WordPress development. While other AI tools struggle with WordPress complexity, WP LLM generates production-ready, secure, and standards-compliant code for the seven most critical WordPress development tasks.

## 🎯 Why WP LLM Beats Other AI Tools

| Capability | Generic AI Tools | WP LLM |
|------------|------------------|---------|
| **WordPress Knowledge** | Surface-level understanding | Deep core expertise |
| **Code Quality** | Often incomplete or insecure | Production-ready, secure |
| **Security Standards** | Basic, often missing WordPress security | WordPress security best practices |
| **Performance** | Generic optimization | WordPress-specific optimization |
| **Block Editor** | Limited Gutenberg support | Full FSE and block theme support |
| **REST API** | Basic CRUD operations | Proper authentication and validation |
| **Custom Post Types** | Template-based | Context-aware, proper registration |

## 🏆 Seven Core WordPress Capabilities

WP LLM specializes in the seven most common and impactful WordPress development tasks that every WordPress developer needs to master:

1. **🎯 Custom Post Type/Taxonomy Registration** - Create structured content types
2. **🔌 REST API Endpoint Creation** - Build secure, authenticated APIs
3. **📝 Shortcode Implementation** - Develop interactive content elements
4. **🎨 Dynamic Gutenberg Block Scaffolding** - Create modern block editor components
5. **⚙️ Plugin Activation/Deactivation Hooks** - Handle plugin lifecycle and database setup
6. **📋 Custom Meta Boxes** - Build custom fields and data persistence
7. **🔍 Complex WP_Query Loops** - Create sophisticated content queries

---

## 1. 🎯 Custom Post Type/Taxonomy Registration

**What it does**: Creates custom content structures that extend WordPress beyond posts and pages.

**Why it's important**: Custom post types and taxonomies are fundamental to building complex WordPress sites with specialized content types like events, products, portfolios, or any structured data.

**WP LLM Advantage**: Unlike generic AI tools that create basic post types, WP LLM generates complete, production-ready registrations with proper labels, capabilities, and REST API support.

**Example Prompt**: `Create a custom post type for 'Events' with date, location, and capacity fields, plus a taxonomy for 'Event Categories'`

**Generated Code Example**:
```php
<?php
/**
 * Register Events Custom Post Type
 */
function register_events_post_type() {
    $labels = array(
        'name'               => _x('Events', 'post type general name', 'your-text-domain'),
        'singular_name'      => _x('Event', 'post type singular name', 'your-text-domain'),
        'menu_name'          => _x('Events', 'admin menu', 'your-text-domain'),
        'add_new'            => _x('Add New', 'event', 'your-text-domain'),
        'add_new_item'       => __('Add New Event', 'your-text-domain'),
        'edit_item'          => __('Edit Event', 'your-text-domain'),
        'new_item'           => __('New Event', 'your-text-domain'),
        'view_item'          => __('View Event', 'your-text-domain'),
        'search_items'       => __('Search Events', 'your-text-domain'),
        'not_found'          => __('No events found', 'your-text-domain'),
        'not_found_in_trash' => __('No events found in Trash', 'your-text-domain'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'events'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true, // Enable Gutenberg editor
    );

    register_post_type('event', $args);
}
add_action('init', 'register_events_post_type');

/**
 * Register Event Categories Taxonomy
 */
function register_event_categories_taxonomy() {
    $labels = array(
        'name'              => _x('Event Categories', 'taxonomy general name', 'your-text-domain'),
        'singular_name'     => _x('Event Category', 'taxonomy singular name', 'your-text-domain'),
        'search_items'      => __('Search Event Categories', 'your-text-domain'),
        'all_items'         => __('All Event Categories', 'your-text-domain'),
        'parent_item'       => __('Parent Event Category', 'your-text-domain'),
        'parent_item_colon' => __('Parent Event Category:', 'your-text-domain'),
        'edit_item'         => __('Edit Event Category', 'your-text-domain'),
        'update_item'       => __('Update Event Category', 'your-text-domain'),
        'add_new_item'      => __('Add New Event Category', 'your-text-domain'),
        'new_item_name'     => __('New Event Category Name', 'your-text-domain'),
        'menu_name'         => __('Event Categories', 'your-text-domain'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'event-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy('event_category', array('event'), $args);
}
add_action('init', 'register_event_categories_taxonomy');
```

**🚀 WP LLM Benefits:**
- ✅ **Complete Implementation**: Full labels, capabilities, and REST API support
- ✅ **Security Ready**: Proper capability checks and sanitization
- ✅ **Performance Optimized**: Efficient registration and query optimization
- ✅ **Standards Compliant**: Follows WordPress coding standards

---

## 2. 🔌 REST API Endpoint Creation

**What it does**: Creates secure, authenticated REST API endpoints for external applications to interact with WordPress data.

**Why it's important**: REST APIs enable headless WordPress, mobile apps, and integrations with external services while maintaining WordPress security standards.

**WP LLM Advantage**: While generic AI tools create basic endpoints, WP LLM generates enterprise-grade APIs with proper authentication, validation, and security measures.

**Example Prompt**: `Create a REST API endpoint that returns all published events with authentication and proper sanitization`

**Generated Code Example**:
```php
<?php
/**
 * Register Events REST API Endpoint
 */
function register_events_rest_endpoint() {
    register_rest_route('wp-llm/v1', '/events', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'get_events_endpoint',
        'permission_callback' => 'check_events_permission',
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
            'category' => array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
            ),
        ),
    ));
}
add_action('rest_api_init', 'register_events_rest_endpoint');

/**
 * Permission callback for events endpoint
 */
function check_events_permission($request) {
    // Allow public read access to published events
    return true;
}

/**
 * Callback function for events endpoint
 */
function get_events_endpoint($request) {
    $per_page = $request->get_param('per_page');
    $page = $request->get_param('page');
    $category = $request->get_param('category');

    $args = array(
        'post_type'      => 'event',
        'post_status'    => 'publish',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    // Add category filter if provided
    if (!empty($category)) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'event_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    $query = new WP_Query($args);
    $events = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            
            $events[] = array(
                'id'          => $post_id,
                'title'       => get_the_title(),
                'content'     => get_the_content(),
                'excerpt'     => get_the_excerpt(),
                'date'        => get_the_date('c'),
                'modified'    => get_the_modified_date('c'),
                'slug'        => get_post_field('post_name'),
                'featured_image' => get_the_post_thumbnail_url($post_id, 'medium'),
                'event_date'  => get_post_meta($post_id, 'event_date', true),
                'location'    => get_post_meta($post_id, 'location', true),
                'capacity'    => get_post_meta($post_id, 'capacity', true),
                'categories'  => wp_get_post_terms($post_id, 'event_category', array('fields' => 'names')),
            );
        }
        wp_reset_postdata();
    }

    return new WP_REST_Response($events, 200);
}
```

---

## 3. 📝 Shortcode Implementation

**What it does**: Creates shortcodes that embed dynamic content or functionality into posts and pages.

**Why it's important**: Shortcodes provide a user-friendly way to add complex functionality to content without requiring technical knowledge.

**Example Prompt**: `Create a shortcode that displays a contact form with name, email, and message fields`

**Generated Code Example**:
```php
<?php
/**
 * Contact Form Shortcode
 */
function contact_form_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'title' => 'Contact Us',
        'submit_text' => 'Send Message',
    ), $atts, 'contact_form');

    // Start output buffering
    ob_start();

    // Handle form submission
    if ($_POST['contact_form_submit'] && wp_verify_nonce($_POST['contact_form_nonce'], 'contact_form_action')) {
        $name = sanitize_text_field($_POST['contact_name']);
        $email = sanitize_email($_POST['contact_email']);
        $message = sanitize_textarea_field($_POST['contact_message']);

        if (empty($name) || empty($email) || empty($message)) {
            echo '<div class="contact-form-error">Please fill in all fields.</div>';
        } elseif (!is_email($email)) {
            echo '<div class="contact-form-error">Please enter a valid email address.</div>';
        } else {
            // Process the form (send email, save to database, etc.)
            $to = get_option('admin_email');
            $subject = 'New Contact Form Submission from ' . $name;
            $body = "Name: $name\nEmail: $email\nMessage: $message";
            $headers = array('Content-Type: text/plain; charset=UTF-8');

            if (wp_mail($to, $subject, $body, $headers)) {
                echo '<div class="contact-form-success">Thank you! Your message has been sent.</div>';
            } else {
                echo '<div class="contact-form-error">Sorry, there was an error sending your message.</div>';
            }
        }
    }

    // Generate nonce
    $nonce = wp_create_nonce('contact_form_action');
    ?>
    <div class="contact-form-wrapper">
        <h3><?php echo esc_html($atts['title']); ?></h3>
        <form method="post" class="contact-form">
            <?php wp_nonce_field('contact_form_action', 'contact_form_nonce'); ?>
            <input type="hidden" name="contact_form_submit" value="1">
            
            <div class="form-group">
                <label for="contact_name">Name *</label>
                <input type="text" id="contact_name" name="contact_name" required 
                       value="<?php echo isset($_POST['contact_name']) ? esc_attr($_POST['contact_name']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="contact_email">Email *</label>
                <input type="email" id="contact_email" name="contact_email" required 
                       value="<?php echo isset($_POST['contact_email']) ? esc_attr($_POST['contact_email']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="contact_message">Message *</label>
                <textarea id="contact_message" name="contact_message" rows="5" required><?php echo isset($_POST['contact_message']) ? esc_textarea($_POST['contact_message']) : ''; ?></textarea>
            </div>

            <button type="submit" class="contact-form-submit"><?php echo esc_html($atts['submit_text']); ?></button>
        </form>
    </div>

    <style>
    .contact-form-wrapper {
        max-width: 600px;
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .contact-form .form-group {
        margin-bottom: 15px;
    }
    .contact-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .contact-form input,
    .contact-form textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
    .contact-form-submit {
        background: #0073aa;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    .contact-form-success {
        background: #d4edda;
        color: #155724;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 15px;
    }
    .contact-form-error {
        background: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 15px;
    }
    </style>
    <?php

    return ob_get_clean();
}
add_shortcode('contact_form', 'contact_form_shortcode');
```

---

## 4. 🎨 Dynamic Gutenberg Block Scaffolding

**What it does**: Creates modern Gutenberg blocks with both PHP and JavaScript (React/JSX) components for the block editor.

**Why it's important**: Gutenberg blocks and block patterns are the foundation of modern WordPress development, especially for block-based themes like TwentyTwentyFive. They enable rich, interactive, and reusable content experiences—without the need for page builders.

### Example Prompt
`Create a dynamic Gutenberg block that displays a testimonial with author name, role, and company, and make it reusable in a block theme.`

---

### 🟦 Real-World Example: Custom Testimonial Block (React/JSX)

**Directory structure for a custom block (placed in a theme or plugin):**
```
wp-content/
  themes/
    twentytwentyfive-child/
      blocks/
        testimonial/
          block.json
          edit.js
          save.js
          style.css
```

**block.json**
```json
{
  "apiVersion": 3,
  "name": "wp-llm/testimonial",
  "title": "Testimonial",
  "category": "widgets",
  "icon": "format-quote",
  "description": "A custom testimonial block with author, role, and company.",
  "attributes": {
    "content": { "type": "string", "source": "html", "selector": ".testimonial-content" },
    "authorName": { "type": "string", "source": "text", "selector": ".testimonial-author-name" },
    "authorRole": { "type": "string", "source": "text", "selector": ".testimonial-author-role" },
    "company": { "type": "string", "source": "text", "selector": ".testimonial-author-company" }
  },
  "supports": { "html": false },
  "editorScript": "file:./edit.js",
  "style": "file:./style.css"
}
```

**edit.js**
```jsx
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <RichText
        tagName="div"
        className="testimonial-content"
        placeholder={__('Add testimonial...', 'wp-llm')}
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
      />
      <RichText
        tagName="div"
        className="testimonial-author-name"
        placeholder={__('Author name', 'wp-llm')}
        value={attributes.authorName}
        onChange={(authorName) => setAttributes({ authorName })}
      />
      <RichText
        tagName="div"
        className="testimonial-author-role"
        placeholder={__('Author role', 'wp-llm')}
        value={attributes.authorRole}
        onChange={(authorRole) => setAttributes({ authorRole })}
      />
      <RichText
        tagName="div"
        className="testimonial-author-company"
        placeholder={__('Company', 'wp-llm')}
        value={attributes.company}
        onChange={(company) => setAttributes({ company })}
      />
    </div>
  );
}
```

**save.js**
```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <RichText.Content tagName="div" className="testimonial-content" value={attributes.content} />
      <div className="testimonial-meta">
        <RichText.Content tagName="span" className="testimonial-author-name" value={attributes.authorName} />
        {attributes.authorRole && (
          <span className="testimonial-author-role">, {attributes.authorRole}</span>
        )}
        {attributes.company && (
          <span className="testimonial-author-company"> at {attributes.company}</span>
        )}
      </div>
    </div>
  );
}
```

**style.css**
```css
.wp-block-wp-llm-testimonial {
  border-left: 4px solid #0073aa;
  padding: 1em;
  margin: 1em 0;
  background: #f9f9f9;
}
.testimonial-meta {
  font-size: 0.95em;
  color: #555;
  margin-top: 0.5em;
}
```

**How to use in a block theme:**
- Place the `blocks/testimonial` folder in your child theme or plugin.
- Register the block in your `functions.php` or a custom plugin:
  ```php
  add_action('init', function() {
    register_block_type(get_stylesheet_directory() . '/blocks/testimonial');
  });
  ```
- The block will now be available in the block editor for any post, page, or template part.

---

### 🟩 Example: Template Part (Block Theme)

Template parts are reusable sections (like headers, footers, or custom sections) defined in block themes. You can create a template part for testimonials:

**File:** `wp-content/themes/twentytwentyfive/parts/testimonials.html`
```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- wp:heading -->
  <h2>Testimonials</h2>
  <!-- /wp:heading -->
  <!-- wp:wp-llm/testimonial /-->
  <!-- wp:wp-llm/testimonial /-->
</div>
<!-- /wp:group -->
```

You can then include this template part in any template (e.g., `page.html`, `single.html`) using the block editor or by adding:
```html
<!-- wp:template-part {"slug":"testimonials"} /-->
```

---

### 🟨 Example: Block Pattern (Reusable Block)

Block patterns are reusable layouts that users can insert anywhere. Register a pattern in your theme:

**File:** `wp-content/themes/twentytwentyfive/patterns/testimonial-row.php`
```php
<?php
register_block_pattern(
  'twentytwentyfive/testimonial-row',
  array(
    'title'   => __('Testimonial Row', 'twentytwentyfive'),
    'content' => '
<!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
<div class="wp-block-group"><!-- wp:wp-llm/testimonial /--><!-- wp:wp-llm/testimonial /--></div>
<!-- /wp:group -->',
  )
);
```

This pattern will appear in the block inserter under "Patterns" and can be used in any post, page, or template.

---

### 📝 Guidance: Integrating Blocks & Patterns in Block Themes
- **No page builder required:** All examples above work natively in the block editor and block-based themes.
- **React/JSX for interactivity:** Use React in your block's `edit.js` for dynamic controls and live editing.
- **Template parts for structure:** Use template parts to create reusable sections (e.g., testimonials, calls to action) that can be included in any template.
- **Block patterns for layout:** Register block patterns for common layouts, making it easy for users to insert and reuse them.
- **Theme.json for style control:** Use `theme.json` to define global styles, color palettes, and spacing for your blocks and patterns.

**For more on block theme development, see:**
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block Themes Overview](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/)
- [TwentyTwentyFive Theme](https://github.com/WordPress/twentytwentyfive)

---

## 5. ⚙️ Plugin Activation/Deactivation Hooks

**What it does**: Handles plugin lifecycle events including database setup, cleanup, and initialization.

**Why it's important**: Proper plugin lifecycle management ensures clean installation, updates, and removal without leaving orphaned data.

**Example Prompt**: `Create plugin activation and deactivation hooks with database table creation using dbDelta`

**Generated Code Example**:
```php
<?php
/**
 * Plugin Name: WP LLM Example Plugin
 * Description: Example plugin demonstrating activation/deactivation hooks
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Plugin activation hook
 */
function wp_llm_example_activate() {
    // Create database tables
    wp_llm_create_tables();
    
    // Set default options
    wp_llm_set_default_options();
    
    // Flush rewrite rules for custom post types
    flush_rewrite_rules();
    
    // Log activation
    error_log('WP LLM Example Plugin activated');
}
register_activation_hook(__FILE__, 'wp_llm_example_activate');

/**
 * Plugin deactivation hook
 */
function wp_llm_example_deactivate() {
    // Flush rewrite rules
    flush_rewrite_rules();
    
    // Clear scheduled events
    wp_clear_scheduled_hook('wp_llm_example_cron');
    
    // Log deactivation
    error_log('WP LLM Example Plugin deactivated');
}
register_deactivation_hook(__FILE__, 'wp_llm_example_deactivate');

/**
 * Create database tables using dbDelta
 */
function wp_llm_create_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $table_name = $wpdb->prefix . 'wp_llm_example_data';
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        content longtext NOT NULL,
        status varchar(20) DEFAULT 'draft',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY status (status),
        KEY created_at (created_at)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    
    // Check if table was created successfully
    $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name;
    
    if (!$table_exists) {
        error_log('Failed to create table: ' . $table_name);
    }
}

/**
 * Set default plugin options
 */
function wp_llm_set_default_options() {
    $default_options = array(
        'wp_llm_example_enabled' => 'yes',
        'wp_llm_example_version' => '1.0.0',
        'wp_llm_example_settings' => array(
            'max_items' => 10,
            'auto_cleanup' => true,
            'notification_email' => get_option('admin_email'),
        ),
    );
    
    foreach ($default_options as $option_name => $option_value) {
        if (get_option($option_name) === false) {
            add_option($option_name, $option_value);
        }
    }
}

/**
 * Plugin uninstall hook (runs when plugin is deleted)
 */
function wp_llm_example_uninstall() {
    global $wpdb;
    
    // Remove database tables
    $table_name = $wpdb->prefix . 'wp_llm_example_data';
    $wpdb->query("DROP TABLE IF EXISTS $table_name");
    
    // Remove options
    delete_option('wp_llm_example_enabled');
    delete_option('wp_llm_example_version');
    delete_option('wp_llm_example_settings');
    
    // Remove any custom post types (if they exist)
    // Note: This is optional and depends on your plugin's needs
    
    // Log uninstall
    error_log('WP LLM Example Plugin uninstalled');
}
register_uninstall_hook(__FILE__, 'wp_llm_example_uninstall');
```

---

## 6. 📋 Custom Meta Boxes

**What it does**: Creates custom fields and data persistence for posts, pages, or custom post types.

**Why it's important**: Meta boxes provide a way to collect and store additional data beyond the standard title and content fields.

**Example Prompt**: `Create a meta box for events with date, location, and capacity fields`

**Generated Code Example**:
```php
<?php
/**
 * Add Event Meta Box
 */
function add_event_meta_boxes() {
    add_meta_box(
        'event_details',
        __('Event Details', 'your-text-domain'),
        'render_event_meta_box',
        'event',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_event_meta_boxes');

/**
 * Render Event Meta Box
 */
function render_event_meta_box($post) {
    // Add nonce for security
    wp_nonce_field('event_meta_box_nonce', 'event_meta_box_nonce');
    
    // Get existing values
    $event_date = get_post_meta($post->ID, '_event_date', true);
    $event_time = get_post_meta($post->ID, '_event_time', true);
    $location = get_post_meta($post->ID, '_event_location', true);
    $capacity = get_post_meta($post->ID, '_event_capacity', true);
    $price = get_post_meta($post->ID, '_event_price', true);
    $registration_url = get_post_meta($post->ID, '_event_registration_url', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="event_date"><?php _e('Event Date', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="date" id="event_date" name="event_date" 
                       value="<?php echo esc_attr($event_date); ?>" class="regular-text">
                <p class="description"><?php _e('Select the event date', 'your-text-domain'); ?></p>
            </td>
        </tr>
        
        <tr>
            <th scope="row">
                <label for="event_time"><?php _e('Event Time', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="time" id="event_time" name="event_time" 
                       value="<?php echo esc_attr($event_time); ?>" class="regular-text">
                <p class="description"><?php _e('Select the event time', 'your-text-domain'); ?></p>
            </td>
        </tr>
        
        <tr>
            <th scope="row">
                <label for="event_location"><?php _e('Location', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="text" id="event_location" name="event_location" 
                       value="<?php echo esc_attr($location); ?>" class="regular-text">
                <p class="description"><?php _e('Enter the event location', 'your-text-domain'); ?></p>
            </td>
        </tr>
        
        <tr>
            <th scope="row">
                <label for="event_capacity"><?php _e('Capacity', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="number" id="event_capacity" name="event_capacity" 
                       value="<?php echo esc_attr($capacity); ?>" class="small-text" min="1">
                <p class="description"><?php _e('Maximum number of attendees', 'your-text-domain'); ?></p>
            </td>
        </tr>
        
        <tr>
            <th scope="row">
                <label for="event_price"><?php _e('Price', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="text" id="event_price" name="event_price" 
                       value="<?php echo esc_attr($price); ?>" class="regular-text">
                <p class="description"><?php _e('Event price (e.g., $25, Free, etc.)', 'your-text-domain'); ?></p>
            </td>
        </tr>
        
        <tr>
            <th scope="row">
                <label for="event_registration_url"><?php _e('Registration URL', 'your-text-domain'); ?></label>
            </th>
            <td>
                <input type="url" id="event_registration_url" name="event_registration_url" 
                       value="<?php echo esc_url($registration_url); ?>" class="regular-text">
                <p class="description"><?php _e('Link to registration page', 'your-text-domain'); ?></p>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Save Event Meta Box Data
 */
function save_event_meta_box($post_id) {
    // Security checks
    if (!isset($_POST['event_meta_box_nonce']) || 
        !wp_verify_nonce($_POST['event_meta_box_nonce'], 'event_meta_box_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    // Save event date
    if (isset($_POST['event_date'])) {
        $event_date = sanitize_text_field($_POST['event_date']);
        update_post_meta($post_id, '_event_date', $event_date);
    }
    
    // Save event time
    if (isset($_POST['event_time'])) {
        $event_time = sanitize_text_field($_POST['event_time']);
        update_post_meta($post_id, '_event_time', $event_time);
    }
    
    // Save location
    if (isset($_POST['event_location'])) {
        $location = sanitize_text_field($_POST['event_location']);
        update_post_meta($post_id, '_event_location', $location);
    }
    
    // Save capacity
    if (isset($_POST['event_capacity'])) {
        $capacity = absint($_POST['event_capacity']);
        update_post_meta($post_id, '_event_capacity', $capacity);
    }
    
    // Save price
    if (isset($_POST['event_price'])) {
        $price = sanitize_text_field($_POST['event_price']);
        update_post_meta($post_id, '_event_price', $price);
    }
    
    // Save registration URL
    if (isset($_POST['event_registration_url'])) {
        $registration_url = esc_url_raw($_POST['event_registration_url']);
        update_post_meta($post_id, '_event_registration_url', $registration_url);
    }
}
add_action('save_post', 'save_event_meta_box');

/**
 * Add custom columns to events list
 */
function add_event_admin_columns($columns) {
    $new_columns = array();
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        if ($key === 'title') {
            $new_columns['event_date'] = __('Event Date', 'your-text-domain');
            $new_columns['location'] = __('Location', 'your-text-domain');
            $new_columns['capacity'] = __('Capacity', 'your-text-domain');
        }
    }
    return $new_columns;
}
add_filter('manage_event_posts_columns', 'add_event_admin_columns');

/**
 * Populate custom columns
 */
function populate_event_admin_columns($column, $post_id) {
    switch ($column) {
        case 'event_date':
            $event_date = get_post_meta($post_id, '_event_date', true);
            $event_time = get_post_meta($post_id, '_event_time', true);
            if ($event_date) {
                $date_obj = new DateTime($event_date);
                echo esc_html($date_obj->format('M j, Y'));
                if ($event_time) {
                    echo '<br><small>' . esc_html($event_time) . '</small>';
                }
            }
            break;
            
        case 'location':
            $location = get_post_meta($post_id, '_event_location', true);
            echo esc_html($location);
            break;
            
        case 'capacity':
            $capacity = get_post_meta($post_id, '_event_capacity', true);
            echo esc_html($capacity);
            break;
    }
}
add_action('manage_event_posts_custom_column', 'populate_event_admin_columns', 10, 2);
```

---

## 7. 🔍 Complex WP_Query Loops

**What it does**: Creates sophisticated content queries with filtering, pagination, and custom ordering.

**Why it's important**: Complex queries enable advanced content displays, filtering, and user experiences that go beyond basic loops.

**Example Prompt**: `Create a WP_Query that displays upcoming events with pagination, filtering by category, and ordering by date`

**Generated Code Example**:
```php
<?php
/**
 * Display Upcoming Events with Advanced Filtering
 */
function display_upcoming_events($args = array()) {
    // Parse arguments
    $defaults = array(
        'category' => '',
        'posts_per_page' => 10,
        'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
        'show_past' => false,
        'orderby' => 'meta_value',
        'order' => 'ASC',
    );
    
    $args = wp_parse_args($args, $defaults);
    
    // Build query arguments
    $query_args = array(
        'post_type' => 'event',
        'post_status' => 'publish',
        'posts_per_page' => $args['posts_per_page'],
        'paged' => $args['paged'],
        'orderby' => $args['orderby'],
        'order' => $args['order'],
        'meta_query' => array(),
        'tax_query' => array(),
    );
    
    // Add date filtering
    if (!$args['show_past']) {
        $today = current_time('Y-m-d');
        $query_args['meta_query'][] = array(
            'key' => '_event_date',
            'value' => $today,
            'compare' => '>=',
            'type' => 'DATE',
        );
    }
    
    // Add category filtering
    if (!empty($args['category'])) {
        $query_args['tax_query'][] = array(
            'taxonomy' => 'event_category',
            'field' => 'slug',
            'terms' => $args['category'],
        );
    }
    
    // Handle ordering by date
    if ($args['orderby'] === 'meta_value') {
        $query_args['meta_key'] = '_event_date';
        $query_args['meta_type'] = 'DATE';
    }
    
    // Execute query
    $events_query = new WP_Query($query_args);
    
    // Start output
    ob_start();
    
    if ($events_query->have_posts()) {
        echo '<div class="events-grid">';
        
        while ($events_query->have_posts()) {
            $events_query->the_post();
            $post_id = get_the_ID();
            
            // Get event meta
            $event_date = get_post_meta($post_id, '_event_date', true);
            $event_time = get_post_meta($post_id, '_event_time', true);
            $location = get_post_meta($post_id, '_event_location', true);
            $capacity = get_post_meta($post_id, '_event_capacity', true);
            $price = get_post_meta($post_id, '_event_price', true);
            $registration_url = get_post_meta($post_id, '_event_registration_url', true);
            
            // Format date
            $date_obj = new DateTime($event_date);
            $formatted_date = $date_obj->format('F j, Y');
            $day_of_week = $date_obj->format('l');
            
            // Get categories
            $categories = wp_get_post_terms($post_id, 'event_category', array('fields' => 'names'));
            ?>
            
            <article class="event-card">
                <div class="event-date">
                    <span class="day"><?php echo esc_html($date_obj->format('j')); ?></span>
                    <span class="month"><?php echo esc_html($date_obj->format('M')); ?></span>
                    <span class="year"><?php echo esc_html($date_obj->format('Y')); ?></span>
                </div>
                
                <div class="event-content">
                    <h3 class="event-title">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h3>
                    
                    <?php if (!empty($categories)): ?>
                        <div class="event-categories">
                            <?php foreach ($categories as $category): ?>
                                <span class="event-category"><?php echo esc_html($category); ?></span>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="event-meta">
                        <?php if ($event_time): ?>
                            <div class="event-time">
                                <i class="dashicons dashicons-clock"></i>
                                <?php echo esc_html($day_of_week . ' at ' . $event_time); ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($location): ?>
                            <div class="event-location">
                                <i class="dashicons dashicons-location"></i>
                                <?php echo esc_html($location); ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($capacity): ?>
                            <div class="event-capacity">
                                <i class="dashicons dashicons-groups"></i>
                                Capacity: <?php echo esc_html($capacity); ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($price): ?>
                            <div class="event-price">
                                <i class="dashicons dashicons-tickets-alt"></i>
                                <?php echo esc_html($price); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <div class="event-excerpt">
                        <?php the_excerpt(); ?>
                    </div>
                    
                    <div class="event-actions">
                        <a href="<?php the_permalink(); ?>" class="button event-details">
                            <?php _e('Event Details', 'your-text-domain'); ?>
                        </a>
                        
                        <?php if ($registration_url): ?>
                            <a href="<?php echo esc_url($registration_url); ?>" class="button event-register" target="_blank">
                                <?php _e('Register Now', 'your-text-domain'); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </article>
            
            <?php
        }
        
        echo '</div>';
        
        // Pagination
        if ($events_query->max_num_pages > 1) {
            echo '<div class="events-pagination">';
            echo paginate_links(array(
                'base' => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
                'format' => '?paged=%#%',
                'current' => max(1, $args['paged']),
                'total' => $events_query->max_num_pages,
                'prev_text' => __('&laquo; Previous'),
                'next_text' => __('Next &raquo;'),
            ));
            echo '</div>';
        }
        
    } else {
        echo '<div class="no-events">';
        echo '<p>' . __('No upcoming events found.', 'your-text-domain') . '</p>';
        echo '</div>';
    }
    
    wp_reset_postdata();
    
    return ob_get_clean();
}

/**
 * Shortcode to display upcoming events
 */
function upcoming_events_shortcode($atts) {
    $atts = shortcode_atts(array(
        'category' => '',
        'posts_per_page' => 10,
        'show_past' => 'false',
        'orderby' => 'meta_value',
        'order' => 'ASC',
    ), $atts, 'upcoming_events');
    
    $args = array(
        'category' => $atts['category'],
        'posts_per_page' => absint($atts['posts_per_page']),
        'show_past' => $atts['show_past'] === 'true',
        'orderby' => $atts['orderby'],
        'order' => $atts['order'],
    );
    
    return display_upcoming_events($args);
}
add_shortcode('upcoming_events', 'upcoming_events_shortcode');
```

---

## 🎯 Using These Capabilities

Each capability is designed to work independently or together. You can:

- **Combine capabilities** - Create a custom post type with meta boxes and REST API endpoints
- **Build complete plugins** - Use all seven capabilities to create comprehensive WordPress solutions
- **Learn patterns** - Study the generated code to understand WordPress best practices
- **Customize output** - Modify prompts to get variations that suit your specific needs

## 💡 Best Practices for Using WP LLM Capabilities

1. **Start simple** - Begin with basic prompts and refine them
2. **Review security** - Always verify sanitization, escaping, and nonce usage
3. **Test thoroughly** - Test generated code in development environments
4. **Understand the code** - Don't use code you don't understand
5. **Follow WordPress standards** - Ensure generated code follows coding standards

---

**Ready to start generating WordPress code?** [Set up WP LLM locally](getting-started/local-setup-ollama.md) and try these capabilities for yourself!

---

## 🎨 Advanced Block Theme Development

WP LLM excels at generating code for modern block-based WordPress themes, enabling developers to create sophisticated, reusable components without page builders.

### Example Prompt
`Create a complete block theme structure with custom blocks, patterns, and theme.json configuration for a modern business website`

### 🟦 Real-World Example: Hero Section Block (React/JSX)

**File:** `wp-content/themes/my-business-theme/blocks/hero-section/block.json`
```json
{
  "apiVersion": 3,
  "name": "my-business/hero-section",
  "title": "Hero Section",
  "category": "design",
  "icon": "align-wide",
  "description": "A hero section with background image, heading, and call-to-action.",
  "attributes": {
    "title": { "type": "string", "source": "html", "selector": "h1" },
    "subtitle": { "type": "string", "source": "html", "selector": "p" },
    "buttonText": { "type": "string", "source": "text", "selector": ".hero-button" },
    "buttonUrl": { "type": "string", "source": "attribute", "selector": ".hero-button", "attribute": "href" },
    "backgroundImage": { "type": "object" },
    "overlayOpacity": { "type": "number", "default": 0.5 }
  },
  "supports": {
    "html": false,
    "align": ["wide", "full"]
  },
  "editorScript": "file:./edit.js",
  "style": "file:./style.css"
}
```

**File:** `wp-content/themes/my-business-theme/blocks/hero-section/edit.js`
```jsx
import { __ } from '@wordpress/i18n';
import { 
  useBlockProps, 
  RichText, 
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  TextControl, 
  RangeControl,
  Button 
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { 
    title, 
    subtitle, 
    buttonText, 
    buttonUrl, 
    backgroundImage, 
    overlayOpacity 
  } = attributes;

  const backgroundStyle = backgroundImage?.url 
    ? { backgroundImage: `url(${backgroundImage.url})` }
    : {};

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Hero Settings', 'my-business')}>
          <TextControl
            label={__('Button URL', 'my-business')}
            value={buttonUrl || ''}
            onChange={(buttonUrl) => setAttributes({ buttonUrl })}
          />
          <RangeControl
            label={__('Overlay Opacity', 'my-business')}
            value={overlayOpacity}
            onChange={(overlayOpacity) => setAttributes({ overlayOpacity })}
            min={0}
            max={1}
            step={0.1}
          />
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ backgroundImage: media })}
              allowedTypes={['image']}
              value={backgroundImage?.id}
              render={({ open }) => (
                <Button 
                  onClick={open}
                  variant="secondary"
                >
                  {backgroundImage?.url 
                    ? __('Replace Background Image', 'my-business')
                    : __('Select Background Image', 'my-business')
                  }
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} className="hero-section" style={backgroundStyle}>
        <div 
          className="hero-overlay" 
          style={{ opacity: overlayOpacity }}
        />
        <div className="hero-content">
          <RichText
            tagName="h1"
            placeholder={__('Enter hero title...', 'my-business')}
            value={title}
            onChange={(title) => setAttributes({ title })}
            className="hero-title"
          />
          <RichText
            tagName="p"
            placeholder={__('Enter hero subtitle...', 'my-business')}
            value={subtitle}
            onChange={(subtitle) => setAttributes({ subtitle })}
            className="hero-subtitle"
          />
          <RichText
            tagName="a"
            placeholder={__('Button text...', 'my-business')}
            value={buttonText}
            onChange={(buttonText) => setAttributes({ buttonText })}
            className="hero-button"
            href={buttonUrl}
          />
        </div>
      </div>
    </>
  );
}
```

**File:** `wp-content/themes/my-business-theme/blocks/hero-section/save.js`
```jsx
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { 
    title, 
    subtitle, 
    buttonText, 
    buttonUrl, 
    backgroundImage, 
    overlayOpacity 
  } = attributes;

  const backgroundStyle = backgroundImage?.url 
    ? { backgroundImage: `url(${backgroundImage.url})` }
    : {};

  return (
    <div {...blockProps} className="hero-section" style={backgroundStyle}>
      <div 
        className="hero-overlay" 
        style={{ opacity: overlayOpacity }}
      />
      <div className="hero-content">
        <RichText.Content
          tagName="h1"
          value={title}
          className="hero-title"
        />
        <RichText.Content
          tagName="p"
          value={subtitle}
          className="hero-subtitle"
        />
        {buttonText && buttonUrl && (
          <RichText.Content
            tagName="a"
            value={buttonText}
            className="hero-button"
            href={buttonUrl}
          />
        )}
      </div>
    </div>
  );
}
```

**File:** `wp-content/themes/my-business-theme/blocks/hero-section/style.css`
```css
.hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #0073aa;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.hero-button:hover {
  background: #005a87;
}
```

### 🟩 Advanced Block Pattern: Service Grid

**File:** `wp-content/themes/my-business-theme/patterns/service-grid.php`
```php
<?php
register_block_pattern(
  'my-business/service-grid',
  array(
    'title'       => __('Service Grid', 'my-business'),
    'description' => __('A grid layout for displaying services with icons and descriptions.', 'my-business'),
    'categories'  => array('my-business'),
    'content'     => '
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- wp:heading {"textAlign":"center"} -->
  <h2 class="wp-block-heading has-text-align-center">Our Services</h2>
  <!-- /wp:heading -->
  
  <!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2rem","left":"2rem"}}}} -->
  <div class="wp-block-columns">
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"light-gray"} -->
      <div class="wp-block-group has-light-gray-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
        <!-- wp:heading {"level":3,"textAlign":"center"} -->
        <h3 class="wp-block-heading has-text-align-center">Service 1</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center">Description of your first service goes here.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
    
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"light-gray"} -->
      <div class="wp-block-group has-light-gray-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
        <!-- wp:heading {"level":3,"textAlign":"center"} -->
        <h3 class="wp-block-heading has-text-align-center">Service 2</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center">Description of your second service goes here.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
    
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"light-gray"} -->
      <div class="wp-block-group has-light-gray-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
        <!-- wp:heading {"level":3,"textAlign":"center"} -->
        <h3 class="wp-block-heading has-text-align-center">Service 3</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center">Description of your third service goes here.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
</div>
<!-- /wp:group -->',
  )
);
```

### 🟨 Theme.json Configuration

**File:** `wp-content/themes/my-business-theme/theme.json`
```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "primary",
          "color": "#0073aa",
          "name": "Primary"
        },
        {
          "slug": "secondary",
          "color": "#005a87",
          "name": "Secondary"
        },
        {
          "slug": "accent",
          "color": "#ff6b35",
          "name": "Accent"
        },
        {
          "slug": "light-gray",
          "color": "#f5f5f5",
          "name": "Light Gray"
        },
        {
          "slug": "dark-gray",
          "color": "#333333",
          "name": "Dark Gray"
        }
      ]
    },
    "typography": {
      "fontSizes": [
        {
          "slug": "small",
          "size": "14px",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "16px",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "20px",
          "name": "Large"
        },
        {
          "slug": "x-large",
          "size": "24px",
          "name": "Extra Large"
        }
      ]
    },
    "spacing": {
      "units": ["px", "em", "rem", "%", "vw", "vh"],
      "spacingSizes": [
        {
          "slug": "small",
          "size": "1rem",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "2rem",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "4rem",
          "name": "Large"
        }
      ]
    },
    "layout": {
      "contentSize": "1200px",
      "wideSize": "1400px"
    }
  },
  "styles": {
    "color": {
      "background": "#ffffff",
      "text": "#333333"
    },
    "typography": {
      "fontSize": "16px",
      "lineHeight": "1.6"
    },
    "spacing": {
      "blockGap": "2rem"
    }
  },
  "templateParts": [
    {
      "name": "header",
      "title": "Header",
      "area": "header"
    },
    {
      "name": "footer",
      "title": "Footer",
      "area": "footer"
    }
  ]
}
```

### 📝 Block Theme Integration Guide

**1. Register Custom Blocks in functions.php:**
```php
<?php
// Register custom blocks
add_action('init', function() {
  register_block_type(get_template_directory() . '/blocks/hero-section');
  register_block_type(get_template_directory() . '/blocks/testimonial');
});

// Register block patterns
add_action('init', function() {
  require_once get_template_directory() . '/patterns/service-grid.php';
});

// Add custom block category
add_filter('block_categories_all', function($categories) {
  return array_merge($categories, [
    [
      'slug' => 'my-business',
      'title' => __('My Business', 'my-business'),
      'icon' => 'businessman'
    ]
  ]);
});
```

**2. Create Template Files:**
- `index.html` - Main template
- `page.html` - Page template
- `single.html` - Single post template
- `archive.html` - Archive template
- `parts/header.html` - Header template part
- `parts/footer.html` - Footer template part

**3. Example Template: `page.html`**
```html
<!-- wp:template-part {"slug":"header","area":"header"} /-->

<!-- wp:group {"tagName":"main","style":{"spacing":{"margin":{"top":"0"},"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}}} -->
<main class="wp-block-group" style="margin-top:0;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50)">
  <!-- wp:query {"queryId":1,"query":{"inherit":true}} -->
  <div class="wp-block-query">
    <!-- wp:post-template -->
    <!-- wp:post-title {"level":1,"align":"wide"} /-->
    <!-- wp:post-content {"align":"wide"} /-->
    <!-- /wp:post-template -->
  </div>
  <!-- /wp:query -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
```

### 🎯 Key Benefits of Block Theme Development

- **No Page Builder Required**: Everything works natively in WordPress
- **React/JSX for Interactivity**: Modern JavaScript for dynamic blocks
- **Reusable Components**: Blocks, patterns, and template parts
- **Theme.json Control**: Centralized styling and configuration
- **Performance**: Lightweight, no external dependencies
- **Accessibility**: Built-in accessibility features
- **Future-Proof**: Aligned with WordPress development direction

--- 