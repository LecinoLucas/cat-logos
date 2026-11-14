// Conexão com o Supabase (área restrita /admin). Estes dois valores são PÚBLICOS por natureza: pode deixar no repositório.
// Quem protege os dados é o login + as regras do banco (arquivo supabase/schema.sql), e não o sigilo desta chave.
// Nunca coloque aqui a chave "service_role".
window.SUPABASE = {
  url: "",   // ex.: "https://abcdxyz.supabase.co"
  key: "",   // chave "anon public" (Project Settings → API)
  loginDomain: "pioneira.local"   // "Admin" na tela de login = admin@pioneira.local no Supabase
};
