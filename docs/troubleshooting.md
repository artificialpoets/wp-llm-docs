---
id: troubleshooting
title: Troubleshooting Guide
description: Common issues and solutions when using WP LLM for WordPress development. Learn how to resolve installation, configuration, and usage problems.
keywords: [WP LLM troubleshooting, WordPress AI issues, installation problems, configuration errors, usage problems, common solutions]
---

# 🔧 Troubleshooting Guide

Quick solutions to common issues when using WP LLM for WordPress development.

## **🚨 Common Issues and Solutions**

### Installation Problems

**Issue: "Model not found" error**
```
Error: model 'wp-llm' not found
```

**Solution:**
1. Verify the model is downloaded:
   ```bash
   ollama list
   ```

2. If not listed, download the model:
   ```bash
   ollama pull wp-llm
   ```

3. Check your internet connection and try again.

**Issue: "Out of memory" error**
```
Error: out of memory
```

**Solution:**
1. Close other applications to free up RAM
2. Restart Ollama:
   ```bash
   ollama stop
   ollama start
   ```
3. Consider upgrading to 16GB+ RAM
4. Use a smaller model variant if available

**Issue: "Permission denied" error**
```
Error: permission denied
```

**Solution:**
1. Add your user to the ollama group:
   ```bash
   sudo usermod -a -G ollama $USER
   ```
2. Log out and back in, or restart your system
3. Verify permissions:
   ```bash
   ls -la ~/.ollama
   ```

### Configuration Issues

**Issue: Slow response times**
```
Taking 30+ seconds to generate code
```

**Solution:**
1. Ensure you have 8GB+ free RAM
2. Close unnecessary applications
3. Use SSD storage for better I/O performance
4. Consider using a smaller model variant
5. Check system resources:
   ```bash
   htop
   ```

**Issue: Connection refused**
```
Error: connection refused
```

**Solution:**
1. Restart Ollama service:
   ```bash
   ollama stop
   ollama start
   ```
2. Check if Ollama is running:
   ```bash
   ps aux | grep ollama
   ```
3. Verify port availability:
   ```bash
   netstat -tulpn | grep 11434
   ```

**Issue: Model download fails**
```
Error downloading model: network timeout
```

**Solution:**
1. Check your internet connection
2. Try downloading during off-peak hours
3. Use a different network if possible
4. Verify disk space:
   ```bash
   df -h
   ```
5. Clear Ollama cache:
   ```bash
   ollama rm wp-llm
   ollama pull wp-llm
   ```

### Usage Problems

**Issue: Generated code doesn't work**
```
The generated code has errors or doesn't function properly
```

**Solution:**
1. **Review the code** - Always check generated code before use
2. **Provide more context** - Include WordPress version and setup details
3. **Refine your prompt** - Be more specific about requirements
4. **Test incrementally** - Build and test code step by step
5. **Check WordPress compatibility** - Ensure code works with your WordPress version

**Issue: Insecure code generation**
```
Generated code lacks proper security measures
```

**Solution:**
1. **Be explicit about security** - Include security requirements in your prompt
2. **Use security-focused prompts** - Ask for sanitization, validation, and nonce verification
3. **Review security aspects** - Always verify security implementations
4. **Follow WordPress security guidelines** - Reference official WordPress security documentation

**Issue: Poor code quality**
```
Generated code doesn't follow WordPress standards
```

**Solution:**
1. **Specify standards** - Ask for WordPress coding standards compliance
2. **Include examples** - Provide sample code for reference
3. **Request documentation** - Ask for PHPDoc comments and inline documentation
4. **Use iterative development** - Generate and refine code step by step

### Performance Issues

**Issue: High memory usage**
```
Ollama using too much RAM
```

**Solution:**
1. **Close other applications** - Free up system memory
2. **Restart Ollama** - Clear memory cache
3. **Use smaller model** - Switch to 7B variant if using larger model
4. **Monitor usage** - Use system monitoring tools
5. **Upgrade RAM** - Consider hardware upgrade

**Issue: Slow code generation**
```
Taking too long to generate responses
```

**Solution:**
1. **Optimize prompts** - Be more specific and concise
2. **Use SSD storage** - Faster I/O performance
3. **Close background processes** - Free up CPU resources
4. **Check system load** - Monitor CPU and memory usage
5. **Consider hardware upgrade** - More RAM and faster CPU

### Integration Issues

**Issue: VS Code integration not working**
```
Ollama extension not responding in VS Code
```

**Solution:**
1. **Verify Ollama is running** - Check if service is active
2. **Check extension settings** - Configure correct model name
3. **Restart VS Code** - Reload the editor
4. **Update extension** - Install latest version
5. **Check logs** - Review extension and Ollama logs

**Issue: API integration problems**
```
HTTP API calls failing
```

**Solution:**
1. **Verify Ollama is serving** - Start API server:
   ```bash
   ollama serve
   ```
