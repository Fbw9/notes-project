const http = require('http');
const url = require('url');
const querystring = require('querystring');
const notes = require('./notes');

const server = http.createServer((request, response) => {
    const urlObject = url.parse(request.url);
    const data = querystring.parse(urlObject.query);
    response.setHeader('Content-Type', 'application/json');

    switch (urlObject.pathname) {
        case '/api/notes/list':
            response.end('List all notes');
            break;
        case '/api/notes/add':
            let note = notes.addNote(data.title, data.body);
            if (note) {
                response.end(`{
                    status: "Not created",
                    title: "${note.title}",
                    body: "${note.body}"
                }`);
            } else {
                response.end('Note title already taken');
            }
            response.end('Add a note');
            break;
        case '/api/notes/delete':
            response.end('Delete a note');
            break;
    }

    response.end('API alive:' + request.url);
});
server.listen(3000);