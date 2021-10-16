class Width extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: ${this.getValue()}${this.getUnit()};`
    }
}

const style = new Width("width", 100, "%");
console.log(style.createStyleBody());