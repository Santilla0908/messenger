import MessengerChatsBody from "./messenger-chats-body.js";
customElements.define('messenger-chats-body', MessengerChatsBody);

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
			<messenger-chats-body></messenger-chats-body>
		`;
	}
	
	constructor() {
		super();
		this.menuEl = null;
		this.chatItemEls = this.shadowRoot.querySelector('messenger-chats-body');
		this.headerEl = this.shadowRoot.querySelector('messenger-chats-header');
		this.burgerEl = this.headerEl.shadowRoot.querySelector('.button_burger');
		
		this.addEventListener('burger-click', () => {
			if (!this.menuEl) {
				import('./messenger-chats-menu.js').then(() => {
					this.menuEl = document.createElement('messenger-chats-menu');
					this.shadowRoot.append(this.menuEl);
					this.menuEl.open();
				});
				return;
			}
			
			if (this.menuEl.classList.contains('opened')) {
				this.menuEl.close();
			} else {
				this.menuEl.open();
			}
		});
		
		document.addEventListener('click', e => {
			const path = e.composedPath();
			if (!path.includes(this.menuEl) && !path.includes(this.headerEl)) {
				this.menuEl.close();
			}
		});
	}
	
	renderChats(chats) {
		import('./messenger-chats-item.js').then(() => {
			this.chatItemEls.renderChats(chats);
		});
	}
}