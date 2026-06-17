import MessengerChatsItems from "./messenger-chats-items.js";
customElements.define('messenger-chats-items', MessengerChatsItems);

import MessengerChatsHeader from "./messenger-chats-header.js";
customElements.define('messenger-chats-header', MessengerChatsHeader);

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
			<messenger-chats-items></messenger-chats-items>
		`;
	}
	
	constructor() {
		super();
		this.menuEl = null;
		this.chatsItemEls = this.shadowRoot.querySelector('messenger-chats-items');
		this.headerEl = this.shadowRoot.querySelector('messenger-chats-header');
		this.burgerEl = this.headerEl.shadowRoot.querySelector('.button_burger');
		
		this.addEventListener('burger-click', () => {
			if (!this.menuEl) {
				import('./messenger-chats-menu.js').then(() => {
					this.menuEl = document.createElement('messenger-chats-menu');
					this.shadowRoot.append(this.menuEl);
					this.menuEl.open();
					this.chatItemEls.classList.add('disabled');
				});
				return;
			}
			
			if (this.menuEl.classList.contains('opened')) {
				this.menuEl.close();
				this.chatsItemEls.classList.remove('disabled');
			} else {
				this.menuEl.open();
				this.chatsItemEls.classList.add('disabled');
			}
		});
		
		document.addEventListener('click', e => {
			const path = e.composedPath();
			if (!path.includes(this.menuEl) && !path.includes(this.headerEl)) {
				this.menuEl.close();
				this.chatsItemEls.classList.remove('disabled');
			}
		});
	}
	
	renderChats(chats) {
		import('./messenger-chats-item.js').then(() => {
			this.chatsItemEls.renderChats(chats);
		});
	}
}