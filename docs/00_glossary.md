---
id: 00_glossary
title: Glossary of Terms
---

# 📚 Glossary of Terms

This glossary defines essential terms you'll encounter throughout the WP LLM documentation. Terms are organized alphabetically for easy reference.

## AI/LLM Terms

### **DeepSpeed**
A Microsoft library that optimizes deep learning training and inference, enabling faster model training and more efficient memory usage.

### **Fine-tuning**
The process of taking a pre-trained language model and training it further on domain-specific data to improve performance for specific tasks (like WordPress development).

### **Inference**
The process of using a trained model to generate predictions or responses based on input data. In WP LLM's case, this means generating WordPress code from natural language prompts.

### **LLM (Large Language Model)**
A type of artificial intelligence model trained on vast amounts of text data that can understand and generate human-like text. Examples include GPT, Claude, and Llama models.

### **LoRA (Low-Rank Adaptation)**
A technique for efficiently fine-tuning large language models by adding small, trainable matrices to the model instead of updating all parameters.

### **Pass@k**
A metric used to evaluate code generation models. It measures the percentage of generated code samples that pass a set of tests, with k representing the number of attempts allowed.

### **QLoRA (Quantized Low-Rank Adaptation)**
An advanced fine-tuning technique that combines quantization (reducing model precision) with LoRA to enable fine-tuning of large models on consumer hardware.

### **Quantization**
A technique that reduces the precision of model weights (e.g., from 32-bit to 8-bit or 4-bit) to decrease memory usage and increase inference speed, often with minimal performance loss.

### **Tokenization**
The process of breaking down text into smaller units (tokens) that a language model can process. Tokens can be words, parts of words, or even individual characters.

## WordPress Development Terms

### **Custom Post Type (CPT)**
A content type in WordPress that extends beyond the default "post" and "page" types. CPTs allow you to create specialized content structures like "Events," "Products," or "Portfolio Items."

### **Custom Taxonomy**
A way to group and organize custom post types or regular posts. Examples include "Categories" and "Tags" for posts, or "Event Types" for an Events custom post type.

### **dbDelta**
A WordPress function that safely creates or modifies database tables by comparing the current table structure with the desired structure and making only necessary changes.

### **Escaping**
The process of converting special characters in data to their HTML entity equivalents to prevent XSS attacks and ensure proper output. WordPress provides functions like `esc_html()`, `esc_attr()`, and `esc_url()`.

### **Filter**
A WordPress hook that allows you to modify data before it's processed or displayed. Filters use the `apply_filters()` function and can be added with `add_filter()`.

### **Gutenberg Block**
A content block in WordPress's block editor (Gutenberg). Blocks can be static (like paragraphs) or dynamic (with custom functionality), and can be created using PHP and JavaScript.

### **Hook**
A point in WordPress code where you can add custom functionality. There are two types: **actions** (do something) and **filters** (modify something).

### **i18n (Internationalization)**
The process of making software translatable. In WordPress, this involves wrapping text strings in functions like `__()` or `_e()` to make them translatable.

### **Meta Box**
A UI element that appears in the WordPress admin area (typically on post edit screens) to collect additional data. Meta boxes can contain custom fields, forms, or other interactive elements.

### **Nonce**
A "number used once" - a security token that helps prevent unauthorized form submissions and CSRF attacks in WordPress.

### **REST API**
WordPress's REST API allows external applications to interact with WordPress data using HTTP requests. It provides endpoints for posts, pages, users, and custom data.

### **Sanitization**
The process of cleaning and validating data to ensure it's safe and conforms to expected formats before saving to the database.

### **Shortcode**
A WordPress feature that allows you to embed dynamic content or functionality into posts and pages using simple text codes like `[gallery]` or `[contact-form]`.

### **Text Domain**
A unique identifier used in WordPress internationalization to group translatable strings together, typically matching the plugin or theme name.

### **WP_Query**
WordPress's main class for retrieving posts and other content from the database. It's used to create custom loops and filter content based on various parameters.

## Development Tools

### **Composer**
A dependency management tool for PHP that helps manage libraries and packages your WordPress project depends on.

### **npm (Node Package Manager)**
A package manager for JavaScript that helps manage dependencies for front-end development, particularly useful for Gutenberg block development.

### **WP-CLI**
A command-line interface for WordPress that allows you to manage WordPress installations, plugins, themes, and perform various administrative tasks from the terminal.

---

**💡 Tip**: Refer back to this glossary whenever you encounter unfamiliar terms. Understanding these concepts will help you get the most out of WP LLM and WordPress development in general. 