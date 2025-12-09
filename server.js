import { createServer } from 'node:http';
import { getAllTasks, addTask, deleteTask, exportTasksAsJSON } from './tasksManager.js';

const server = createServer((req, res) => {
  if (req.url === '/tasks' && req.method === 'GET') {
    const tasks = getAllTasks();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(tasks));
  } else if (req.url === '/tasks/export' && req.method === 'GET') {
    exportTasksAsJSON();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Tasks exported as JSON');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));