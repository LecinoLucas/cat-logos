-- Pioneira Colchões · área restrita do catálogo
-- Como usar: Supabase → SQL Editor → New query → cole TUDO isto → Run.
-- O administrador é o usuário "Admin" (admin@pioneira.local). Crie esse usuário em Authentication → Users com a senha escolhida.

-- ───────── Tabelas ─────────
create table if not exists public.categorias (
  slug       text primary key,
  nome       text not null,
  grupo      text not null default 'Marcas',
  ordem      int  not null default 100,
  ativo      boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.itens (
  id         uuid primary key default gen_random_uuid(),
  categoria  text not null references public.categorias(slug) on update cascade on delete cascade,
  nome       text not null default '',
  url        text not null,          -- foto grande (endereço público)
  thumb      text,                   -- miniatura
  path       text not null,          -- caminho da foto grande no armazenamento (para poder apagar)
  thumb_path text,
  destaque   boolean not null default false,   -- aparece na rolagem da tela inicial
  ordem      int  not null default 0,
  ativo      boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists itens_categoria_idx on public.itens (categoria, ordem);

-- Lista de pessoas que podem administrar (por e-mail de login)
create table if not exists public.admins (
  email text primary key
);

-- ───────── Quem é administrador? ─────────
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ───────── Segurança (RLS): todo mundo LÊ o que está ativo; só administrador ESCREVE ─────────
alter table public.categorias enable row level security;
alter table public.itens      enable row level security;
alter table public.admins     enable row level security;

drop policy if exists "categorias: ler"      on public.categorias;
drop policy if exists "categorias: escrever" on public.categorias;
create policy "categorias: ler"      on public.categorias for select to anon, authenticated using (ativo or public.is_admin());
create policy "categorias: escrever" on public.categorias for all    to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "itens: ler"      on public.itens;
drop policy if exists "itens: escrever" on public.itens;
create policy "itens: ler"      on public.itens for select to anon, authenticated using (ativo or public.is_admin());
create policy "itens: escrever" on public.itens for all    to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins: ver o próprio" on public.admins;
create policy "admins: ver o próprio" on public.admins for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
-- (ninguém adiciona administrador pelo site; só aqui, pelo SQL Editor)

-- ───────── Armazenamento das fotos ─────────
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos: admin envia"  on storage.objects;
drop policy if exists "fotos: admin altera" on storage.objects;
drop policy if exists "fotos: admin apaga"  on storage.objects;
create policy "fotos: admin envia"  on storage.objects for insert to authenticated with check (bucket_id = 'fotos' and public.is_admin());
create policy "fotos: admin altera" on storage.objects for update to authenticated using (bucket_id = 'fotos' and public.is_admin());
create policy "fotos: admin apaga"  on storage.objects for delete to authenticated using (bucket_id = 'fotos' and public.is_admin());

-- ───────── Categorias iniciais ─────────
insert into public.categorias (slug, nome, grupo, ordem) values
  ('king-koil',     'King Koil',      'Marcas',       10),
  ('ecoflex',       'Ecoflex',        'Marcas',       20),
  ('inducol',       'Inducol',        'Marcas',       30),
  ('sealy',         'Sealy',          'Marcas',       40),
  ('simmons',       'Simmons',        'Marcas',       50),
  ('plumatex',      'Plumatex',       'Marcas',       60),
  ('probel',        'Probel',         'Marcas',       70),
  ('outras-marcas', 'Outras marcas',  'Marcas',       80),
  ('cabeceiras',    'Cabeceiras',     'Complementos', 90),
  ('travesseiros',  'Travesseiros',   'Complementos', 100),
  ('protetores',    'Protetores',     'Complementos', 110)
on conflict (slug) do nothing;

-- ───────── Administradores ─────────
insert into public.admins (email) values
  ('admin@pioneira.local')
on conflict (email) do nothing;
