'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // On the homepage, the Bento Hero card includes its own integrated navigation bar
  if (pathname === '/') {
    return null
  }

  return (
    <header className="header">
      <div className="header__content">
        <Link href="/" className="header__logo-container">
          <div className="header__logo-img-cont">
            <img
              src="/assets/png/avatar.png"
              alt="Vi Nguyen Logo Image"
              className="header__logo-img"
            />
          </div>
          <span className="header__logo-sub">Vi Nguyen</span>
        </Link>
        <div className="header__main">
          <ul className="header__links">
            <li className="header__link-wrapper">
              <Link href="/" className="header__link">
                {' '}
                Home{' '}
              </Link>
            </li>
            <li className="header__link-wrapper">
              <Link href="/#about" className="header__link">
                About{' '}
              </Link>
            </li>
            <li className="header__link-wrapper">
              <Link href="/#projects" className="header__link">
                Projects
              </Link>
            </li>
          </ul>
          <div
            className="header__main-ham-menu-cont"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <img
              src="/assets/svg/ham-menu.svg"
              alt="hamburger menu"
              className={`header__main-ham-menu ${mobileMenuOpen ? 'd-none' : ''}`}
            />
            <img
              src="/assets/svg/ham-menu-close.svg"
              alt="hamburger menu close"
              className={`header__main-ham-menu-close ${mobileMenuOpen ? '' : 'd-none'}`}
            />
          </div>
        </div>
      </div>
      <div className={`header__sm-menu ${mobileMenuOpen ? 'header__sm-menu--active' : ''}`}>
        <div className="header__sm-menu-content">
          <ul className="header__sm-menu-links">
            <li className="header__sm-menu-link">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                {' '}
                Home{' '}
              </Link>
            </li>
            <li className="header__sm-menu-link">
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>
                {' '}
                About{' '}
              </Link>
            </li>
            <li className="header__sm-menu-link">
              <Link href="/#projects" onClick={() => setMobileMenuOpen(false)}>
                {' '}
                Projects{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
