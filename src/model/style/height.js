class Height extends Style{
    static property = "height";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue()}${this.getUnit()};`
    }
}