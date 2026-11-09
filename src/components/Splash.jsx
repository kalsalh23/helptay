import { useEffect } from 'react'
import './Splash.css'

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
      el.style.opacity = '0'
      el.style.visibility = 'hidden'
      el.style.transition = 'opacity 0.6s ease, visibility 0.6s'
    }
    setTimeout(() => onDone(), 600)
  }

  return (
    <div id="splash-root" className="splash-container">
      <div className="splash-content">
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          xmlns="http://www.w3.org/2000/svg"
          className="splash-logo float"
        >
          <circle cx="65" cy="65" r="60" fill="#2d4a3e" />
          <path
            d="M 30 50 Q 65 20 100 50 Q 65 80 30 50 Z"
            fill="#2d4a3e"
            opacity="0.9"
          />
          <path
            d="M 25 55 Q 65 25 105 55 Q 65 85 25 55 Z"
            fill="#2d4a3e"
            opacity="0.7"
          />
          <circle cx="65" cy="55" r="14" fill="#faf9f6" />
          <circle cx="65" cy="55" r="6" fill="#2d4a3e" />
          <circle cx="58" cy="50" r="2.5" fill="#faf9f6" />
          <circle cx="72" cy="50" r="2.5" fill="#faf9f6" />
          <path
            d="M 55 68 Q 65 75 75 68"
            stroke="#2d4a3e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 45 85 Q 65 100 85 85"
            stroke="#c9a86a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 20 35 Q 30 25 35 35"
            stroke="#c9a86a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 110 35 Q 100 25 95 35"
            stroke="#c9a86a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="35" cy="95" r="3" fill="#c9a86a" />
          <circle cx="95" cy="95" r="3" fill="#c9a86a" />
          <circle cx="65" cy="110" r="2.5" fill="#c9a86a" />
        </svg>

        <h1 className="splash-title">طيبة الإمام</h1>
        <p className="splash-subtitle">منصة خدمات المواطنين</p>
        <p className="splash-desc">
          سجّل بياناتك للحصول على{' '}
          <span className="highlight">100 لتر</span> من مازوت
          التدفئة، ارفع صورة دفتر العائلة وأكمل التسجيل
          في دقيقة واحدة
        </p>

        <div className="splash-loader-wrap">
          <svg width="64" height="64" viewBox="0 0 64 64" className="spinner">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#e8e5df"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#2d4a3e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="163.36"
              strokeDashoffset="163.36"
              style={{ animation: 'dashoffset 5s linear forwards' }}
              transform="rotate(-90 32 32)"
            />
          </svg>
        </div>

        <div className="splash-footer">
          <p className="splash-author">قصي مهند الصالح</p>
          <p className="splash-phone" dir="ltr">0952639157</p>
        </div>

        <button className="splash-skip" onClick={hideSplash}>
          تخطي
        </button>
      </div>
    </div>
  )
}