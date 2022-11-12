class PKSettings extends FormApplication {
    constructor(...args) {
        super(...args);
        game.users.apps.push(this);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = 'pk-settings';
        options.template = 'modules/persistent-knowledge/templates/settings.html';
        options.title = 'Persistent Knowledge Settings';
        options.width = 400;
        options.resizable = true;
        return options;
    }

    render(force, options = {}) {
        return super.render(force, options);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    getData() {
        return game.settings.get('persistent-knowledge', 'pkSettings');
    }

    _updateObject(_, formData) {
        const { acBreakdown, baseDC, intervalDC, sharedKnowledge, ...other } = formData;
        const data = {
            acBreakdown: acBreakdown,
            baseDC: baseDC == null ? 15 : baseDC, // if baseDC is null, set it to 15
            intervalDC: intervalDC == null ? 5 : intervalDC, // if intervalDC is null, set it to 5
            sharedKnowledge: sharedKnowledge,
            identifiables: other
        };
        console.log(data);
        game.settings.set('persistent-knowledge', 'pkSettings', data);
    }
}
