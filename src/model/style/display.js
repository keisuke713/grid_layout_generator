class Display extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: ${this.getValue()}${this.getUnit()};`
    }
}