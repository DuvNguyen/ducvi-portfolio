// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// --- Lightbox Image Viewer ---
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
lightbox.className = 'lightbox'
lightbox.innerHTML = `
  <span class="lightbox__close">&times;</span>
  <img class="lightbox__content" src="" alt="Project Screenshot Large">
  <div class="lightbox__caption"></div>
`
document.body.appendChild(lightbox)

const lightboxImg = lightbox.querySelector('.lightbox__content')
const lightboxCaption = lightbox.querySelector('.lightbox__caption')
const lightboxClose = lightbox.querySelector('.lightbox__close')

const openLightbox = (imgSrc, imgAlt) => {
  lightboxImg.src = imgSrc
  lightboxImg.alt = imgAlt || 'Project Screenshot'
  lightboxCaption.textContent = imgAlt || ''
  lightbox.classList.add('lightbox--active')
}

const closeLightbox = () => {
  lightbox.classList.remove('lightbox--active')
  setTimeout(() => {
    if (!lightbox.classList.contains('lightbox--active')) {
      lightboxImg.src = ''
      lightboxCaption.textContent = ''
    }
  }, 300)
}

// Find all clickable project images
const targetImages = document.querySelectorAll(
  '.projects__row-img, .project-details__showcase-img, .project-details__gallery-item img'
)

targetImages.forEach((img) => {
  img.addEventListener('click', (e) => {
    e.stopPropagation()
    openLightbox(img.src, img.alt)
  })
})

lightboxClose.addEventListener('click', (e) => {
  e.stopPropagation()
  closeLightbox()
})

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeLightbox()
  }
})
