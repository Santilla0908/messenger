import MessengerChatsBody from "./messenger-chats-body.js";
customElements.define('messenger-chats-body', MessengerChatsBody);

import MessengerChatsHeader from "./messenger-chats-header.js";
customElements.define('messenger-chats-header', MessengerChatsHeader);

import MessengerChatsMenu from './messenger-chats-menu.js';
customElements.define('messenger-chats-menu', MessengerChatsMenu);

export default class MessengerChats extends Base {
	get css() {
		return `
			<style>
				:host {
					background: #1F2124;
					position: relative;
					left: 0;
					top: 0;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<messenger-chats-header></messenger-chats-header>
			<messenger-chats-menu class="chats_menu"></messenger-chats-menu>
			<messenger-chats-body class="chat_list"></messenger-chats-body>
		`;
	}
	
	constructor() {
		super();
		
		this.menuEl = this.shadowRoot.querySelector('.chats_menu');
		console.log(this.menuEl);
		this.chatListEl = this.shadowRoot.querySelector('.chat_list');
		this.headerEl = this.shadowRoot.querySelector('messenger-chats-header');
		
		this.addEventListener('burger-click', () => {
			console.log('event caught');
			this.menuEl.open();
		});
		
		document.addEventListener('click', e => {
			const path = e.composedPath();
			if (!path.includes(this.menuEl) && !path.includes(this.headerEl)) {
				this.menuEl.close();
			}
		});
	}
	renderChats(chats) {
		this.chatListEl.renderChats(chats);
	}
}