import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { ambassadors } = await request.json();
    
    // Get GitHub token from environment
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER || 'YeonV';
    const repoName = process.env.GITHUB_REPO_NAME || 'talent-kids-foundation';
    
    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured. Please set GITHUB_TOKEN in .env.local' },
        { status: 500 }
      );
    }

    const branchName = `update-ambassadors-${Date.now()}`;
    const fileName = 'src/data/ambassadors.json';
    const fileContent = JSON.stringify(ambassadors, null, 2);
    
    // 1. Get the default branch reference
    const mainBranchResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    if (!mainBranchResponse.ok) {
      throw new Error('Failed to get main branch');
    }
    
    const mainBranch = await mainBranchResponse.json();
    const mainSha = mainBranch.object.sha;

    // 2. Create a new branch
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: mainSha,
        }),
      }
    );

    if (!createBranchResponse.ok) {
      throw new Error('Failed to create branch');
    }

    // 3. Get current file SHA (to update, not create new)
    const currentFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}?ref=${branchName}`,
      {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let fileSha = '';
    if (currentFileResponse.ok) {
      const currentFile = await currentFileResponse.json();
      fileSha = currentFile.sha;
    }

    // 4. Update or create the file
    const updateFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update ambassadors data',
          content: Buffer.from(fileContent).toString('base64'),
          branch: branchName,
          ...(fileSha && { sha: fileSha }),
        }),
      }
    );

    if (!updateFileResponse.ok) {
      const error = await updateFileResponse.json();
      throw new Error(`Failed to update file: ${error.message}`);
    }

    // 5. Create Pull Request
    const createPRResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Update Ambassadors Data',
          head: branchName,
          base: 'main',
          body: `This PR updates the ambassadors data.\n\nTotal ambassadors: ${ambassadors.length}\n\nGenerated automatically from the Ambassador Editor.`,
        }),
      }
    );

    if (!createPRResponse.ok) {
      const error = await createPRResponse.json();
      throw new Error(`Failed to create PR: ${error.message}`);
    }

    const pr = await createPRResponse.json();

    return NextResponse.json({
      success: true,
      prUrl: pr.html_url,
      prNumber: pr.number,
    });

  } catch (error) {
    console.error('Error creating PR:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
