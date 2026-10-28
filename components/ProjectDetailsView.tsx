'use client'

import React, { useState, useEffect } from 'react'
import type { ProjectItem } from '@/lib/defaultData'

interface ProjectDetailsViewProps {
  project: ProjectItem
}

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setActiveLightboxImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showcaseImage = project.imageUrl || '/assets/png/studymate/homepage.png'

  return (
    <>
      <section className="project-cs-hero">
        <div className="project-cs-hero__content">
          <h1 className="heading-primary">{project.title}</h1>
          <div className="project-cs-hero__info">
            <p className="text-primary">{project.subtitle}</p>
          </div>
          <div className="project-cs-hero__cta">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                className="btn btn--bg"
                target="_blank"
                rel="noreferrer"
              >
                Live Demo
              </a>
            )}
            {project.githubBackend && (
              <a
                href={project.githubBackend}
                className={`btn btn--bg ${project.liveDemo ? 'btn--hero-inv' : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                {project.githubFrontend ? 'Backend Repo' : 'GitHub Repo'}
              </a>
            )}
            {project.githubFrontend && (
              <a
                href={project.githubFrontend}
                className="btn btn--bg btn--hero-inv"
                target="_blank"
                rel="noreferrer"
              >
                Frontend Repo
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="project-details">
        <div className="main-container">
          <div className="project-details__content">
            <div className="project-details__showcase-img-cont">
              <img
                src={showcaseImage}
                alt={`${project.title} Homepage`}
                className="project-details__showcase-img"
                onClick={() =>
                  setActiveLightboxImage({
                    src: showcaseImage,
                    alt: `${project.title} Homepage`,
                  })
                }
                style={{ cursor: 'pointer' }}
              />
            </div>

            <div className="project-details__content-main">
              {project.overview && project.overview.length > 0 && (
                <div className="project-details__desc">
                  <h3 className="project-details__content-title">Project Overview</h3>
                  {project.overview.map((para, idx) => (
                    <p key={idx} className="project-details__desc-para">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {project.toolsUsed && project.toolsUsed.length > 0 && (
                <div className="project-details__tools-used">
                  <h3 className="project-details__content-title">Tools Used</h3>
                  <div className="skills">
                    {project.toolsUsed.map((tool, idx) => (
                      <div key={idx} className="skills__skill">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="project-details__links">
                <h3 className="project-details__content-title">
                  {project.githubFrontend || project.githubBackend ? 'See Code' : 'Project Links'}
                </h3>
                <div className="project-details__links-btn-cont">
                  {project.githubBackend && (
                    <a
                      href={project.githubBackend}
                      className="btn btn--med btn--theme project-details__links-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.githubFrontend ? 'Backend Repo' : 'Code Repo'}
                    </a>
                  )}
                  {project.githubFrontend && (
                    <a
                      href={project.githubFrontend}
                      className="btn btn--med btn--theme-inv project-details__links-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Frontend Repo
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      className="btn btn--med btn--theme dynamicBgClr project-details__links-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="project-details__gallery">
                <h3 className="project-details__gallery-title">Project Screenshots</h3>
                <div className="project-details__gallery-grid">
                  {project.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="project-details__gallery-item"
                      onClick={() =>
                        setActiveLightboxImage({
                          src: item.imageUrl,
                          alt: item.caption || `Screenshot ${idx + 1}`,
                        })
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={item.imageUrl} alt={item.caption || `Screenshot ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Original Dopefolio Lightbox Viewer */}
      <div
        id="lightbox"
        className={`lightbox ${activeLightboxImage ? 'lightbox--active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveLightboxImage(null)
          }
        }}
      >
        <span
          className="lightbox__close"
          onClick={() => setActiveLightboxImage(null)}
        >
          &times;
        </span>
        {activeLightboxImage && (
          <>
            <img
              className="lightbox__content"
              src={activeLightboxImage.src}
              alt={activeLightboxImage.alt || 'Project Screenshot Large'}
            />
            <div className="lightbox__caption">{activeLightboxImage.alt || ''}</div>
          </>
        )}
      </div>
    </>
  )
}
