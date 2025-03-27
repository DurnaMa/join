function emailValidierung(email) {
  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegEx.test(email);

/**
 * Beispiele:
 * 
 * const email = "test@test.de";
 * if (validateEmail(email)) {
 *  console.log("E-Mail-Adresse ist gültig");
 * } else {
 *  console.log("E-Mail-Adresse ist ungültig");
 * }
 */
}

function passwortValidierung(passwort) {
  const passwortRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwortRegEx.test(passwort);

  /**
   * Beispiele:
   * 
   * const passwort = "Test1234";
   * if (passwortValidierung(passwort)) {
   * console.log("Passwort ist gültig");
   * } else {
   * console.log("Passwort ist ungültig");
   * }
   */
}

// Einzelne Validierungsfunktionen
function validateName(name) {
  if (!name || name.length < 2) {
      return "Name muss mindestens 2 Zeichen lang sein";
  }
  return null;
}

function validateAge(age) {
  const parsedAge = parseInt(age);
  if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 120) {
      return "Alter muss zwischen 18 und 120 liegen";
  }
  return null;
}

function validatePhone(phone) {
  const phoneRegex = /^\+?[0-9]{10,}$/;
  if (!phoneRegex.test(phone)) {
      return "Ungültige Telefonnummer";
  }
  return null;
}

// Hauptvalidierungsfunktion
function validateForm(formData) {
  const errors = [];
  
  // Validierungen durchführen
  const nameError = validateName(formData.name);
  const ageError = validateAge(formData.age);
  const phoneError = validatePhone(formData.phone);
  
  // Fehler sammeln
  if (nameError) errors.push(nameError);
  if (ageError) errors.push(ageError);
  if (phoneError) errors.push(phoneError);
  
  return {
      isValid: errors.length === 0,
      errors: errors
  };
}

// Beispiel Verwendung
const formData = {
  name: "Max Mustermann",
  age: "25",
  phone: "+491234567890"
};

const validationResult = validateForm(formData);
if (validationResult.isValid) {
  console.log("Formular ist gültig");
} else {
  console.log("Fehler:", validationResult.errors);
}