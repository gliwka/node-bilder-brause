import Item from './Item.js';

export default class Image extends Item {
    constructor(parent, options) {
        super(parent, options);

        this.type = 'image';
        this.id = options.id;
        this.filePath = options.filePath;
        this.fileName = options.fileName;
        this.extension = options.extension;
        this.size = options.size;

        this.pathExtracted = this.filePath.replace(`${this.parent.rootPath}/`, '');
        this.pathCrumped = this.pathExtracted.split('/');

        this.thumbnailPathsCrumped = this.extractThumbnailPaths(3, 3);
        this.thumbnailPath = `${this.parent.thumbnailPath}/${this.thumbnailPathsCrumped.join('/')}/${this.hash}`;

        this.uri = encodeURI(this.pathCrumped.join('/')).replace(/^\//, '').replace(/\/$/, '');

    }

    extractThumbnailPaths(digits, count) {
        let chunks = [];
        for (let i = 0, e = digits; i < this.hash.length; i += digits, e += digits) {
            chunks.push(this.hash.substring(i, e));
        }
        chunks = chunks.filter((block, i) => i < count);
        return chunks;
    }

    aggregate() {
        return {
            type: this.type,
            id: this.id,
            filePath: this.filePath,
            fileName: this.fileName,
            extension: this.extension,
            size: this.size,

            pathExtracted: this.pathExtracted,
            pathCrumped: this.pathCrumped,

            thumbnailPathsCrumped: this.thumbnailPathsCrumped,
            thumbnailPath: this.thumbnailPath,

            uri: this.uri
        }
    }
};