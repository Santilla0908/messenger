const messageSymbol = Symbol('message');

class MessengerMsg extends Base {
	get css() {
		return `
			<style>
				:host {
					display: block;
					padding: 8px 10px;
					margin: 5px;
					background: #313438;
					border-radius: 8px;
					width: fit-content;
					max-width: 70%;
					word-break: break-word;
				}
				
				.time {
					margin-top: 4px;
					font-size: 11px;
					opacity: 0.7;
					text-align: right;
				}

				
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="text"></div>
			<div class="time"></div>
		`;
	}
	
	constructor() {
		super();
		
		this.textEl = this.shadowRoot.querySelector('.text');
		this.timeEl = this.shadowRoot.querySelector('.time');
	}
	
	set value(message) {
		this[messageSymbol] = message;
		this.textEl.innerText = message.text;
		const date = new Date(message.createdAt);
		this.timeEl.innerText = date.toLocaleTimeString(
			'ru-RU',
			{
				hour: '2-digit',
				minute: '2-digit'
			}
		);
	}
	
	get value() {
		return this[messageSymbol];
	}
}

customElements.define('messenger-msg', MessengerMsg);