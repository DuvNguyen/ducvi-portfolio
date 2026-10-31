export const projectsQuery = `*[_type == "project"] | order(order asc) {
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
  githubFrontend,
  githubBackend
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
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
