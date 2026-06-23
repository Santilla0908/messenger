import MessengerChat from "./chat/messenger-chat.js";
customElements.define('messenger-chat', MessengerChat);

import MessengerChats from './chats/messenger-chats.js';
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
    				height: 90vh;
    				border: 1px solid #202225;
    				width: 700px;
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
		this.menuEl = null;
		this.isLoadingMenu = false;
		
		this.chats = JSON.parse(localStorage.getItem('chats')) ?? [];
		this.chatsEl.renderChats(this.chats);
		
		this.addEventListener('toggle-chats-menu', e => {
			if (!this.menuEl) {
				if (this.isLoadingMenu) return;
				this.isLoadingMenu = true;
				import('./chats/messenger-chats-menu.js').then(() => {
					this.menuEl = document.createElement('messenger-chats-menu');
					this.shadowRoot.append(this.menuEl);
					this.menuEl.open();
					this.isLoadingMenu = false;
				});
				return;
			}
			if (this.menuEl.classList.contains('opened')) {
				this.menuEl.close();
			} else {
				this.menuEl.open();
			}
		});
		
		this.addEventListener('create-chat', () => {
			if (this.modalEl) {
				this.modalEl.open();
				return;
			}
			if (this.isLoadingModal) return;
			this.isLoadingModal = true;
			import('./chat/messenger-chat-create.js').then(() => {
				this.modalEl = document.createElement('messenger-chat-create');
				this.shadowRoot.append(this.modalEl);
				this.modalEl.open();
				this.isLoadingModal = false;
			});
		});
		
		this.addEventListener('chat-create-confirm', e => {
			const chat = e.detail.chat;
			this.createChat(chat);
			this.modalEl.close();
		});
	}
	
	createChat(chat) {
		this.chats.push(chat);
		localStorage.setItem('chats', JSON.stringify(this.chats));
		this.chatsEl.renderChats(this.chats);
	}
}

customElements.define('messenger-app', MessengerApp);