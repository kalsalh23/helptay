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
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    setError('')
    if (!selected) return
    if (!selected.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح.')
      return
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('حجم الصورة يجب ألا يتجاوز 5 ميغابايت.')
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  function removeFile() {
    setFile(null)
    setPreview('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // التحقق من الحقول
    if (!/^\d{6,12}$/.test(formData.nationalId)) {
      setError('الرقم الوطني يجب أن يكون بين 6 و 12 رقمًا.')
      return
    }
    if (!/^09\d{8}$/.test(formData.phone)) {
      setError('رقم الموبايل يجب أن يبدأ بـ 09 ويتكون من 10 أرقام.')
      return
    }
    if (!file) {
      setError('يرجى رفع صورة دفتر العائلة.')
      return
    }

    setLoading(true)
    try {
      // رفع الصورة إلى Supabase Storage
      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('family-books')
        .upload(fileName, file)

      if (uploadError) throw uploadError

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
            family_book_image_url: fileName,
          },
        ])

      if (insertError) throw insertError

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
                  required
                  maxLength={12}
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
                  required
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
                  required
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

          <div className="section">
            <h2 className="section-title">صورة دفتر العائلة</h2>
            <div className="row">
              <div className="field">
                {!file ? (
                  <label className="file-upload" htmlFor="fileInput">
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                    <span className="file-upload-text">اضغط هنا لرفع صورة دفتر العائلة</span>
                    <span className="file-upload-hint">الصيغ المدعومة: صور فقط (بحد أقصى 5MB)</span>
                  </label>
                ) : (
                  <div className="file-preview">
                    <img src={preview} alt="معاينة دفتر العائلة" />
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <button type="button" className="file-remove" onClick={removeFile}>
                        حذف الصورة
                      </button>
                    </div>
                  </div>
                )}
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
