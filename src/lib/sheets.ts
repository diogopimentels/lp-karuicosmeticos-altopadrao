import "server-only";

import { google } from "googleapis";

type LeadRow = {
  dataHora: string;
  nomeCompleto: string;
  emailProfissional: string;
  whatsappLead: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  paginaOrigem?: string | null;
  referrer?: string | null;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }
  return value;
}

function getPrivateKey(): string {
  const key = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  return key.includes("\\n") ? key.replace(/\\n/g, "\n") : key;
}

function quoteSheetName(sheetName: string): string {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

/** Primeira linha vazia na coluna A após o cabeçalho (reaproveita buracos). */
function findNextDataRow(columnA: string[][] | null | undefined): number {
  const values = columnA ?? [];

  for (let index = 1; index < values.length; index += 1) {
    const cell = String(values[index]?.[0] ?? "").trim();
    if (!cell) {
      return index + 1;
    }
  }

  return Math.max(values.length + 1, 2);
}

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Página1";
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const quotedSheetName = quoteSheetName(sheetName);

  // Evita o bug do values.append, que pode "detectar tabela" e gravar
  // a partir da coluna J em vez da coluna A.
  // Só a coluna A decide a próxima linha — ignora lixo antigo em J:T
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${quotedSheetName}!A1:A500`,
  });

  const nextRow = findNextDataRow(existing.data.values);
  const origem =
    process.env.AGENDOR_LEAD_ORIGIN?.replace(/^"|"$/g, "").trim() ||
    "Landing Page Karuí Cosméticos/Alto Padrão Invisível";

  // Cabeçalhos atuais da planilha:
  // Data/horário | Nome completo | E-mail | Whatsapp | Origem | UTM Source | UTM Campaign
  // + campos extras úteis à direita
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${quotedSheetName}!A${nextRow}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          lead.dataHora,
          lead.nomeCompleto,
          lead.emailProfissional,
          lead.whatsappLead,
          origem,
          lead.utmSource ?? "",
          lead.utmCampaign ?? "",
          lead.utmMedium ?? "",
          lead.utmTerm ?? "",
          lead.utmContent ?? "",
          lead.paginaOrigem ?? "",
          lead.referrer ?? "",
        ],
      ],
    },
  });
}
