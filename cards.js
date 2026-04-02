/*
 * ============================================================
 *  KARTEN-DATEN  —  cards.js
 * ============================================================
 *
 *  Jedes Fach wird in einer eigenen Datei definiert und hier
 *  per SUBJECTS.push({...}) eingetragen.
 *
 *  Neue Fächer: neue Datei anlegen (z.B. cards_neuesfach.js),
 *  in index.html vor app.js einbinden, Inhalt mit
 *  SUBJECTS.push({...}) eintragen.
 *
 *  ID-Verknüpfung: kk, lt, mc und theory teilen sich einen
 *  gemeinsamen id-Namespace pro Fach. Gleiche id = gleiches Thema.
 *  hidden: true auf theory-Einträgen blendet sie aus der
 *  Theorie-Übersicht aus, 📖-Button funktioniert trotzdem.
 *
 * ============================================================
 */

const SUBJECTS = [];
