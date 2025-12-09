import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'excel', 'tasks.xlsx');

/* --------------------------
   OPGAVE-KLASSEN (OOP)
--------------------------- */
export class Task {
  constructor({ 
    ID, 
    Titel, 
    Beskrivelse, 
    Type, 
    Lokation, 
    Radius, 
    Valgmuligheder, 
    Aktiveringsbetingelse 
  }) {
    this.ID = ID;
    this.Titel = Titel;
    this.Beskrivelse = Beskrivelse;
    this.Type = Type;
    this.Lokation = Lokation;
    this.Radius = Radius;
    this.Valgmuligheder = Valgmuligheder;
    this.Aktiveringsbetingelse = Aktiveringsbetingelse;
  }

  // Bruges når task skal eksporteres som JSON
  toJSON() {
    return {
      ID: this.ID,
      Titel: this.Titel,
      Beskrivelse: this.Beskrivelse,
      Type: this.Type,
      Lokation: this.Lokation,
      Radius: this.Radius,
      Valgmuligheder: this.Valgmuligheder,
      Aktiveringsbetingelse: this.Aktiveringsbetingelse
    };
  }
}

/* --------------------------
   HENTER ALLE TASKS
--------------------------- */
export function getAllTasks() {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Konverter til Task-objekter
  return data.map(row => new Task(row));
}

/* --------------------------
   TILFØJ NY TASK
--------------------------- */
export function addTask(taskData) {
  const tasks = getAllTasks();

  // taskData → Task-objekt
  const newTask = new Task(taskData);
  tasks.push(newTask);

  // Konverter alle tasks tilbage til et rent JSON-array
  const jsonCompatible = tasks.map(t => t.toJSON());

  const newSheet = XLSX.utils.json_to_sheet(jsonCompatible);
  const workbook = XLSX.readFile(filePath);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, filePath);
}

/* --------------------------
   SLET TASK
--------------------------- */
export function deleteTask(ID) {
  let tasks = getAllTasks();

  // Filter class-baserede objekter → slet
  tasks = tasks.filter(task => task.ID !== ID);

  const jsonCompatible = tasks.map(t => t.toJSON());

  const newSheet = XLSX.utils.json_to_sheet(jsonCompatible);
  const workbook = XLSX.readFile(filePath);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, filePath);
}

/* --------------------------
   EKSPORT SOM JSON
--------------------------- */
export function exportTasksAsJSON(jsonPath = 'tasks.json') {
  const tasks = getAllTasks();
  const json = tasks.map(t => t.toJSON());

  fs.writeFileSync(
    path.join(__dirname, jsonPath),
    JSON.stringify(json, null, 2)
  );

  console.log(`Tasks exported to ${jsonPath}`);
}
