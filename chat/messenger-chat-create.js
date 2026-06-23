class MessengerChatCreate extends Base {
	get css() {
		return `
			<style>
				:host {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					inset: 0;
					background: rgba(0,0,0,.5);
				}
				:host(.hidden) {
					display: none;
				}
				.modal {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 10px;
					width: 250px;
					height: 130px;
					background: #282A2E;
					border: 1px solid #202225;
					border-radius: 8px;
					padding: 10px;
				}
				.header {
					font-size: 18px;
					font-weight: bold;
				}
				.input {
					height: 36px;
					padding: 0 10px;
					background: #313438;
					border: 1px solid #202225;
					color: #E8E6E1;
				}
				.input:focus {
					outline: none;
				}
				.input.error::placeholder {
					color: red;
				}
				.buttons {
					display: flex;
					justify-content: flex-end;
					gap: 10px;
					width: 100%;
				}
				button {
					height: 36px;
					padding: 0 16px;
					border: none;
					cursor: pointer;
					background: none;
					color: white;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="modal">
				<div class="header">Создание чата</div>
				<input class="input title" type="text" placeholder="Название чата">
				<div class="buttons">
					<button class="cancel">Отмена</button>
					<button class="ok">ОК</button>
				</div>
			</div>
		`;
	}
	
	constructor() {
		super();
		
		this.titleEl = this.shadowRoot.querySelector('.title');
		this.cancelEl = this.shadowRoot.querySelector('.cancel');
		this.okEl = this.shadowRoot.querySelector('.ok');
		this.defaultPlaceholder = 'Название чата';
		
		this.cancelEl.addEventListener('click', () => {
			this.close();
		});
		
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && this.classList.contains('hidden')) {
			this.close();
			}
		});
		
		this.okEl.addEventListener('click', () => {
			const title = this.titleEl.value.trim();
			if (!title) {
				this.showError('Введите название чата');
				return;
			}
			const chat = {
				id: crypto.randomUUID(),
				title,
				messages: []
			};
			this.emit('chat-create-confirm', { chat });
		});
		
		this.titleEl.addEventListener('input', () => {
			this.titleEl.classList.remove('error');
			this.titleEl.placeholder = this.defaultPlaceholder;
		})
		
		this.titleEl.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				this.okEl.click();
			}
		});
		
		this.addEventListener('chat-create-error', e => {
			this.showError(e.detail.message);
		});
	}
	
	reset() {
		this.titleEl.value = '';
		this.titleEl.classList.remove('error');
		this.titleEl.placeholder = this.defaultPlaceholder;
	}
	
	showError(message) {
		this.titleEl.classList.add('error');
		this.titleEl.value = '';
		this.titleEl.placeholder = message;
	}
	
	open() {
		this.classList.remove('hidden');
		this.reset();
		requestAnimationFrame(() => {
			this.titleEl.focus();
		});
	}
	
	close() {
		this.classList.add('hidden');
		this.reset();
	}
}

customElements.define('messenger-chat-create', MessengerChatCreate);