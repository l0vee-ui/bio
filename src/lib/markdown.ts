import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface BioData {
  name: string
  title: string
  bio: string
  location: string
  email: string
  github: string
  linkedin: string
  twitter: string
  skills: string[]
  projects: Array<{
    name: string
    description: string
    tech: string[]
    link: string
  }>
  html?: string
}

export async function getBio(): Promise<BioData> {
  const contentDir = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDir, 'bio.md')
  
  if (!fs.existsSync(filePath)) {
    throw new Error('bio.md not found in content directory')
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const rawMarkdown = content.trim() || (typeof data.bio === 'string' ? data.bio : '')
  const processed = await remark()
    .use(remarkHtml)
    .process(rawMarkdown)

  const html = processed.toString()

  return {
    name: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    skills: [],
    projects: [],
    ...data,
    html,
  } as BioData
}