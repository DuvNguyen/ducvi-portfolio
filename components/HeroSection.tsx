import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface HeroSectionProps {
  profile: ProfileData
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <h1 className="heading-primary">{profile.headline}</h1>
        <div className="home-hero__info">
          <p className="text-primary">{profile.heroBio}</p>
        </div>
        <div className="home-hero__cta">
          <a href="#projects" className="btn btn--bg">
            Projects
          </a>
          <a
            href={profile.cvUrl || '/assets/cv.pdf'}
            className="btn btn--bg btn--hero-inv"
            target="_blank"
            rel="noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>
      <div className="home-hero__socials">
        <div className="home-hero__social">
          <a
            href={profile.linkedin}
            className="home-hero__social-icon-link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/png/linkedin-ico.png"
              alt="icon"
              className="home-hero__social-icon"
            />
          </a>
        </div>
        <div className="home-hero__social">
          <a
            href={profile.github}
            className="home-hero__social-icon-link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/assets/png/github-ico.png"
              alt="icon"
              className="home-hero__social-icon"
            />
          </a>
        </div>
      </div>
      <div className="home-hero__mouse-scroll-cont">
        <div className="mouse"></div>
      </div>
    </section>
  )
}
