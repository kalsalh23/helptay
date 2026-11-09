# taibat-al-imam-fuel

تطبيق ويب عربي (RTL) لتسجيل استلام **100 لتر من مازوت التدفئة** لمدينة طيبة الإمام، مع صفحة ترحيبية (Splash) ونموذج تسجيل متكامل.

## التقنيات
- React 18 + Vite (JavaScript)
- Supabase (Postgres + Storage) عبر `@supabase/supabase-js`
- CSS مخصص (بدون مكتبات UI خارجية)
- نشر على Vercel (Framework: Vite)

## التشغيل المحلي
1. تثبيت الاعتمادات:
   ```bash
   npm install
   ```
2. ضبط متغيرات البيئة في ملف `.env.local` (انظر المثال أدناه).
3. تشغيل خادم التطوير:
   ```bash
   npm run dev
   ```
4. بناء النسخة الإنتاجية:
   ```bash
   npm run build
   ```

## إعداد Supabase
1. أنشئ مشروعًا جديدًا في [Supabase](https://supabase.com).
2. افتح **SQL Editor** وشغّل محتوى الملف [`supabase/schema.sql`](supabase/schema.sql) لإنشاء جدول `fuel_registrations` وسياسات RLS.
3. من **Storage** أنشئ Bucket باسم `family-books` (يفضّل أن يكون Private).
4. انسخ `Project URL` و`anon public key` من إعدادات المشروع وضعهما في `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ملاحظة أمنية: لا تضع `service_role` key في الكود أو في متغيرات الواجهة الأمامية.

## النشر
### GitHub
```bash
git init
git add .
git commit -m "init"
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```

### Vercel
1. استورد المستودع من GitHub في [Vercel](https://vercel.com).
2. تأكد أن Framework = **Vite** (مضبوط أيضًا في `vercel.json`).
3. أضف متغيرات البيئة في Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. نفّذ Deploy.

## بنية المشروع
```
src/
├── components/
│   ├── Splash.jsx
│   ├── Splash.css
│   └── FuelForm.jsx
├── lib/
│   └── supabaseClient.js
├── App.jsx
├── main.jsx
└── index.css
supabase/
└── schema.sql
```