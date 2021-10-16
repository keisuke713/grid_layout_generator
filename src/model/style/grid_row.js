class GridRow extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: ${this.getValue().get("start")}/${this.getValue().get("end")}`;
    }
}