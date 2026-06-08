import MessengerChats from './messenger-chats.js';
customElements.define('messenger-chats', MessengerChats);

class MessengerApp extends Base {
	get css() {
		return `
			<style>
			
			</style>
		`;
	}
	
	get html() {
		return `
			<messenger-chats>Chat</messenger-chats>
			<messenger-msgs>Messages</messenger-msgs>
		`;
	}
	
	constructor() {
		super();
	}
}

customElements.define('messenger-app', MessengerApp);