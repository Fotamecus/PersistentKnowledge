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