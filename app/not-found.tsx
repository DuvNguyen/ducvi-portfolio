import React from 'react'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { defaultProfile } from '@/lib/defaultData'

export default function NotFound() {
  return (
    <>
      <section
        className="home-hero"
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div className="home-hero__content" style={{ maxWidth: '80rem', margin: 'auto' }}>
          <h1
            className="heading-primary"
            style={{
              fontSize: '10rem',
              fontWeight: 800,
              lineHeight: 1,
              marginBottom: '2rem',
              letterSpacing: '2px',
            }}
          >
            404
          </h1>
          <div className="home-hero__info" style={{ marginBottom: '4rem' }}>
            <p
              className="text-primary"
              style={{
                fontSize: '2.4rem',
                lineHeight: 1.6,
                fontWeight: 600,
              }}
            >
              Sorry, maybe we are not thinking of the same place!
            </p>
          </div>
          <div className="home-hero__cta">
            <Link href="/" className="btn btn--bg">
              Go Back Home
            </Link>
          </div>
        </div>
      </section>
      <Footer profile={defaultProfile} />
    </>
  )
}
