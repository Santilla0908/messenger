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
				.header {
					display: grid;
					grid-template-columns: auto 1fr;
					height: 50px;
					gap: 5px;
					border: 1px solid #202225;
					padding: 2px;
				}
				.button_burger {
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
				.button_burger:hover {
					background: #282A2E;
				}
				.button_burger:hover .burger_inner,
				.button_burger:hover .burger_inner_top,
				.button_burger:hover .burger_inner_bottom {
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
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="header">
				<div class="button_burger">
					<span class="burger_inner_top"></span>
					<span class="burger_inner"></span>
					<span class="burger_inner_bottom"></span>
				</div>
				<input class="search" type="text" placeholder="Поиск">
			</div>
			<messenger-chats-menu class="chats_menu"></messenger-chats-menu>
			<div class="chat_list"></div>
		`;
	}
	
	constructor() {
		super();
		
		this.burgerEl = this.shadowRoot.querySelector('.button_burger');
		this.menuEl = this.shadowRoot.querySelector('.chats_menu');
		
		this.burgerEl.addEventListener('click', () => {
			this.menuEl.open();
		});
		
		document.addEventListener('click', e => {
			const path = e.composedPath();
			if (!path.includes(this.menuEl) && !path.includes(this.burgerEl)) {
				this.menuEl.close();
			}
		});
	}
}