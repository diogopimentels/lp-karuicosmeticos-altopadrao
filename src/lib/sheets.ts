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

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads";
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:K`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          lead.dataHora,
          lead.nomeCompleto,
          lead.emailProfissional,
          lead.whatsappLead,
          lead.utmSource ?? "",
          lead.utmMedium ?? "",
          lead.utmCampaign ?? "",
          lead.utmTerm ?? "",
          lead.utmContent ?? "",
          lead.paginaOrigem ?? "",
          lead.referrer ?? "",
        ],
      ],
    },
  });
}
