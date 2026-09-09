const BASE_URL = "https://noreply-email.onrender.com";
const TEST_EMAIL = "alexfloeter@gmail.com";

async function testNormalContactForm() {
  console.log("Testing Normal Contact Form (/api/contact)...");

  const payload = {
    name: "Alex Flöter (Test)",
    email: TEST_EMAIL,
    message: "Hallo! Das ist ein automatischer Test des normalen Kontaktformulars mit der neuen Signatur.",
    location: "Karlsruhe Zentrum",
    coordinates: "49.0069,8.4037",
    datenschutz: true,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("✅ Normales Kontaktformular: Erfolgreich gesendet!");
    } else {
      console.error(`❌ Normales Kontaktformular: Fehler (${response.status})`);
    }
  } catch (error) {
    console.error("❌ Normales Kontaktformular: Netzwerkfehler -", error.message);
  }
}

async function testCourseRegistration() {
  console.log("\nTesting Course Registration Form (/api/kursanmeldung)...");

  const payload = {
    Kursanmeldung: "Musikkurs für Kinder (Pfinztal)",
    Kurszeit: "Kurs 1 (15:00 - 15:30 Uhr)",
    "Kursteilnehmer Vorname": "Alex",
    "Kursteilnehmer Nachname": "Junior",
    Alter: "5",
    "Vertreter Vorname": "Alexander",
    "Vertreter Nachname": "Flöter",
    Adresse: "Teststraße 1, 76133 Karlsruhe",
    Email: TEST_EMAIL,
    Telefonnummer: "0123456789",
    Nachricht: "Automatischer Test für die Kursanmeldung.",
    "Medien Erlaubnis": true,
    "AGB akzeptiert": true,
    "Datenschutz akzeptiert": true,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/kursanmeldung`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("✅ Kursanmeldung: Erfolgreich gesendet!");
    } else {
      console.error(`❌ Kursanmeldung: Fehler (${response.status})`);
    }
  } catch (error) {
    console.error("❌ Kursanmeldung: Netzwerkfehler -", error.message);
  }
}

async function testLesPetitsAmisRegistration() {
  console.log("\nTesting Les Petits Amis Form (/api/kursanmeldung)...");

  const payload = {
    Kursanmeldung: "Musikkurs für Kinder (Les Petits Amis)",
    "Kursteilnehmer Vorname": "Mio",
    "Kursteilnehmer Nachname": "Flöter",
    Alter: "4",
    "Vertreter Vorname": "Alexander",
    "Vertreter Nachname": "Flöter",
    Adresse: "Französische Straße 2, 76133 Karlsruhe",
    Email: TEST_EMAIL,
    Telefonnummer: "0123456789",
    Nachricht: "Automatischer Test für Les Petits Amis.",
    "Medien Erlaubnis": true,
    "AGB akzeptiert": true,
    "Datenschutz akzeptiert": true,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/kursanmeldung`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("✅ Les Petits Amis: Erfolgreich gesendet!");
    } else {
      console.error(`❌ Les Petits Amis: Fehler (${response.status})`);
    }
  } catch (error) {
    console.error("❌ Les Petits Amis: Netzwerkfehler -", error.message);
  }
}

async function runTests() {
  console.log("Starte Formular-Tests...\n");
  await testNormalContactForm();
  await testCourseRegistration();
  await testLesPetitsAmisRegistration();
  console.log("\nAlle Tests abgeschlossen! Überprüfe nun dein Postfach (" + TEST_EMAIL + ") auf die Auto-Replies.");
}

runTests();
