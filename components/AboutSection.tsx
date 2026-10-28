import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface AboutSectionProps {
  profile: ProfileData
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="about sec-pad">
      <div className="main-container">
        <h2 className="heading heading-sec heading-sec__mb-med">
          <span className="heading-sec__main">About Me</span>
          <span className="heading-sec__sub">{profile.aboutSubtitle}</span>
        </h2>
        <div className="about__content">
          <div className="about__content-main">
            <h3 className="about__content-title">Get to know me!</h3>
            <div className="about__content-details">
              {profile.aboutParagraphs.map((para, idx) => (
                <p key={idx} className="about__content-details-para">
                  {para}
                </p>
              ))}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="btn btn--med btn--theme dynamicBgClr"
            >
              Email Me
            </a>
          </div>
          <div className="about__content-skills">
            <h3 className="about__content-title">My Skills</h3>
            <div className="skills">
              {profile.skills.map((skill, idx) => (
                <div key={idx} className="skills__skill">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
