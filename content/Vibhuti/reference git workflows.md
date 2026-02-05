---
date: 2025-12-28
tags:
  - "#engineering"
title: Git Workflows for Everyday Reference
---
## Deployment from `dev` to `prod` (Team safe)

### 1. Fetch all branches and sync the main

```
git fetch --all
git checkout main
git pull origin main
```

### 2. Sync dev and resolve any conflicts

```
git checkout dev
git pull origin dev
git merge main
```

### 3. Merge to Production
```
git checkout main
git merge dev
```

### 4. Tag Version and Push to Remote

```
git tag -a v0.0.0 -m "some fixes"
git push origin main --tags
```

