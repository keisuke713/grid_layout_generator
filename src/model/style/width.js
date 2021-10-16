class Width extends Style{
    static property = "width";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue()}${this.getUnit()};`
    }
}