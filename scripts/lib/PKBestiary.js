class PKBestiary extends FormApplication {
    constructor(...args) {
        super(...args);
        game.users.apps.push(this);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'pk-bestiary';
        options.template = 'modules/persistent-knowledge/templates/bestiary.html';
        options.title = 'Bestiary';
        options.width = 400;
        options.height = 400;
        options.resizable = true;
        return options;
    }

    async getData() {
        // Return data to the template
        const knownMonsters = game.actors.filter(a => ![null, undefined].includes(a.getFlag('persistent-knowledge', game.userId)));
        console.log(knownMonsters);
        return { knownMonsters };
    }

    render(force, options = {}) {
        return super.render(force, options);
    }

    activateListeners(html) {
        super.activateListeners(html);
        //create events based on html template e.g.
        //html.find('button').click(event => this.someFunction(event));
    }
}