class GridRow extends Style{
    static property = config.gridRow
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue().get("start")}/${this.getValue().get("end")}`;
    }
    updateStartRowTo(index){
        this.value.set("start", index);
    }
    updateEndRowTo(index){
        this.value.set("end", index);
    }
    toS(){
        return `start:${this.getValue().get("start")}, end:${this.getValue().get("end")}`;
    }
}