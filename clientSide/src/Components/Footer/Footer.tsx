import React from 'react'
import TheMovieDatabaseIcon from '../../assets/Icons/TheMovieDatabaseIcon'
import { Facebook, GitHub, LinkedIn, Twitter } from '../../assets/Icons/SocialMediaIcons'

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <ul>
            <span class="footer-title">Frontend</span>
            <li class="footer-item">HTML</li>
            <li class="footer-item">SCSS</li>
            <li class="footer-item">TypeScript</li>
            <li class="footer-item">React</li>
          </ul>
          <ul>
            <span class="footer-title">Backend</span>
            <li class="footer-item">Node.js</li>
            <li class="footer-item">Express</li>
            <li class="footer-item">MongoDB</li>
            <li class="footer-item">Mongoose</li>
          </ul>
          <ul>
            <span class="footer-title">Tools</span>
            <li class="footer-item">VS Code</li>
            <li class="footer-item">Insomnia</li>
            <li class="footer-item">Figma</li>
          </ul>
          <ul>
            <span class="footer-title">Fonts</span>
            <li class="footer-item">Roboto</li>
            <li class="footer-item">Roboto Condensed</li>
            <li class="footer-item">Passion One</li>
          </ul>
          <ul class="footer-api">
            <span class="footer-title">API Used</span>
            <a href="https://themoviedb.org/">
              <TheMovieDatabaseIcon />
            </a>
          </ul>
        </div>
        <div class="contact-info">
          <div class="contact-item">
            <span class="footer-title">Get in touch</span>
            <span class="footer-item">calderon.miko.00149@dyci.edu.ph</span>
          </div>
          <div class="contact-item">
            <span class="footer-title">Follow me on social media</span>
            <div class="social-media">
              <a href="https://x.com/Utamikoo">
                <Twitter />
              </a>
              <a href="https://github.com/humblecode07">
                <GitHub />
              </a>
              <a href="https://www.linkedin.com/in/mkcldrn777/">
                <LinkedIn />
              </a>
              <a href="https://www.facebook.com/MKCLDRN">
                <Facebook />
              </a>
            </div>
          </div>
          <span class="footer-copy">© 2024 tskr<span className='text-[#FF8731]'>!</span> All rights reserved.</span>
        </div>
      </div>
    </footer>

  )
}

export default Footer
