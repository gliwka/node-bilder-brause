import '../scss/app.scss';
import './Global/Globals.js';
import Browser from './Browser/index.js';

export default class Main extends NBBMODULECLASS {
    constructor(options) {
        super();

        return new Promise((resolve, reject) => {
            this.label = 'APP';
            console.log(this.label, 'INIT');

            this.app = this;
            this.options = options;

            //if (!this.options.debug) {
                this.urlBase = this.options.urlBase;
                this.urlFolderBase = this.options.urlFolderBase;
                this.urlImageBase = this.options.urlImageBase;
                this.urlMediaBase = this.options.urlMediaBase;
            /*} else {
                this.urlBase = `http://localhost:9000/v1`;
                this.urlFolderBase = `http://localhost:9000/v1/folder`;
                this.urlImageBase = `http://localhost:9000/v1/image`;
                this.urlMediaBase = `http://localhost:9000/v1/media`;
            }*/

            this.rootElement = this.options.target;
            this.target = this.rootElement;

            // the main app ready trigger
            // use it: this.app.on('ready' , ...) inside a NBBMODULECLASS
            this.on('ready', () => resolve());

            return new Browser(this).then(browser => {
                this.browser = browser;
                this.emit('ready');
            })

        });
    }
}
