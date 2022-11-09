export default class PKControl extends FormApplication {
    constructor(...args) {
        super(...args);
        game.users.apps.push(this);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'pk-control';
        options.template = 'modules/persistent-knowledge/templates/control.html';
        options.title = 'Persistent Knowledge - GM Controls';
        options.width = 400;
        options.height = 400;
        options.resizable = true;
        return options;
    }

    async getData() {
        // Return data to the template
        return {};
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