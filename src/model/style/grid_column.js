class GridColumn extends Style{
    static property = "grid-column";
    createStyleBody(){
        return `${this.constructor.space}${this.constructor.property}: ${this.getValue().get("start")}/${this.getValue().get("end")}`;
    }
    updateStartColumnTo(index){
        this.value.set("start", index);
    }
    updateEndColumnTo(index){
        this.value.set("end", index);
    }
    toS(){
        return `start:${this.getValue().get("start")}, end:${this.getValue().get("end")}`;
    }
}