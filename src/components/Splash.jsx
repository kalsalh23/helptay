import { useEffect } from 'react'
import './Splash.css'
import logo from '../assets/im.jpg'

export default function Splash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideSplash()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onDone])

  function hideSplash() {
    const el = document.getElementById('splash-root')
    if (el) {
      el.classList.add('splash-hide')
    }
    setTimeout(() => onDone(), 600)
  }

  return (
    <div id="splash-root" className="splash-container">
      <div className="splash-center">
        <img src={logo} alt="طيبة الإمام" className="splash-logo-img" />
      </div>

      <div className="splash-bottom">
        <div className="splash-progress" aria-hidden="true">
          <div className="splash-progress-bar" />
        </div>
        <div className="splash-credit">
          <span className="splash-author">قصي مهند الصالح</span>
          <span className="splash-sep">•</span>
          <span className="splash-phone" dir="ltr">0952639157</span>
        </div>
        <button type="button" className="splash-skip" onClick={hideSplash}>
          تخطي
        </button>
      </div>
    </div>
  )
}
