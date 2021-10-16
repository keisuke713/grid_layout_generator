class GridTemplateRows extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: repeat(${this.getValue()}, 1ft);`
    }
}

const style = new GridTemplateRows("grid-template-rows", 4, "");
console.log(style.createStyleBody());