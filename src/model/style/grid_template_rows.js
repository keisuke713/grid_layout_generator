class GridTemplateRows extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: repeat(${this.getValue()}, 1ft);`
    }
}