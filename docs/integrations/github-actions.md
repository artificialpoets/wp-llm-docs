---
id: github-actions
title: GitHub Actions Integration
sidebar_label: GitHub Actions
keywords: [github actions, ci/cd, automation, testing, deployment]
description: Complete guide to integrating WP LLM with GitHub Actions for automated testing and deployment
---

# GitHub Actions Integration

Integrate WP LLM with GitHub Actions to automate WordPress development workflows, code review, testing, and deployment.

## **Overview**

GitHub Actions integration with WP LLM provides:
- Automated code generation and review
- Security and performance analysis
- Automated testing with AI assistance
- Deployment automation
- Quality assurance workflows

<MermaidDiagram chart={`
graph TD
    A[GitHub Repository] --> B[GitHub Actions]
    B --> C[WP LLM Integration]
    C --> D[Code Generation]
    C --> E[Code Analysis]
    C --> F[Testing]
    C --> G[Deployment]
    
    D --> H[Plugin Scaffolding]
    D --> I[Block Generation]
    D --> J[Theme Development]
    
    E --> K[Security Scan]
    E --> L[Performance Check]
    E --> M[Code Quality]
    
    F --> N[Unit Tests]
    F --> O[Integration Tests]
    F --> P[E2E Tests]
    
    G --> Q[Staging]
    G --> R[Production]
`} />

## **Basic Setup**

### **Workflow Configuration**

Create `.github/workflows/wp-llm.yml`:

```yaml
name: WP LLM Integration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  wp-llm-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install WP LLM SDK
        run: npm install @wp-llm/sdk
      
      - name: Analyze Code
        run: |
          node -e "
          const { WPLLMClient } = require('@wp-llm/sdk');
          const fs = require('fs');
          
          const client = new WPLLMClient(process.env.WP_LLM_API_KEY);
          
          // Analyze PHP files
          const phpFiles = fs.readdirSync('.').filter(f => f.endsWith('.php'));
          
          for (const file of phpFiles) {
            const code = fs.readFileSync(file, 'utf8');
            const analysis = await client.analyze({
              code,
              analysisType: 'security'
            });
            
            if (analysis.issues.length > 0) {
              console.log(\`Issues found in \${file}:\`);
              analysis.issues.forEach(issue => {
                console.log(\`  Line \${issue.line}: \${issue.message}\`);
              });
            }
          }
          "
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
```

## **Advanced Workflows**

### **Automated Code Review**

```yaml
name: AI Code Review

on:
  pull_request:
    branches: [main]

jobs:
  code-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install WP LLM SDK
        run: pip install wp-llm-python
      
      - name: AI Code Review
        run: |
          python .github/scripts/ai_code_review.py
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**AI Code Review Script** (`.github/scripts/ai_code_review.py`):

```python
import os
import sys
import subprocess
from wp_llm import WPLLMClient
from github import Github

def get_changed_files():
    """Get list of changed files in PR"""
    result = subprocess.run(
        ['git', 'diff', '--name-only', 'origin/main...HEAD'],
        capture_output=True, text=True
    )
    return result.stdout.strip().split('\n')

