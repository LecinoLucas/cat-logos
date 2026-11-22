// Conexão com o Supabase (área restrita /admin). Estes dois valores são PÚBLICOS por natureza: pode deixar no repositório.
// Quem protege os dados é o login + as regras do banco (arquivo supabase/schema.sql), e não o sigilo desta chave.
// Nunca coloque aqui a chave "service_role".
window.SUPABASE = {
  url: "https://xgcjcpqeowotlfumettz.supabase.co",   // ex.: "https://abcdxyz.supabase.co"
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnY2pjcHFlb3dvdGxmdW1ldHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ2MTYzNTIsImV4cCI6MjExMDE5MjM1Mn0.jCgsli59k76DIVCXAVEVb_q33YmsFa1iLuC5re5Z0eQ",   // chave "anon public" (Project Settings → API)
  loginDomain: "pioneira.local"   // "Admin" na tela de login = admin@pioneira.local no Supabase
};
