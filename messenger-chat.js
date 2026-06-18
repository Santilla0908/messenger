import MessengerChatHeader from "./messenger-chat-header.js";
customElements.define('messenger-chat-header', MessengerChatHeader);

import MessengerMsgs from './messenger-msgs.js';
customElements.define('messenger-msgs', MessengerMsgs);

import MessengerChatComposer from "./messenger-chat-composer.js";
customElements.define('messenger-chat-composer', MessengerChatComposer);

export default class MessengerChat extends Base {
	get css() {
		return `
			<style>
				:host {
					display: grid;
					grid-template-rows: auto 1fr auto;
					height: 100%;
					border-left: 1px solid #202225;
					background: #282A2E;
				}
				
			</style>
		`;
	}
	
	get html() {
		return `
			<messenger-chat-header></messenger-chat-header>
			<messenger-msgs></messenger-msgs>
			<messenger-chat-composer></messenger-chat-composer>
		`;
	}
	
	constructor() {
		super();
	}
}