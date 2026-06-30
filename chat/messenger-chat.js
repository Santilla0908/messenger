import MessengerChatHeader from "./messenger-chat-header.js";
customElements.define('messenger-chat-header', MessengerChatHeader);

import MessengerMsgs from '../msgs/messenger-msgs.js';
customElements.define('messenger-msgs', MessengerMsgs);

import MessengerChatInputs from "./messenger-chat-inputs.js";
customElements.define('messenger-chat-inputs', MessengerChatInputs);

const activeChatSymbol = Symbol('activeChat');

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
			<div class="empty">Выберите, кому хотели бы написать</div>
			<messenger-chat-header></messenger-chat-header>
			<messenger-msgs></messenger-msgs>
			<messenger-chat-inputs></messenger-chat-inputs>
		`;
	}
	
	constructor() {
		super();
		
		this.headerEl = this.shadowRoot.querySelector('messenger-chat-header');
		this.msgsEl = this.shadowRoot.querySelector('messenger-msgs');
		this.inputsEl = this.shadowRoot.querySelector('messenger-chat-inputs');
		this.emptyEl = this.shadowRoot.querySelector('.empty');
		this.showEmpty();
	}
	
	showEmpty() {
		console.log('MessengerChat -> showEmpty');
		this.emptyEl.classList.remove('hidden');
		this.headerEl.classList.add('hidden');
		this.msgsEl.classList.add('hidden');
		this.inputsEl.classList.add('hidden');
	}
	
	showChat() {
		console.log('MessengerChat -> showChat');
		this.emptyEl.classList.add('hidden');
		this.headerEl.classList.remove('hidden');
		this.msgsEl.classList.remove('hidden');
		this.inputsEl.classList.remove('hidden');
	}
	
	set activeChat(selectedChat) {
		console.log('3. MessengerChat -> set activeChat');
		console.log(selectedChat);
		
		this[activeChatSymbol] = selectedChat;
		if (!selectedChat) {
			console.log('Чат отсутствует');
			this.showEmpty();
			return;
		}
		console.log('Открываем чат:', selectedChat.title);
		this.showChat();
		this.headerEl.activeChat = selectedChat;
	}
	
	get value() {
		return this[activeChatSymbol];
	}
	
}