# How to Update GitHub Repository

## Quick Reference

After making changes to your code, follow these 4 steps:

```bash
# 1. Check what changed
git status

# 2. Stage your changes
git add .

# 3. Commit with a message
git commit -m "Your descriptive message"

# 4. Push to GitHub
git push origin main
```

## Detailed Steps

### Step 1: See What Changed
```bash
git status
```
This shows you:
- Modified files (in red)
- Untracked files (new files you created)
- Files ready to be committed (in green)

### Step 2: Stage Your Changes
You have two options:

**Option A: Stage ALL changes**
```bash
git add .
```

**Option B: Stage specific files**
```bash
git add src/components/MyComponent.tsx
git add src/app/page.tsx
```

### Step 3: Commit
```bash
git commit -m "Describe what you changed"
```

**Good commit messages:**
- `"Add dark mode toggle"`
- `"Fix navigation menu on mobile"`
- `"Update Data Analyst roadmap steps"`
- `"Add new career: DevOps Engineer"`

### Step 4: Push to GitHub
```bash
git push origin main
```

Your changes are now on GitHub! 🎉

## Example Workflow

Let's say you updated the homepage:

```bash
# 1. See what changed
git status
# Output: modified: src/app/page.tsx

# 2. Stage the changes
git add src/app/page.tsx

# 3. Commit
git commit -m "Update homepage hero section"

# 4. Push to GitHub
git push origin main
```

## Common Commands

```bash
# Undo changes in a file (BEFORE git add)
git checkout -- filename.tsx

# Unstage a file (AFTER git add, BEFORE git commit)
git reset HEAD filename.tsx

# See your commit history
git log

# Pull latest changes from GitHub
git pull origin main

# Check current branch
git branch

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Quick Copy-Paste Commands

**For small changes:**
```bash
git add .
git commit -m "Quick update"
git push origin main
```

**For reviewing before committing:**
```bash
git status
git diff
git add .
git commit -m "Your message"
git push origin main
```

## Troubleshooting

**"Your branch is ahead of origin/main"**
- Just run: `git push origin main`

**"Please commit your changes or stash them"**
- Commit first: `git commit -m "message"`
- Or stash: `git stash` (saves changes temporarily)

**"Updates were rejected"**
- Pull first: `git pull origin main`
- Then push: `git push origin main`

## Need Help?

- GitHub Docs: https://docs.github.com/en/get-started
- Git Tutorial: https://learngitbranching.js.org/

