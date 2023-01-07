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
        options.width = 500;
        options.height = 750;
        options.resizable = true;
        return options;
    }

    async getData() {
        // Return data to the template
        return {
            identifiables: this.getIdentifiables(),
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
        this.element.find('.pk-property-value .pk-attack-button').click(event => this.show('.pk-attack-button', event));
        this.element.find('.pk-property-value .pk-special-feature-button').click(event => this.show('.pk-special-feature-button', event));
        this.element.find('.pk-property-value .pk-spell-button').click(event => this.show('.pk-spell-button', event));
    }

    select(event) {
        this.element.find('.pk-control-result').removeClass('selected');
        const selectedElement = event.target.closest('.pk-control-result');
        selectedElement.classList.add('selected');
        this.element.find('.pk-control-detail').addClass('hidden');
        this.element.find('.pk-control-detail').filter((_, e) => e.dataset.id === selectedElement.dataset.id).removeClass('hidden');
    }

    show(type, event) {
        const actor = game.actors.get(event.target.closest('.pk-control-detail').dataset.id);
        const ability = actor.items.get(event.target.closest(type).dataset.id);
        ability.sheet.render(true);
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

    trimName(name) {
        return name.split('(')[0].trim();
    }

    upCase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getIdentifiables() {
        return game.actors.filter(a => a.constructor.name === 'ActorNPCPF').map(i => {
            return { ...i, id: i.id, stats: this.getIdentifiableStats(i) }
        });
    }

    getIdentifiableStats(actor) {
        return {
            ac: this.getAC(actor),
            attacks: this.getAttacks(actor),
            level: this.getLevel(actor),
            type: this.getType(actor),
            immunities: this.getImmunities(actor),
            dr: this.getDR(actor),
            resistances: this.getResistances(actor),
            vulnerabilities: this.getVulnerabilities(actor),
            hd: this.getHD(actor),
            hp: this.getHP(actor),
            languages: this.getLanguages(actor),
            saves: this.getSaves(actor),
            senses: this.getSenses(actor),
            speed: this.getSpeed(actor),
            specialFeatures: this.getSpecialFeatures(actor),
            sr: this.getSpellResistance(actor),
            spells: this.getSpells(actor)
        };
    }

    getAC(actor) {
        return {
            ac: actor.system.attributes.ac.normal.total,
            touch: actor.system.attributes.ac.touch.total,
            flatFooted: actor.system.attributes.ac.flatFooted.total
        };
    }

    getAttacks(actor) {
        return actor.items.filter(i => i.constructor.name === 'ItemAttackPF').map(i => {
            return { id: i.id, name: this.trimName(i.name) };
        });
    }

    getLevel(actor) {
        return actor.system.details.level.value;
    }

    getType(actor) {
        return this.trimName(actor.classes[Object.keys(actor.classes)[0]].name);
    }

    getImmunities(actor) {
        return actor.system.traits.di.value.map(i => this.upCase(i));
    }

    getDR(actor) {
        return actor.system.traits.dr;
    }

    getResistances(actor) {
        return actor.system.traits.eres;
    }

    getVulnerabilities(actor) {
        return actor.system.traits.dv.value.map(i => this.upCase(i));
    }

    getHD(actor) {
        return actor.system.attributes.hd.total;
    }

    getHP(actor) {
        return actor.system.attributes.hp.value;
    }

    getLanguages(actor) {
        return actor.system.traits.languages.value.map(i => this.upCase(i));
    }

    getSaves(actor) {
        return {
            fort: actor.system.attributes.savingThrows.fort.total,
            ref: actor.system.attributes.savingThrows.ref.total,
            will: actor.system.attributes.savingThrows.will.total
        };
    }

    getSenses(actor) {
        let senses = [];
        if (actor.system.traits.senses.bs) senses.push('Blindsight ' + actor.system.traits.senses.bs);
        if (actor.system.traits.senses.bse) senses.push('Blindsense ' + actor.system.traits.senses.bse);
        if (actor.system.traits.senses.dv) senses.push('Darkvision ' + actor.system.traits.senses.dv);
        if (actor.system.traits.senses.ll.enabled) senses.push('Low-Light Vision');
        if (actor.system.traits.senses.sc) senses.push('Scent');
        if (actor.system.traits.senses.si) senses.push('See Invisible');
        if (actor.system.traits.senses.sid) senses.push('See In Darkness');
        if (actor.system.traits.senses.tr) senses.push('Truesight');
        if (actor.system.traits.senses.ts) senses.push('Tremorsense ' + actor.system.traits.senses.ts);
        return senses;
    }

    getSpeed(actor) {
        let speeds = [];
        if (actor.system.attributes.speed.burrow.total) speeds.push('Burrow ' + actor.system.attributes.speed.burrow.total);
        if (actor.system.attributes.speed.climb.total) speeds.push('Climb ' + actor.system.attributes.speed.climb.total);
        if (actor.system.attributes.speed.fly.total) speeds.push('Fly ' + actor.system.attributes.speed.fly.total);
        if (actor.system.attributes.speed.land.total) speeds.push('Land ' + actor.system.attributes.speed.land.total);
        if (actor.system.attributes.speed.swim.total) speeds.push('Swim ' + actor.system.attributes.speed.swim.total);
        return speeds;
    }

    getSpecialFeatures(actor) {
        return actor.items.filter(i => i.constructor.name === 'ItemFeatPF').map(i => {
            return { id: i.id, name: this.trimName(i.name) };
        });
    }

    getSpellResistance(actor) {
        return actor.system.attributes.sr.total;
    }

    getSpells(actor) {
        return actor.items.filter(i => i.constructor.name === 'ItemSpellPF').map(i => {
            return { id: i.id, name: this.trimName(i.name) };
        });
    }
}
