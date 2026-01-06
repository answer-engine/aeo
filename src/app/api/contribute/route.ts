import { NextRequest, NextResponse } from 'next/server'

const GITHUB_REPO = 'AEOdev/aeo.dev'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface ContributionPayload {
  title: string
  description: string
  content: string
  section: string
  authorName: string
  authorEmail?: string
  authorGithub?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContributionPayload = await request.json()
    
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub integration not configured' },
        { status: 500 }
      )
    }

    const { title, description, content, section, authorName, authorEmail, authorGithub } = body

    if (!title || !content || !section || !authorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a unique branch name
    const branchName = `contribution/${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`
    
    // Get the default branch SHA
    const repoResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
    
    if (!repoResponse.ok) {
      throw new Error('Failed to fetch repository info')
    }
    
    const repoData = await repoResponse.json()
    const defaultBranch = repoData.default_branch

    // Get the SHA of the default branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/${defaultBranch}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )
    
    if (!refResponse.ok) {
      throw new Error('Failed to fetch branch reference')
    }
    
    const refData = await refResponse.json()
    const baseSha = refData.object.sha

    // Create a new branch
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/git/refs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        }),
      }
    )
    
    if (!createBranchResponse.ok) {
      throw new Error('Failed to create branch')
    }

    // Generate the file path based on section
    const sectionPath = section.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const filePath = `src/app/contributions/${sectionPath}/${titleSlug}/page.mdx`

    // Create the MDX content
    const mdxContent = `export const metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${description.replace(/'/g, "\\'")}',
}

# ${title}

${content}

---

*Contributed by ${authorName}${authorGithub ? ` ([@${authorGithub}](https://github.com/${authorGithub}))` : ''}*
`

    // Create the file
    const createFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add contribution: ${title}`,
          content: Buffer.from(mdxContent).toString('base64'),
          branch: branchName,
        }),
      }
    )
    
    if (!createFileResponse.ok) {
      throw new Error('Failed to create file')
    }

    // Create the pull request
    const prBody = `## New Contribution

**Title:** ${title}
**Section:** ${section}
**Author:** ${authorName}${authorGithub ? ` (@${authorGithub})` : ''}${authorEmail ? `\n**Email:** ${authorEmail}` : ''}

### Description
${description}

---

*This PR was automatically created via the AEO.dev contribution form.*
`

    const createPrResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/pulls`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `[Contribution] ${title}`,
          body: prBody,
          head: branchName,
          base: defaultBranch,
        }),
      }
    )
    
    if (!createPrResponse.ok) {
      throw new Error('Failed to create pull request')
    }
    
    const prData = await createPrResponse.json()

    return NextResponse.json({
      success: true,
      prUrl: prData.html_url,
      prNumber: prData.number,
    })
  } catch (error) {
    console.error('Contribution error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create contribution' },
      { status: 500 }
    )
  }
}

