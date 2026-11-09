-- جدول تسجيل استلام مازوت التدفئة
create table if not exists fuel_registrations (
  id bigint primary key generated always as identity,
  full_name text not null,
  wife_name text not null,
  national_id text not null,
  family_book_no text not null,
  phone text not null,
  neighborhood text not null,
  family_book_image_url text,
  created_at timestamptz default now()
);

alter table fuel_registrations enable row level security;

-- السماح بالإدخال للمستخدم المجهول (anon)
create policy "allow anon insert"
on fuel_registrations for insert
to anon with check (true);

-- ملاحظة: أنشئ bucket باسم family-books (Private) من لوحة Supabase Storage
-- السماح برفع الملفات للمستخدم المجهول (anon)
create policy "allow anon upload"
on storage.objects for insert
to anon
with check (bucket_id = 'family-books');