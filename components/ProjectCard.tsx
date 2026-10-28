import React from 'react'
import Link from 'next/link'
import type { ProjectItem } from '@/lib/defaultData'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.imageUrl || '/assets/png/studymate/homepage.png'

  return (
    <div className="projects__row">
      <div className="projects__row-img-cont">
        <img
          src={imageSrc}
          alt={`${project.title} Screenshot`}
          className="projects__row-img"
          loading="lazy"
        />
      </div>
      <div className="projects__row-content">
        <h3 className="projects__row-content-title">{project.title}</h3>
        <p className="projects__row-content-desc">{project.subtitle}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="btn btn--med btn--theme dynamicBgClr"
        >
          Case Study
        </Link>
      </div>
    </div>
  )
}