2. **Check endpoint URL** - Use correct localhost address
3. **Verify request format** - Use proper JSON structure
4. **Check authentication** - Ensure no auth required for local setup
5. **Test with curl** - Verify API manually:
   ```bash
   curl -X POST http://localhost:11434/api/generate \
     -H "Content-Type: application/json" \
     -d '{"model": "wp-llm", "prompt": "test"}'
   ```

## **🔍 Diagnostic Tools**

### System Information
Check your system configuration:

```bash
# Check OS and version
uname -a

# Check available memory
free -h

# Check disk space
df -h

# Check CPU information
lscpu

# Check Ollama version
ollama --version
```

### Ollama Status
Verify Ollama installation and status:

```bash
# Check if Ollama is running
ps aux | grep ollama

# Check available models
ollama list

# Check Ollama logs
journalctl -u ollama -f

# Test Ollama functionality
ollama run wp-llm "Hello, test message"
```

### Network Diagnostics
Check network connectivity:

```bash
# Test internet connection
ping -c 4 google.com

# Check DNS resolution
nslookup ollama.ai

# Test port availability
netstat -tulpn | grep 11434

# Check firewall settings
sudo ufw status
```

### Performance Monitoring
Monitor system performance:

```bash
# Real-time system monitoring
htop

# Memory usage
free -h

# Disk I/O
iotop

# Network usage
iftop
```

## **🛠️ Advanced Troubleshooting**

### Model Corruption
If the model appears corrupted:

```bash
# Remove the model
ollama rm wp-llm

# Clear Ollama cache
rm -rf ~/.ollama

# Reinstall Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Download model again
ollama pull wp-llm
```

### System Compatibility
Check system requirements:

**Minimum Requirements:**
- **RAM**: 8GB (16GB recommended)
- **Storage**: 10GB free space
- **OS**: macOS 10.15+, Linux (Ubuntu 18.04+), Windows 10+ with WSL2
- **CPU**: Multi-core processor (4+ cores recommended)

**Recommended Requirements:**
- **RAM**: 16GB+
- **Storage**: SSD with 20GB+ free space
- **CPU**: 8+ cores
- **GPU**: NVIDIA GPU with 4GB+ VRAM (optional)

### Environment Variables
Set environment variables for troubleshooting:

```bash
# Enable debug logging
export OLLAMA_DEBUG=1

# Set custom model path
export OLLAMA_MODELS=/path/to/models

# Set custom host
export OLLAMA_HOST=0.0.0.0:11434

# Restart Ollama with new settings
ollama stop
ollama start
```

### Log Analysis
Analyze Ollama logs for issues:

```bash
# View recent logs
journalctl -u ollama --since "1 hour ago"

# Follow logs in real-time
journalctl -u ollama -f

# Search for specific errors
journalctl -u ollama | grep -i error

# Export logs to file
journalctl -u ollama > ollama_logs.txt
```

## **📞 Getting Help**

### Self-Help Resources
1. **Check this guide** - Most common issues are covered here
2. **Review documentation** - [Getting Started](getting-started/quick-start) and [Advanced Usage](advanced-usage)
3. **Search existing issues** - Check GitHub issues for similar problems
4. **Test with simple prompts** - Verify basic functionality

### Community Support
1. **GitHub Discussions** - Ask questions and share solutions
2. **Discord Community** - Real-time help and support
3. **Stack Overflow** - Search for WP LLM related questions
4. **WordPress Forums** - WordPress-specific integration help

### Professional Support
1. **Enterprise Support** - For enterprise customers
2. **Consulting Services** - Custom implementation help
3. **Training Programs** - Learn advanced techniques
4. **Custom Development** - Tailored solutions

### Reporting Issues
When reporting issues, include:

1. **System Information**:
   - Operating system and version
   - RAM and CPU specifications
   - Ollama version

2. **Error Details**:
   - Exact error message
   - Steps to reproduce
   - Expected vs actual behavior

3. **Context**:
   - What you were trying to do
   - Prompt used (if applicable)
   - WordPress version and setup

4. **Logs**:
   - Ollama logs
   - System logs
   - Any relevant error output

## **🔄 Recovery Procedures**

### Complete Reset
If all else fails, perform a complete reset:

```bash
# Stop Ollama
ollama stop

# Remove all models
ollama rm wp-llm

# Clear all Ollama data
rm -rf ~/.ollama

# Reinstall Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Download model again
ollama pull wp-llm

# Test functionality
ollama run wp-llm "Create a simple custom post type"
```

### Backup and Restore
Backup your configuration:

```bash
# Backup Ollama configuration
cp -r ~/.ollama ~/.ollama_backup

# Backup model files (if needed)
cp -r ~/.ollama/models ~/ollama_models_backup

# Restore from backup
cp -r ~/.ollama_backup ~/.ollama
```

### Alternative Installation
Try alternative installation methods:

```bash
# Using Docker
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Using Snap (Ubuntu)
sudo snap install ollama

# Using Homebrew (macOS)
brew install ollama
```

---

**Still having issues?** Check the [Getting Started Guide](getting-started/quick-start) for basic setup, or reach out to the community for help! 