export class listItemProvider implements listItemTemplate {
    constructor(
        public id: number,     
        public value: string,
        public url: string,
        public text: string,
        public component: string
    ) { }
}

export interface listItemTemplate {
    id: number;
    value: string;
    url: string;
    component: string;
    text: string;
}