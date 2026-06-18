class MessengerChatsItem extends Base {
	get css() {
		return `
			<style>
				:host {
					display: flex;
                    padding: 0 10px;
                    height: 50px;
                    align-items: center;
                    cursor: pointer;
                    transition: background 0.15s linear;
				}
				:host(:hover) {
                    background: #282A2E;
                }
			</style>
		`;
	}
	
	get html() {
		return `
			<p class="chat_name"></p>
		`;
	}
	
	constructor() {
		super();
	}
	
	set name(value) {
		const p = this.shadowRoot.querySelector('.chat_name');
		if (p) p.innerText = value;
	}
}

customElements.define('messenger-chats-item', MessengerChatsItem);