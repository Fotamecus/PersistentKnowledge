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
            baseDC: baseDC,
            intervalDC: intervalDC,
            sharedKnowledge: sharedKnowledge,
            identifiables: other
        };

        game.settings.set('persistent-knowledge', 'pkSettings', data);
    }
}