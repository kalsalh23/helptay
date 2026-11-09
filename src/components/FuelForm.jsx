import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const NEIGHBORHOODS = [
  'الحي الشمالي',
  'الحي الجنوبي',
  'الحي الشرقي',
  'الحي الغربي',
  'وسط المدينة',
]

export default function FuelForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    wifeName: '',
    nationalId: '',
    familyBookNo: '',
    phone: '',
    neighborhood: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    // السماح بالأرقام فقط للحقول الرقمية
    if (name === 'nationalId' || name === 'familyBookNo') {
      const digits = value.replace(/\D/g, '')
      const max = name === 'nationalId' ? 11 : 9
      setFormData((prev) => ({ ...prev, [name]: digits.slice(0, max) }))
      return
    }
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      setFormData((prev) => ({ ...prev, [name]: digits.slice(0, 10) }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // التحقق من الحقول
    if (!/^\d{11}$/.test(formData.nationalId)) {
      setError('الرقم الوطني يجب أن يتكون من 11 رقمًا.')
      return
    }
    if (!/^\d{9}$/.test(formData.familyBookNo)) {
      setError('رقم دفتر العائلة يجب أن يتكون من 9 أرقام.')
      return
    }
    if (!/^09\d{8}$/.test(formData.phone)) {
      setError('رقم الموبايل يجب أن يبدأ بـ 09 ويتكون من 10 أرقام.')
      return
    }

    setLoading(true)
    try {
      // إدخال البيانات في الجدول
      const { error: insertError } = await supabase
        .from('fuel_registrations')
        .insert([
          {
            full_name: formData.fullName,
            wife_name: formData.wifeName,
            national_id: formData.nationalId,
            family_book_no: formData.familyBookNo,
            phone: formData.phone,
            neighborhood: formData.neighborhood,
          },
        ])

      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error('رقم دفتر العائلة مسجل مسبقًا.')
        }
        throw insertError
      }

      setSuccess(true)
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="page-wrap">
        <div className="form-card">
          <div className="form-header">
            <h1>تسجيل استلام مازوت التدفئة</h1>
            <span className="badge">الكمية المخصصة: 100 لتر لكل مواطن</span>
          </div>
          <div className="success-message">
            تم تسجيل بياناتك بنجاح، سيتم التواصل معك لاستلام 100 لتر من مازوت التدفئة.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrap">
      <div className="form-card">
        <div className="form-header">
          <h1>تسجيل استلام مازوت التدفئة</h1>
          <span className="badge">الكمية المخصصة: 100 لتر لكل مواطن</span>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          <div className="section">
            <h2 className="section-title">البيانات الشخصية</h2>
            <div className="row two-cols">
              <div className="field">
                <label htmlFor="fullName">الاسم الكامل</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="wifeName">اسم الزوجة</label>
                <input
                  id="wifeName"
                  name="wifeName"
                  type="text"
                  required
                  value={formData.wifeName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row two-cols">
              <div className="field">
                <label htmlFor="nationalId">الرقم الوطني</label>
                <input
                  id="nationalId"
                  name="nationalId"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  required
                  maxLength={11}
                  placeholder="11 رقمًا"
                  value={formData.nationalId}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="familyBookNo">رقم دفتر العائلة</label>
                <input
                  id="familyBookNo"
                  name="familyBookNo"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  required
                  maxLength={9}
                  placeholder="9 أرقام"
                  value={formData.familyBookNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="phone">رقم الموبايل</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  maxLength={10}
                  placeholder="09xxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">بيانات السكن</h2>
            <div className="row">
              <div className="field">
                <label htmlFor="neighborhood">الحي</label>
                <select
                  id="neighborhood"
                  name="neighborhood"
                  required
                  value={formData.neighborhood}
                  onChange={handleChange}
                >
                  <option value="">اختر الحي</option>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>
        </form>

        <div className="form-footer">
          جميع البيانات محفوظة لدى الجهات المختصة في مدينة طيبة الإمام
        </div>
      </div>
    </div>
  )
}
