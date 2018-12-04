const http = require('http');
const url = require('url');
const querystring = require('querystring');
const notes = require('./notes');

const server = http.createServer((request, response) => {
    const urlObject = url.parse(request.url);
    const data = querystring.parse(urlObject.query);
    let payLoad = {};

    response.setHeader('Content-Type', 'application/json');

    switch (urlObject.pathname) {
        case '/api/notes/list':
            // response.end('List all notes');
            payLoad = {
                endpoint: 'List',
                description: 'List all note'
            };
            break;
        case '/api/notes/add':
            let note = notes.addNote(data.title, data.body);
            if (note) {
                payLoad['note'] = note
            } else {
                payLoad['error'] = 'Note title already taken'
            }
            // response.end('Add a note');
            payLoad = {
                endpoint: 'Add',
                description: 'Add a note'
            };
            break;
        case '/api/notes/delete':
            // response.end('Delete a note');
            payLoad = {
                endpoint: 'delete',
                description: 'Delete a note'
            };
            break;
        default:
            payLoad = {
                api: 'Notes 0.0.1',
                endpoint: 'add, list, delete',
            }
    }

    response.end(JSON.stringify(payLoad));
});
server.listen(3001);