class Display extends Style{
    static property = "display";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue()}${this.getUnit()};`
    }
}