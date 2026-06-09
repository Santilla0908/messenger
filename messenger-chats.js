export default class MessengerChats extends Base {
	get css() {
		return `
			<style>
				:host {
					background: #1F2124;
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
					width: 50px;
					padding: 0;
					border: 1px solid #202225;
					margin: 0;
					background: #313438;
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
				<button class="burger">☰</button>
				<input class="search" type="text" placeholder="Поиск">
			</div>
			<div class="chat_list"></div>
		`;
	}
	
	constructor() {
		super();
	}
}