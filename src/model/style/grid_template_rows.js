class GridTemplateRows extends Style{
    static property = "grid-template-rows";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: repeat(${this.getValue()}, 1ft);`
    }
}