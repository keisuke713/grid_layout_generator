class GridTemplateColumns extends Style{
    static property = "grid-template-columns";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: repeat(${this.getValue()}, 1fr);`
    }
    updateValue(value){
        this.value = value;
    }
}