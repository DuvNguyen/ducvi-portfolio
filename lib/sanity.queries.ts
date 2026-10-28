export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order,
  subtitle,
  statusBadge,
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
  subtitle,
  statusBadge,
  mainImage,
  overview,
  toolsUsed,
  liveDemo,
  githubFrontend,
  githubBackend,
  architectureImage,
  gallery
}`

export const profileQuery = `*[_type == "profile"][0] {
  _id,
  name,
  statusText,
  headline,
  heroBio,
  aboutSubtitle,
  aboutParagraphs,
  skills,
  email,
  linkedin,
  github,
  "cvUrl": cvFile.asset->url
}`
