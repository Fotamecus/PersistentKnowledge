class PK {
    static async init() {
        console.log('Persistent Knowledge module initialized');
    }

    static ready() {
        game.settings.registerMenu('persistent-knowledge', 'pkSettingsMenu', {
            name: 'Persistent Knowledge Settings',
            label: 'Persistent Knowledge Settings',
            hint: 'Configure Persistent Knowledge',
            icon: 'fas fa-book',
            type: PKSettings,
            restricted: true,
        });

        game.settings.register('persistent-knowledge', 'pkSettings', {
            scope: 'world',
            config: false,
            type: Object,
            default: {
                acBreakdown: true,
                baseDC: 15,
                intervalDC: 5,
                sharedKnowledge: false,
                identifiables: {
                    ac: true,
                    attacks: true,
                    level: true,
                    type: true,
                    immunities: true,
                    dr: true,
                    resistances: true,
                    vulnerabilities: true,
                    hd: true,
                    hp: true,
                    languages: true,
                    saves: true,
                    senses: true,
                    speed: true,
                    specialFeatures: true,
                    spellResistance: true,
                    spells: true
                }
            }
        });
        
        console.log('Persistent Knowledge module ready');
    }

    static getSceneControlButtons(buttons) {
        let tokenButton = buttons.find(b => b.name === 'token');

        if (tokenButton) {
            tokenButton.tools.push({
                name: 'pk-bestiary',
                title: 'PK Bestiary',
                icon: 'fas fa-book',
                onClick: () => PK.buildBestiaryForm(),
                button: true
            });
            if (game.user.isGM) {
                tokenButton.tools.push({
                    name: 'pk-controls',
                    title: 'PK GM Controls',
                    icon: 'fas fa-sliders-up',
                    onClick: () => PK.buildControlForm(),
                    button: true
                });
            }
        }
    }

    static buildBestiaryForm() {
        if (PK.bestiaryForm === undefined) PK.bestiaryForm = new PKBestiary();
        PK.bestiaryForm.render(true);
    }

    static buildControlForm() {
        if (PK.controlForm === undefined) PK.controlForm = new PKControl();
        PK.controlForm.render(true);
    }
}
