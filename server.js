import { createServer } from 'node:http';
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if(req.url === '/tasks'){
    const workbook = XLSX.readFile(path.join(__dirname, 'excel', 'tasks.xlsx'));

    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const data = XLSX.utils.sheet_to_json(sheet);

    res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
  } else {
    res.statusCode = 500;
    res.setHeader('Content-type', 'text/plain');
    res.end('Kan ikke hente data')
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
