create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('prestamo', 'inversion')),
  inputs jsonb not null,
  resultado jsonb not null,
  contacto jsonb,
  evento text,
  vendedor text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "leads_insert_anon" on public.leads
  for insert
  to anon
  with check (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_tipo_idx on public.leads (tipo);
create index if not exists leads_evento_idx on public.leads (evento);
