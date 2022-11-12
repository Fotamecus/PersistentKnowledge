class PKControl extends FormApplication {
    constructor(...args) {
        super(...args);
        game.users.apps.push(this);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'pk-control';
        options.template = 'modules/persistent-knowledge/templates/control.html';
        options.title = 'Persistent Knowledge - GM Controls';
        options.width = 250;
        options.height = 600;
        options.resizable = true;
        return options;
    }

    async getData() {
        // Return data to the template
        return {
            identifiables: game.actors.filter(a => a.constructor.name === 'ActorNPCPF'),
            characters: game.actors.filter(a => a.constructor.name === 'ActorCharacterPF'),
            settings: game.settings.get('persistent-knowledge', 'pkSettings')
        };
    }

    render(force, options = {}) {
        return super.render(force, options);
    }

    activateListeners(html) {
        super.activateListeners(html);
        this.element.find('.pk-control-input').keyup(event => this.updateFilter(event));
        this.element.find('.pk-control-result').click(event => this.select(event));
    }

    select(event) {
        this.element.find('.pk-control-result').removeClass('selected');
        const selectedElement = event.target.closest('.pk-control-result');
        selectedElement.classList.add('selected');
        this.element.find('.pk-control-detail').addClass('hidden');
        this.element.find('.pk-control-detail').filter((_, e) => e.dataset.id === selectedElement.dataset.id).removeClass('hidden');

    }

    updateFilter(event) {
        this.element.find('.pk-control-result').each((_, e) => {
            if (~e.innerText.toLowerCase().indexOf(event.target.value.toLowerCase())) {
                e.classList.remove('hidden');
            } else {
                e.classList.add('hidden');
            }
        });
    }
}
