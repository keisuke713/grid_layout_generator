class GridRow extends Style{
    static property = "grid-row";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue().get("start")}/${this.getValue().get("end")}`;
    }
}