import MessengerChat from "./messenger-chat.js";
customElements.define('messenger-chat', MessengerChat);

import MessengerChats from './messenger-chats.js';
customElements.define('messenger-chats', MessengerChats);

class MessengerApp extends Base {
	get css() {
		return `
			<style>
				:host {
					position: relative;
					overflow: hidden;
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
		`;
	}
	
	constructor() {
		super();
		
		this.chatsEl = this.shadowRoot.querySelector('messenger-chats');
		this.modalEl = null;
		this.isLoadingModal = false;
		
		this.chats = JSON.parse(localStorage.getItem('chats')) || [];
		this.chatsEl.renderChats(this.chats);
		
		this.addEventListener('create-chat', () => {
			if (this.modalEl) {
				this.modalEl.open();
				return;
			}
			if (this.isLoadingModal) return;
			this.isLoadingModal = true;
			import('./messenger-chat-create.js').then(() => {
				this.modalEl = document.createElement('messenger-chat-create');
				this.shadowRoot.append(this.modalEl);
				this.modalEl.open();
				this.isLoadingModal = false;
			});
		});
		
		this.addEventListener('chat-create-confirm', e => {
			const name = e.detail.name;
			const result = this.createChat(name);
			if (result) {
				this.modalEl.close();
			} else {
				this.modalEl.dispatchEvent(new CustomEvent('chat-create-error', {
					bubbles: true,
					composed: true,
					detail: { message: 'Чат уже существует' }
				}));
			}
		});
	}
	
	createChat(name) {
		const isExist = this.chats.some(chat => chat.name === name);
		if (isExist) return false;
		this.chats.push({ name });
		localStorage.setItem('chats', JSON.stringify(this.chats));
		this.chatsEl.renderChats(this.chats);
		return true;
	}
}

customElements.define('messenger-app', MessengerApp);