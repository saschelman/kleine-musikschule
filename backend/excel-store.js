const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const DATA_DIR = path.join(__dirname, "data");
const EXCEL_FILE = path.join(DATA_DIR, "kurs-anmeldungen.xlsx");

const HEADERS = [
  { header: "Datum", key: "datum", width: 20 },
  { header: "Kurs", key: "kurs", width: 25 },
  { header: "Kurszeit", key: "kurszeit", width: 18 },
  { header: "Kind Vorname", key: "kVorname", width: 18 },
  { header: "Kind Nachname", key: "kNachname", width: 18 },
  { header: "Alter", key: "alter", width: 10 },
  { header: "Vertreter Vorname", key: "vVorname", width: 18 },
  { header: "Vertreter Nachname", key: "vNachname", width: 18 },
  { header: "Adresse", key: "adresse", width: 30 },
  { header: "E-Mail", key: "email", width: 28 },
  { header: "Telefon", key: "telefon", width: 18 },
  { header: "Nachricht", key: "nachricht", width: 35 },
  { header: "AGB", key: "agb", width: 8 },
  { header: "Datenschutz", key: "datenschutz", width: 12 },
  { header: "Medien-Erlaubnis", key: "medien", width: 16 },
  { header: "Bezahlt", key: "bezahlt", width: 12 },
];

const HEADER_STYLE = {
  font: { bold: true, color: { argb: "FFFFFFFF" } },
  fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF4472C4" } },
  alignment: { horizontal: "center", vertical: "middle" },
};

function setupSheet(sheet) {
  sheet.columns = HEADERS;
  sheet.getRow(1).eachCell((cell) => {
    cell.font = HEADER_STYLE.font;
    cell.fill = HEADER_STYLE.fill;
    cell.alignment = HEADER_STYLE.alignment;
  });
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: HEADERS.length },
  };
}

async function getOrCreateWorkbook() {
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(EXCEL_FILE)) {
    await workbook.xlsx.readFile(EXCEL_FILE);
    // Re-apply column key mappings (lost when reading from file)
    for (const sheet of workbook.worksheets) {
      sheet.columns = HEADERS.map((h, i) => ({
        key: h.key,
        width: h.width,
      }));
    }
    return workbook;
  }

  // Create new workbook with both sheets
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const sheet1 = workbook.addWorksheet("Les Petits Amis");
  const sheet2 = workbook.addWorksheet("Pfinztal");
  setupSheet(sheet1);
  setupSheet(sheet2);

  await workbook.xlsx.writeFile(EXCEL_FILE);
  return workbook;
}

function getSheetName(kursName) {
  if (kursName && kursName.includes("Les Petits Amis")) {
    return "Les Petits Amis";
  }
  return "Pfinztal";
}

async function speichereAnmeldung(daten) {
  const workbook = await getOrCreateWorkbook();
  const sheetName = getSheetName(daten.kurs);
  let sheet = workbook.getWorksheet(sheetName);

  // Safety: if sheet somehow doesn't exist, create it
  if (!sheet) {
    sheet = workbook.addWorksheet(sheetName);
    setupSheet(sheet);
  }

  sheet.addRow({
    datum: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
    kurs: daten.kurs || "",
    kurszeit: daten.kurszeit || "",
    kVorname: daten.kVorname || "",
    kNachname: daten.kNachname || "",
    alter: daten.alter || "",
    vVorname: daten.vVorname || "",
    vNachname: daten.vNachname || "",
    adresse: daten.adresse || "",
    email: daten.email || "",
    telefon: daten.telefon || "",
    nachricht: daten.nachricht || "",
    agb: daten.agb ? "Ja" : "Nein",
    datenschutz: daten.datenschutz ? "Ja" : "Nein",
    medien: daten.medien ? "Ja" : "Nein",
  });

  await workbook.xlsx.writeFile(EXCEL_FILE);
}

function getExcelFilePath() {
  return EXCEL_FILE;
}

module.exports = { speichereAnmeldung, getExcelFilePath };
