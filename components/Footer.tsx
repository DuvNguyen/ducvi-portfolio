import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface FooterProps {
  profile: ProfileData
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="main-footer">
      <div className="main-container">
        <div className="main-footer__upper">
          <div className="main-footer__row main-footer__row-1">
            <h2 className="heading heading-sm main-footer__heading-sm">
              <span>Social</span>
            </h2>
            <div className="main-footer__social-cont">
              <a target="_blank" rel="noreferrer" href={profile.linkedin}>
                <img
                  className="main-footer__icon"
                  src="/assets/png/linkedin-ico.png"
                  alt="icon"
                />
              </a>
              <a target="_blank" rel="noreferrer" href={profile.github}>
                <img
                  className="main-footer__icon"
                  src="/assets/png/github-ico.png"
                  alt="icon"
                />
              </a>
            </div>
          </div>
          <div className="main-footer__row main-footer__row-2">
            <h4 className="heading heading-sm text-lt">{profile.name}</h4>
            <p className="main-footer__short-desc">
              A final-year IT student building web applications and learning through every project.
            </p>
          </div>
        </div>

        <div className="main-footer__lower">
          &copy; Copyright 2026. Made by{' '}
          <a rel="noreferrer" target="_blank" href={profile.github}>
            {profile.name}
          </a>
        </div>
      </div>
    </footer>
  )
}
