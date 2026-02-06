# Ambassador Editor - Setup Instructions

## Security

### Admin Password

The admin section is protected by a password. Set it in your `.env.local`:

```env
ADMIN_PASSWORD=your_secure_password_here
```

Default password is `admin123` (change this immediately!).

## GitHub Integration

To enable the "Create Pull Request" feature, you need to set up GitHub API access:

### 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Talent Kids Foundation Editor"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. Copy the token (you won't see it again!)

### 2. Configure Environment Variables

Create a file `.env.local` in the root directory with:

```env
# Admin Password
ADMIN_PASSWORD=your_secure_password_here

# GitHub Integration
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO_OWNER=your-github-username
GITHUB_REPO_NAME=talent-kids-foundation
```

Replace:
- `your_github_token_here` with your actual token
- `your-github-username` with your GitHub username
- `talent-kids-foundation` with your repo name if different

### 3. Restart Development Server

```bash
npm run dev
```

## How It Works

1. Edit ambassadors in the editor at `/admin/ambassadors`
2. Click "Create Pull Request"
3. The system will:
   - Create a new branch
   - Update `src/data/ambassadors.json`
   - Create a Pull Request
   - Open the PR in your browser
4. Review and merge the PR on GitHub

## Security Notes

- Never commit `.env.local` to Git
- Keep your GitHub token secure
- The token has write access to your repository
- Rotate tokens periodically
