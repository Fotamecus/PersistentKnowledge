class PK {
    static async init() {
        console.log('Persistent Knowledge module initialized');
    }

    static ready() {
        console.log('Persistent Knowledge module ready');
    }

    static getSceneControlButtons(buttons) {
        let tokenButton = buttons.find(b => b.name === 'token');

        if (tokenButton) {
            tokenButton.tools.push({
                name: 'pk',
                title: 'Persistent Knowledge',
                icon: 'fas fa-book',
                onClick: () => PK.buildForm(),
                button: true
            });
        }
    }

    static buildForm() {
        if (PK.form === undefined) PK.form = new PKForm();
        PK.form.render(true);
    }
}

class PKForm extends FormApplication {
    constructor(...args) {
        super(...args);
        game.users.apps.push(this);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'pk-form';
        options.template = 'modules/persistent-knowledge/templates/pk-form.html';
        options.title = 'Persistent Knowledge';
        options.width = 400;
        options.height = 400;
        options.resizable = true;
        return options;
    }

    async getData() {
        // Return data to the template
        const actors = game.actors.entities || game.actors.contents;
        const users = game.users.entities || game.users.contents;
        // TODO: get all the identifiable entities
        return {
            actors,
            users,
        };
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