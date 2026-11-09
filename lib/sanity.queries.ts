export const projectsQuery = `*[_type == "project" && (!defined(hidden) || hidden == false) && slug.current != "metrohcmc" && _id != "project-metrohcmc"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order,
  role,
  subtitle,
  statusBadge,
  stats[] {
    value,
    label,
    description
  },
  mainImage,
  toolsUsed,
  liveDemo,
  hideLiveDemo,
  hidden,
  githubFrontend,
  githubBackend
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && slug.current != "metrohcmc" && _id != "project-metrohcmc" && (!defined(hidden) || hidden == false)][0] {
  _id,
  title,
  "slug": slug.current,
  order,
  role,
  subtitle,
  statusBadge,
  stats[] {
    value,
    label,
    description
  },
  mainImage,
  overview,
  problemStatement,
  process {
    tabRationale,
    contentCuration,
    architectureData
  },
  challenges[] {
    title,
    issue,
    attempted,
    solution,
    reason
  },
  results {
    summary,
    modulesCount,
    practicalImpact
  },
  lessons {
    whatToDoDifferently,
    nextSteps
  },
  toolsUsed,
  liveDemo,
  hideLiveDemo,
  hidden,
  githubFrontend,
  githubBackend,
  architectureImage,
  gallery[] {
    "imageUrl": asset->url,
    caption,
    alt
  }
}`

export const profileQuery = `*[_type == "profile"][0] {
  _id,
  name,
  statusText,
  roleTitle,
  location,
  availability,
  headline,
  heroHeadline,
  heroBio,
  capabilitiesHeading,
  capabilities[] {
    title,
    description
  },
  aboutSubtitle,
  aboutParagraphs,
  skills,
  marqueeSkills,
  contactHeading,
  contactSubtitle,
  email,
  socialLinks[] {
    name,
    url
  },
  linkedin,
  github,
  "cvUrl": cvFile.asset->url
}`

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  readingTime,
  tags,
  featured,
  mainImage,
  content
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  readingTime,
  tags,
  featured,
  mainImage,
  content
}`
