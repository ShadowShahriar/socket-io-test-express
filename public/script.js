const socket = io()

socket.emit('join-room', "test-page", "doc1+"+new Date().getTime())

socket.on('user-connected', (userID) => {
	console.log('New User connected: ' + userID)
})