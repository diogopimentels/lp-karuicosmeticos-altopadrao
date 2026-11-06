# Karuí Cosméticos — Landing page

Landing institucional/comercial de Marketing Olfativo de Alto Padrão, com captação de leads via formulário, registro em Google Sheets e redirecionamento ao WhatsApp comercial.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Google Sheets API (Service Account)
- Deploy previsto na Vercel (Free)

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Configure no `.env.local` (local) e na Vercel (produção):

| Variável | Onde | Descrição |
|---|---|---|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | server | ID da planilha |
| `GOOGLE_SHEETS_SHEET_NAME` | server | Nome da aba (padrão: `Leads`) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | server | E-mail da Service Account |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | server | Chave privada PEM (com `\n` escapados se necessário) |
| `KARUI_WHATSAPP_NUMBER` | server | WhatsApp comercial destino (`5511...`) |
| `AGENDOR_API_TOKEN` | server | Token da API do Agendor |
| `AGENDOR_FUNNEL_ID` | server | Funil destino (padrão: `813360` FUNIL LP TERCEIRIZADA) |
| `AGENDOR_DEAL_STAGE` | server | Etapa inicial do funil (padrão: `1` = OPORTUNIDADE) |
| `AGENDOR_LEAD_ORIGIN` | server | Origem do lead (padrão: `Landing Page Karuí Cosméticos/Alto Padrão Invisível`) |

Nunca use prefixo `NEXT_PUBLIC_` nas credenciais do Google/Agendor. Nunca commite o JSON da Service Account.

## Fluxo do lead

1. Validação server-side  
2. Google Sheets  
3. Agendor (upsert da pessoa + negócio no funil)  
4. Redirecionamento ao WhatsApp  

Se Sheets ou Agendor falhar, o visitante **não** é redirecionado.

## Google Sheets

1. Crie uma planilha na conta da empresa.
2. Na aba `Leads`, use as colunas:
   `data_hora | nome_completo | email_profissional | whatsapp_lead | utm_source | utm_medium | utm_campaign | utm_term | utm_content | pagina_origem | referrer`
3. Crie uma Service Account no Google Cloud e habilite a Google Sheets API.
4. Compartilhe a planilha com o e-mail da Service Account (permissão de editor).
5. Cole as credenciais nas variáveis de ambiente da Vercel.

## Assets

Já integrados:

- `public/images/logo.png` — logo oficial no header
- `public/images/background-marmore.jpeg` — fundo do hero
- `public/images/foto-caio.jpeg` — porta-voz no hero

Opcional complementar:

- Dados cadastrais do controlador (CNPJ/endereço/e-mail de privacidade) em `/politica-de-privacidade`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
