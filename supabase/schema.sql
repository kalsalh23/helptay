-- جدول تسجيل استلام مازوت التدفئة
create table if not exists fuel_registrations (
  id bigint primary key generated always as identity,
  full_name text not null,
  wife_name text not null,
  national_id text not null,
  family_book_no text not null,
  phone text not null,
  neighborhood text not null,
  created_at timestamptz default now()
);

-- منع تكرار رقم دفتر العائلة
create unique index if not exists fuel_registrations_family_book_no_key
  on fuel_registrations (family_book_no);

alter table fuel_registrations enable row level security;

-- السماح بالإدخال للمستخدم المجهول (anon)
create policy "allow anon insert"
on fuel_registrations for insert
to anon with check (true);