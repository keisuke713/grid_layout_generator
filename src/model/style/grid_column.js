class GridColumn extends Style{
    createStyleBody(){
        return `${this.constructor.space}${this.getProperty()}: ${this.getValue().get("start")}/${this.getValue().get("end")}`;
    }
}

const hash = new HashMap();
hash.set("start", 1);
hash.set("end", 4);
const style = new GridColumn("grid-column", hash, "");
console.log(style.createStyleBody());