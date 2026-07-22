const activeChatSymbol = Symbol('activeChat');
export default class MessengerMsgs extends Base {
	get css() {
		return `
			<style>
				:host {
					display: block;
					padding: 16px;
					overflow-y: auto;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			 <slot></slot>
		`;
	}
	
	constructor() {
		super();
		this.messageElLoaded = false;
		this.isLoadingMessageEl = false;
	}
	
	set activeChat(chat) {
		this[activeChatSymbol] = chat;
		this.renderMessages();
	}
	
	get activeChat() {
		return this[activeChatSymbol];
	}
	
	renderMessages() {
		if (!this.activeChat) return;
		
		if (!this.messageElLoaded) {
			if (this.isLoadingMessageEl) return;
			
			this.isLoadingMessageEl = true;
			
			import('./messenger-msg.js')
				.then(() => {
					this.messageElLoaded = true;
					this.isLoadingMessageEl = false;
					
					this.renderMessages();
				});
			
			return;
		}
		
		this.innerHTML = '';
		
		this.activeChat.messages.forEach(message => {
			const messageEl = document.createElement('messenger-msg');
			
			messageEl.value = message;
			
			this.append(messageEl);
		});
	}
}