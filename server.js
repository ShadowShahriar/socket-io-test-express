const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(server)
const port = 3000

app.set('port', process.env.PORT || port)
app.set('view engine', 'ejs')

// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: 'GET,HEAD,POST',
//     credentials: true
// }))

app.use(express.static('public'))

app.get('/', (request, response) => {
	let newRoom = "test-page"
	response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
	response.redirect('/' + newRoom)
})

app.get('/:session', (request, response) => {
	response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
	response.render('index', {
		ctrlSessionID: request.params.session
	})
})

io.on('connection', socket => {
	socket.on('join-room', (roomID, userID) => {
		console.log('🟩', roomID, userID)
		socket.join(roomID)
		socket.to(roomID).emit('user-connected', userID)
	})
})

server.listen(app.get('port'), () => {
	console.log(`🟩 Server started @ ${app.get('port')}`);
})