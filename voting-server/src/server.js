import Server from 'socket.io';

export function startServer(store){
	const io = new Server().attach(8090);

	// SEND SNAPSHOT WHENEVER STATE CHANGES
	// subscribe a listener to the store that reads current state
	// turns it into plain JavaScript object
	// and emits state event on the Socket.io server
	// A JSON-serialized snapshot of the state is sent
	// over all active Socket.io connections
	store.subscribe(
			() => io.emit('state', store.getState().toJS())
		);

	// LISTEN TO CONNECTION EVENTS
	// Lets them sync their client-side state to the latest
	// server state right away.
	// Get a connection event on Socket.io each time a client connects.
	io.on('connection', (socket) => {
		// emit the current state to clients when they connect
		socket.emit('state', store.getState().toJS());
		// Receive updates from clients (e.g. actions, votes and next)
		socket.on('action', store.dispatch.bind(store));
	});

};