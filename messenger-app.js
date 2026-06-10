import MessengerMsgs from './messenger-msgs.js';
customElements.define('messenger-msgs', MessengerMsgs);

import MessengerChats from './messenger-chats.js';
customElements.define('messenger-chats', MessengerChats);

import MessengerCreateChatModal from './messenger-create-chat-modal.js';
customElements.define('messenger-create-chat-modal', MessengerCreateChatModal);

class MessengerApp extends Base {
	get css() {
		return `
			<style>
				.messenger_container {
					position: relative;
					display: grid;
					grid-template-columns: 320px 1fr;
    				height: 100vh;
    				border: 1px solid #202225;
    				width: 650px;
    				color: #E8E6E1;
				}
				.messenger-msgs {
					display: grid;
					grid-template-rows: auto 1fr auto;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="messenger_container">
				<messenger-chats></messenger-chats>
				<messenger-msgs></messenger-msgs>
				<messenger-create-chat-modal></messenger-create-chat-modal>
			</div>
		`;
	}
	
	constructor() {
		super();
		
		this.modalEl = this.shadowRoot.querySelector('messenger-create-chat-modal');
		
		this.chats = [];
	}
	openModal() {
		this.modalEl.open();
	}
	createChat(name) {
		this.chats.push({ name });
		console.log(this.chats);
		console.log('создаем чат:', name);
	}
}

customElements.define('messenger-app', MessengerApp);