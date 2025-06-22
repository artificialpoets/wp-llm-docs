---
id: local-setup-ollama
title: Local Setup with Ollama
description: Set up WP LLM locally using Ollama for offline, private WordPress development with AI assistance.
keywords: [WP LLM setup, Ollama installation, local AI development, WordPress development, offline AI]
---

# 🏠 Local Setup with Ollama

Set up WP LLM to run **locally on your machine** using Ollama for private, offline WordPress development with AI assistance.

## **Prerequisites**

Before you begin, ensure you have the following:

### Hardware Requirements
- **8GB RAM minimum** (16GB recommended)
- **4GB free disk space** for the model
- **Multi-core processor** (4+ cores recommended)

### Software Requirements
- **macOS 10.15+**, **Linux (Ubuntu 18.04+)**, or **Windows 10+ with WSL2**
- **Terminal/Command Prompt** access
- **WordPress development environment** (local or remote)

### WordPress Knowledge
- **Basic familiarity** with WordPress development
- **Understanding** of PHP, HTML, CSS, and JavaScript
- **Experience** with WordPress hooks, filters, and the plugin/theme system

## **Step 1: Install Ollama**

Ollama is the local AI runtime that will run WP LLM on your machine.

### macOS Installation
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Linux Installation
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows Installation
```bash
# Install WSL2 first, then run:
curl -fsSL https://ollama.ai/install.sh | sh
```

### Verify Installation
```bash
ollama --version
```

You should see output like: `ollama version 0.1.0`

## **Step 2: Download the WP LLM Model**

Download the specialized WordPress model:

```bash
ollama pull wp-llm
```

This will download the ~4GB model file. The first download may take 10-20 minutes depending on your internet connection.

**Progress indicators:**
- `pulling manifest` - Downloading model metadata
- `pulling layers` - Downloading model layers
- `verifying sha256` - Verifying model integrity
- `writing manifest` - Finalizing installation

## **Step 3: Run WP LLM Locally**

### Interactive Mode (Recommended for Learning)
Start an interactive session:

```bash
ollama run wp-llm
```

You'll see a prompt like:
```
>>> 
```

Now you can have a conversation with WP LLM:

```
>>> Create a custom post type for 'Portfolio Projects'
```

### Single Request Mode
For one-off requests:

```bash
ollama run wp-llm "Create a custom post type for 'Portfolio Projects'"
```

### API Mode (For Integration)
Start the API server:

```bash
ollama serve
```

Then make HTTP requests:
```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "wp-llm",
    "prompt": "Create a custom post type for Portfolio Projects"
  }'
```

## **Step 4: Your First WordPress Code Generation**

Let's test WP LLM with some real WordPress development tasks:

### Example 1: Custom Post Type
```bash
ollama run wp-llm "Create a custom post type for 'Portfolio Projects' with client name, project date, and technologies used"
```

### Example 2: REST API Endpoint
```bash
ollama run wp-llm "Create a REST API endpoint that returns all published portfolio projects with proper authentication"
```

## **Troubleshooting Common Issues**

### Model Not Found
**Error:** `Error: model 'wp-llm' not found`

**Solution:**
```bash
# Verify the model is downloaded
ollama list

# If not listed, download again
ollama pull wp-llm
```

### Out of Memory
**Error:** `Error: out of memory`

**Solution:**
- Close other applications to free up RAM
- Restart Ollama: `ollama stop && ollama start`
- Consider upgrading to 16GB+ RAM

### Slow Performance
**Symptoms:** Slow response times

**Solutions:**
- Ensure you have 8GB+ free RAM
- Close unnecessary applications
- Use SSD storage for better I/O performance
- Consider using a smaller model variant

### Connection Refused
**Error:** `Error: connection refused`

**Solution:**
```bash
# Restart Ollama service
ollama stop
ollama start
```

### Permission Issues (Linux/macOS)
**Error:** `Error: permission denied`

**Solution:**
```bash
# Add your user to the ollama group
sudo usermod -a -G ollama $USER

# Log out and back in, or restart your system
```

## **Next Steps**

### Immediate Next Steps
1. **[✨ Key Capabilities](capabilities)** - Learn about the seven core capabilities
2. **Practice with examples** - Try different WordPress development tasks
3. **Explore the API** - Integrate WP LLM into your development workflow

### Advanced Usage
- **Batch processing** - Generate multiple files at once
- **Custom prompts** - Create reusable prompt templates
- **Integration** - Connect with your IDE or build tools

### Best Practices
- **Be specific** in your prompts
- **Provide context** about your WordPress setup
- **Test generated code** in a development environment
- **Review security** aspects of generated code

## **Integration Examples**

### VS Code Integration
Install the Ollama extension and configure WP LLM as your default model.

### Shell Integration
Add to your `.bashrc` or `.zshrc`:
```bash
alias wp-llm='ollama run wp-llm'
```

### Script Integration
Create automation scripts:
```bash
#!/bin/bash
ollama run wp-llm "Create a custom post type for $1" > "$1-cpt.php"
```

**🎉 You're ready to start generating WordPress code with AI!** 

Try asking WP LLM to create something for your next WordPress project, or explore the [Key Capabilities](capabilities) to see what's possible. 