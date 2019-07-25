export class Appuser {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public _id?: string,
        public role?: string,
        public google?: boolean,
        public image?: string
    ) {}

}
