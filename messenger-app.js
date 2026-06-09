import MessengerMsgs from './messenger-msgs.js';
customElements.define('messenger-msgs', MessengerMsgs);

import MessengerChats from './messenger-chats.js';
customElements.define('messenger-chats', MessengerChats);

class MessengerApp extends Base {
	get css() {
		return `
			<style>
				.layout {
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
			<div class="layout">
				<messenger-chats></messenger-chats>
				<messenger-msgs></messenger-msgs>
			</div>
		`;
	}
	
	constructor() {
		super();
	}
}

customElements.define('messenger-app', MessengerApp);