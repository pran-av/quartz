---
date: 2025-12-28
tags:
  - "#engineering"
title: Git Workflows for Everyday Reference
---
## Team safe way to deploy a branch to production

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

## Mistake: Branched `dev` and developed a new feature over it

Last week, I wanted to redesign the landing page for Pitch Like This. Made a mistake of branching the `dev` branch instead of `main`. Dev branch already had an entire epic - think database migration, API integrations, UI changes and what not.

Thankfully when it came to merging, I created the PR and went through the list of commits and that's when my mistake occurred to me.

Next, without knowing I could cherry pick commits using git (thankfully I atleast committed diligently) - I developed a feature flag that would hide the UI elements and API triggers based on an environment variable value.

After wasting the AI credits into the feature flag - I got to know that I could simply cherry pick the landing page commits into a new `main` branch.

```
git checkout main
git checkout -b feat/landing-page-redesign-cherrypick

git cherry-pick abc123^.. xyz890
```

## Cleaning up branches in local

I have been doing "squash and merge" for PRs on my remote repository. This means a completely new commit is generated with all combined commits from my branch.

This means that henceforth on production - I could only revert the whole branch merge and not individual commits if any failures occur. And if the feature branch is well unit tested and UAT is completed - this should not be an issue.

However this paragraph is about how to clean up the local post merging the main.

So when I squash and merge and then git fetch my main - my local git does not understand that the merge has been successful (because of how squashing works) - hence the safest way of deleting local branches is as follows:

```
[delete merged branches from the PR timeline on your Remote]

git fetch --prune (delinks the local branches if no more remote found)

git branch -vv | grep ': gone]' (lists all the branches that have been pruned from remote)

git branch -D branch-name (force deletes each branch locally)
```

