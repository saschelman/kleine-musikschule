const { PrismaClient } = require('@prisma/client');
const ExcelJS = require('exceljs');
const path = require('path');

const prisma = new PrismaClient();

async function exportToExcel() {
  console.log('Rufe Kursanmeldungen aus der Datenbank ab...');
  
  try {
    const registrations = await prisma.courseRegistration.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (registrations.length === 0) {
      console.log('Keine Kursanmeldungen gefunden.');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    
    // Gruppiere Anmeldungen nach Kurs
    const groupedRegistrations = registrations.reduce((acc, reg) => {
      // Wenn es eine Kurszeit gibt, hängen wir sie für die Gruppierung an den Kursnamen an
      const groupKey = reg.kurs + (reg.kurszeit ? ` (${reg.kurszeit.split(' ')[0]} ${reg.kurszeit.split(' ')[1]})` : '');
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(reg);
      return acc;
    }, {});

    const columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Datum', key: 'createdAt', width: 20 },
      { header: 'Kurs', key: 'kurs', width: 35 },
      { header: 'Kurszeit', key: 'kurszeit', width: 30 },
      { header: 'Kind Vorname', key: 'kVorname', width: 20 },
      { header: 'Kind Nachname', key: 'kNachname', width: 20 },
      { header: 'Alter', key: 'alter', width: 10 },
      { header: 'Eltern Vorname', key: 'vVorname', width: 20 },
      { header: 'Eltern Nachname', key: 'vNachname', width: 20 },
      { header: 'Bezahlt', key: 'bezahlt', width: 15 },
      { header: 'Adresse', key: 'adresse', width: 40 },
      { header: 'E-Mail', key: 'email', width: 30 },
      { header: 'Telefon', key: 'telefon', width: 20 },
      { header: 'Nachricht', key: 'nachricht', width: 40 },
      { header: 'Medien-Einwilligung', key: 'medien', width: 20 },
    ];

    let sheetCounter = 1;
    for (const [groupKey, groupRegs] of Object.entries(groupedRegistrations)) {
      // Excel Tabellenblatt-Namen dürfen maximal 31 Zeichen lang sein und keine bestimmten Sonderzeichen enthalten
      let baseName = groupKey.replace(/[\\/*?:\[\]]/g, '').substring(0, 28).trim();
      if (!baseName) baseName = `Kurs ${sheetCounter}`;
      
      let safeSheetName = baseName;
      let counter = 1;
      while (workbook.getWorksheet(safeSheetName)) {
        safeSheetName = `${baseName.substring(0, 26)} ${counter}`;
        counter++;
      }

      const worksheet = workbook.addWorksheet(safeSheetName);
      worksheet.columns = columns;

      // Header stylen
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };

      // Daten für diesen Kurs hinzufügen
      groupRegs.forEach((reg) => {
        worksheet.addRow({
          id: reg.id,
          createdAt: new Date(reg.createdAt).toLocaleString('de-DE'),
          kurs: reg.kurs,
          kurszeit: reg.kurszeit || '-',
          kVorname: reg.kVorname,
          kNachname: reg.kNachname,
          alter: reg.alter || '-',
          vVorname: reg.vVorname,
          vNachname: reg.vNachname,
          bezahlt: reg.bezahlt ? 'Ja' : 'Nein',
          adresse: reg.adresse,
          email: reg.email,
          telefon: reg.telefon,
          nachricht: reg.nachricht || '-',
          medien: reg.medien ? 'Ja' : 'Nein',
        });
      });
      
      sheetCounter++;
    }

    // Datei speichern
    const filePath = path.join(__dirname, 'kursanmeldungen-export.xlsx');
    await workbook.xlsx.writeFile(filePath);
    
    console.log(`\n✅ Erfolgreich exportiert!`);
    console.log(`Es wurden ${registrations.length} Anmeldungen in ${Object.keys(groupedRegistrations).length} Tabellenblätter (Kurse) aufgeteilt und gespeichert in:`);
    console.log(filePath);

  } catch (error) {
    console.error('Fehler beim Exportieren:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportToExcel();
