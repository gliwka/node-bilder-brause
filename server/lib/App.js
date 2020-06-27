import Config from '../../shared/lib/Config.js';
import Store from '../../shared/lib/Store/index.js';
import ImageServer from './ImageServer/index.js';
import Generator from './Generator/index.js';

export default class App extends NBBMODULECLASS {
    constructor(parent) {
        super(parent);

        return new Promise(resolve => {
            this.app = this;

            // config
            new Config(this)
                .then(config => {
                    this.config = config;
                    // store
                    return new Store(this);
                })
                .then(store => {
                    this.store = store;
                    return new Generator(this);
                })
                .then(generator => {
                    this.generator = generator;
                    return new ImageServer(this);
                })
                .then(imageserver => {
                    this.imageserver = imageserver;
                    resolve(this);
                })
        });

    }
}
