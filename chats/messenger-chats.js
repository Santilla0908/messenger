import MessengerChatsItem from "./messenger-chats-item.js";
customElements.define('messenger-chats-item', MessengerChatsItem);

export default class MessengerChats extends Base {
	get css() {
		return `
			<style>
				:host {
					display: grid;
					grid-template-rows: auto 1fr;
					background: #1F2124;
					position: relative;
					left: 0;
					top: 0;
				}
				.header {
					display: grid;
					grid-template-columns: auto 1fr;
					height: 50px;
					gap: 5px;
					border: 1px solid #202225;
					padding: 2px;
				}
				.burger {
					position: relative;
					display: flex;
    				justify-content: center;
    				align-items: center;
    				width: 50px;
    				transition: background 0.15s linear;
    				cursor: pointer;
				}
				.burger_inner {
					 position: relative;
					 background-color: #313438;
					 border-radius: 4px;
					 width: 25px;
    				 height: 2px;
				}
				.burger_inner_top,
				.burger_inner_bottom {
					position: absolute;
					display: block;
					width: 25px;
					height: 2px;
					border-radius: 4px;
					background-color: #313438;
				}
				.burger_inner_top {
					top: 13px;
				}
				.burger_inner_bottom {
					bottom: 13px;
				}
				.burger:hover {
					background: #282A2E;
				}
				.burger:hover .burger_inner,
				.burger:hover .burger_inner_top,
				.burger:hover .burger_inner_bottom {
   					background-color: #E8E6E1;
				}
				.search {
					background: #313438;
					border: none;
					color: #E8E6E1;
					padding: 0 0 0 10px;
				}
				input:focus {
					outline: none;
				}
				.chat_name {
					display: flex;
					padding: 0 10px;
					height: 50px;
					align-items: center;
					cursor: pointer;
					transition: background 0.15s linear;
				}
				.chat_name:hover {
					background: #282A2E;
				}
				.chats.disabled {
					pointer-events: none;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="header">
				<div class="burger">
					<span class="burger_inner_top"></span>
					<span class="burger_inner"></span>
					<span class="burger_inner_bottom"></span>
				</div>
				<input class="search" type="text" placeholder="Поиск">
			</div>
			<div class="chats"></div>
		`;
	}
	
	constructor() {
		super();
		this.menuEl = null;
		this.chatsEl = this.shadowRoot.querySelector('.chats');
		this.headerEl = this.shadowRoot.querySelector('.header');
		this.burgerEl = this.shadowRoot.querySelector('.burger');
		
		this.burgerEl.addEventListener('click', () => {
			if (!this.menuEl) {
				import('./messenger-chats-menu.js').then(() => {
					this.menuEl = document.createElement('messenger-chats-menu');
					this.shadowRoot.append(this.menuEl);
					this.menuEl.open();
					this.chatsEl.classList.add('disabled');
				});
				return;
			}
			
			if (this.menuEl.classList.contains('opened')) {
				this.menuEl.close();
				this.chatsEl.classList.remove('disabled');
			} else {
				this.menuEl.open();
				this.chatsEl.classList.add('disabled');
			}
		});
		
		this.onDocumentClick = e => {
			const path = e.composedPath();
			if (this.menuEl && !path.includes(this.menuEl) && !path.includes(this.headerEl)) {
				this.menuEl.close();
				this.chatsEl.classList.remove('disabled');
			}
		}
		
		document.addEventListener('click', this.onDocumentClick);
	}
	
	disconnectedCallback() {
		document.removeEventListener('click', this.onDocumentClick);
	}
	
	renderChats(chats) {
		this.chatsEl.innerHTML = '';
		if (!chats?.length) return;
		chats.forEach(chat => {
			const itemEl = document.createElement('messenger-chats-item');
			itemEl.value = chat;
			this.chatsEl.append(itemEl);
		});
	}
}