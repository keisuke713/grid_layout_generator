class GridRowFactory{
    constructor(){
    }
    createGridRow(start, end){
        const value = new HashMap();
        value.set("start", start);
        value.set("end", end);

        return new GridRow(value, "");
    }
}