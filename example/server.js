'use strict';
const log = console.log
log('Express server')
const express = require('express')
const app = express();

const path = require('path');

// Setting up a static directory for the files in /pub
// using Express middleware.
// Don't put anything in /pub that you don't want the public to have access to!
app.use(express.static(path.join(__dirname, '/pub')))
app.get('/', (req, res) => {
	// sending a string
	//res.send('This should be the root route!')

	//sending some HTML
	res.send('<h1>This should be the root route!</h1>')
})
app.get('/example.html', (req, res) => {
	res.render('/example.html')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})