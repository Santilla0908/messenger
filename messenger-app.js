import MessengerChat from "./messenger-chat.js";
customElements.define('messenger-chat', MessengerChat);

import MessengerChats from './messenger-chats.js';
customElements.define('messenger-chats', MessengerChats);

import MessengerChatCreate from "./messenger-chat-create.js";
customElements.define('messenger-chat-create', MessengerChatCreate);

class MessengerApp extends Base {
	get css() {
		return `
			<style>
				:host {
					position: relative;
					display: grid;
					grid-template-columns: 320px 1fr;
    				height: 700px;
    				border: 1px solid #202225;
    				width: 650px;
    				color: #E8E6E1;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<messenger-chats></messenger-chats>
			<messenger-chat></messenger-chat>
			<messenger-chat-create></messenger-chat-create>
		`;
	}
	
	constructor() {
		super();
		
		this.chatsEl = this.shadowRoot.querySelector('messenger-chats');
		this.modalEl = this.shadowRoot.querySelector('messenger-chat-create');
		
		this.chats = JSON.parse(localStorage.getItem('chats')) || [];
		this.chatsEl.renderChats(this.chats);
		
		this.addEventListener('create-chat', () => {
			this.openModal();
		});
	}
	openModal() {
		this.modalEl.open();
	}
	createChat(name) {
		const isExist = this.chats.some(chat => {
			return chat.name === name;
		});
		if (isExist) return false;
		this.chats.push({ name });
		localStorage.setItem('chats', JSON.stringify(this.chats));
		this.chatsEl.renderChats(this.chats);
		return true;
	}
}

customElements.define('messenger-app', MessengerApp);