def analyze_file(client, file_path):
    """Analyze a single file with WP LLM"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        analysis = client.analyze(
            code=content,
            analysis_type="security"
        )
        
        return analysis.issues
    except Exception as e:
        print(f"Error analyzing {file_path}: {e}")
        return []

def create_review_comment(github, pr, file_path, issues):
    """Create review comment on GitHub"""
    if not issues:
        return
    
    comment_body = "## WP LLM Security Analysis\n\n"
    for issue in issues:
        comment_body += f"- **Line {issue.line}**: {issue.message}\n"
        if hasattr(issue, 'suggestion'):
            comment_body += f"  - Suggestion: {issue.suggestion}\n"
    
    pr.create_review_comment(
        body=comment_body,
        commit_id=pr.head.sha,
        path=file_path,
        line=issues[0].line
    )

def main():
    client = WPLLMClient(api_key=os.environ['WP_LLM_API_KEY'])
    github = Github(os.environ['GITHUB_TOKEN'])
    
    # Get PR information
    repo_name = os.environ['GITHUB_REPOSITORY']
    pr_number = int(os.environ['GITHUB_REF'].split('/')[-1])
    
    repo = github.get_repo(repo_name)
    pr = repo.get_pull(pr_number)
    
    # Analyze changed files
    changed_files = get_changed_files()
    
    for file_path in changed_files:
        if file_path.endswith(('.php', '.js', '.css')):
            issues = analyze_file(client, file_path)
            if issues:
                create_review_comment(github, pr, file_path, issues)

if __name__ == "__main__":
    main()
```

### **Automated Testing**

```yaml
name: AI-Powered Testing

on:
  push:
    branches: [main, develop]

jobs:
  ai-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm install
      
      - name: Generate Tests
        run: |
          node .github/scripts/generate_tests.js
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Run Generated Tests
        run: npm test
      
      - name: Upload Test Results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

**Test Generation Script** (`.github/scripts/generate_tests.js`):

```javascript
const { WPLLMClient } = require('@wp-llm/sdk');
const fs = require('fs');
const path = require('path');

const client = new WPLLMClient(process.env.WP_LLM_API_KEY);

async function generateTests() {
  // Find PHP files
  const phpFiles = findPhpFiles('.');
  
  for (const file of phpFiles) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Generate tests for functions and classes
    const testCode = await client.generate({
      prompt: `Generate comprehensive unit tests for this WordPress code:\n\n${content}\n\nInclude tests for all functions, edge cases, and error conditions. Use PHPUnit.`,
      model: 'wp-llm-13b',
      maxTokens: 2048
    });
    
    // Save test file
    const testFile = file.replace('.php', 'Test.php');
    const testDir = path.dirname(testFile);
    
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    fs.writeFileSync(testFile, testCode.choices[0].text);
    console.log(`Generated tests for ${file}`);
  }
}

function findPhpFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'vendor') {
      files.push(...findPhpFiles(fullPath));
    } else if (item.endsWith('.php')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

generateTests().catch(console.error);
```

### **Performance Optimization**

```yaml
name: Performance Analysis

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  performance-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install WP LLM SDK
        run: pip install wp-llm-python
      
      - name: Performance Analysis
        run: |
          python .github/scripts/performance_analysis.py
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Create Performance Report
        run: |
          python .github/scripts/create_report.py
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: performance-report.html
```

## **Deployment Automation**

### **WordPress Plugin Deployment**

```yaml
name: Deploy WordPress Plugin

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install WP LLM SDK
        run: npm install @wp-llm/sdk
      
      - name: Generate Release Notes
        run: |
          node .github/scripts/generate_release_notes.js
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Build Plugin
        run: |
          # Build process
          npm run build
      
      - name: Deploy to WordPress.org
        run: |
          # Deploy to WordPress plugin repository
          svn co https://plugins.svn.wordpress.org/your-plugin-name/ wp-plugin
          cp -r build/* wp-plugin/trunk/
          cd wp-plugin
          svn add trunk/*
          svn commit -m "Release ${{ github.ref_name }}"
        env:
          SVN_USERNAME: ${{ secrets.SVN_USERNAME }}
          SVN_PASSWORD: ${{ secrets.SVN_PASSWORD }}
```

### **Theme Deployment**

```yaml
name: Deploy WordPress Theme

on:
  push:
    branches: [main]

jobs:
  deploy-theme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install WP LLM SDK
        run: pip install wp-llm-python
      
      - name: Optimize Theme
        run: |
          python .github/scripts/optimize_theme.py
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/html/wp-content/themes/
            rm -rf your-theme
            git clone https://github.com/your-username/your-theme.git
            chown -R www-data:www-data your-theme
```

## **Security Workflows**

### **Security Scanning**

```yaml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install WP LLM SDK
        run: pip install wp-llm-python
      
      - name: Security Analysis
        run: |
          python .github/scripts/security_scan.py
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Create Security Report
        run: |
          python .github/scripts/create_security_report.py
      
      - name: Upload Security Report
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: security-report.html
```

**Security Scan Script** (`.github/scripts/security_scan.py`):

```python
import os
import glob
from wp_llm import WPLLMClient

def scan_file(client, file_path):
    """Scan a file for security issues"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    analysis = client.analyze(
        code=content,
        analysis_type="security"
    )
    
    return {
        'file': file_path,
        'issues': analysis.issues,
        'score': analysis.score
    }

def main():
    client = WPLLMClient(api_key=os.environ['WP_LLM_API_KEY'])
    
    # Scan PHP files
    php_files = glob.glob('**/*.php', recursive=True)
    
    results = []
    for file_path in php_files:
        result = scan_file(client, file_path)
        if result['issues']:
            results.append(result)
    
    # Generate report
    if results:
        print("## Security Issues Found\n")
        for result in results:
            print(f"### {result['file']}\n")
            print(f"Security Score: {result['score']}\n")
            
            for issue in result['issues']:
                print(f"- **Line {issue.line}**: {issue.message}")
                if hasattr(issue, 'suggestion'):
                    print(f"  - Suggestion: {issue.suggestion}")
            print()
        
        # Fail the build if critical issues found
        critical_issues = sum(
            1 for result in results 
            for issue in result['issues'] 
            if issue.severity == 'critical'
        )
        
        if critical_issues > 0:
            print(f"❌ {critical_issues} critical security issues found")
            exit(1)
        else:
            print("✅ No critical security issues found")
    else:
        print("✅ No security issues found")

if __name__ == "__main__":
    main()
```

## **Quality Assurance**

### **Code Quality Check**

```yaml
name: Code Quality

on:
  pull_request:
    branches: [main]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install WP LLM SDK
        run: npm install @wp-llm/sdk
      
      - name: Quality Analysis
        run: |
          node .github/scripts/quality_analysis.js
        env:
          WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
      
      - name: Comment Results
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('quality-report.md', 'utf8');
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

## **Best Practices**

### **Environment Variables**

```yaml
env:
  WP_LLM_API_KEY: ${{ secrets.WP_LLM_API_KEY }}
  WP_LLM_MODEL: wp-llm-13b
  WP_LLM_TIMEOUT: 30000
```

### **Caching**

```yaml
- name: Cache WP LLM SDK
  uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### **Error Handling**

```yaml
- name: Run Analysis
  run: |
    node .github/scripts/analysis.js
  continue-on-error: true
  
- name: Check Results
  run: |
    if [ -f "analysis-failed.txt" ]; then
      echo "Analysis failed, but continuing..."
    fi
```

### **Notifications**

```yaml
- name: Notify on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

**Related Documentation:**
- [Cursor IDE Integration](./cursor-ide.md)
- [VS Code Integration](./vs-code.md)
- [WP-CLI Integration](./wp-cli.md)
- [API Reference](../api-reference.md) 