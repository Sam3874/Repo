export class contentProvider {
    constructor(
        public RowNum: number,
        public Quantity: any,
        public Required: boolean,
        public Justification: string,
        public Comments: string,
        public Date: any,
        public DialogInput: boolean,
        public DialogOptions: dialogOptionsProvider
    ) { }
}

export class dialogOptionsProvider {
    constructor(
        public Option1: boolean,
        public OptionQuantity: any,
        public Option2: boolean
    ) { }
}