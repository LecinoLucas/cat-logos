# Área restrita (/admin) — como ligar

O catálogo continua funcionando sem isto. Depois de ligar, quem tem login sobe as fotos em
`https://SEU-SITE/admin/`, escolhe a categoria, e elas aparecem no catálogo na hora.

## 1. Criar o projeto (grátis)
1. Entre em supabase.com → **New project**. Região: **South America (São Paulo)**.
2. Anote a senha do banco num lugar seguro (não é a senha do login do catálogo).

## 2. Criar as tabelas e as regras de segurança
1. No projeto: **SQL Editor → New query**.
2. Abra `supabase/schema.sql`, troque **SEU-EMAIL@exemplo.com** (no fim do arquivo) pelo e-mail de quem vai administrar. Para mais de uma pessoa, repita a linha com outro e-mail.
3. Cole tudo no editor e clique **Run**.

## 3. Travar o cadastro e criar os logins
1. **Authentication → Sign In / Providers → Email**: desligue **Allow new users to sign up** (assim ninguém de fora consegue criar conta).
2. **Authentication → Users → Add user → Create new user**: informe e-mail e senha e marque **Auto Confirm User**.
   Crie um usuário por pessoa. O e-mail precisa ser o mesmo que está na tabela `admins` do passo 2.

## 4. Ligar o catálogo
1. **Project Settings → API**: copie a **Project URL** e a chave **anon public**.
2. Cole as duas em `config.js`. Essas duas são públicas por natureza. **Nunca** use a chave `service_role`.
3. Publique. Acesse `/admin/` e entre com o e-mail e a senha criados.

## Como a segurança funciona
- Qualquer pessoa **lê** categorias e fotos ativas (é o catálogo público).
- Só e-mails da tabela `admins` **escrevem** (criar categoria, enviar, apagar), e isso é verificado no banco, não na tela.
- Esconder o endereço `/admin` não é a proteção; a proteção é o login + essas regras.

## Limites do plano grátis
- 1 GB de fotos e 5 GB de tráfego por mês (as fotos são reduzidas ao subir: ~150 KB cada).
- O projeto **pausa após 7 dias sem uso**: o catálogo cai para as fotos que já estão no repositório até você tocar em **Restore** no painel.
