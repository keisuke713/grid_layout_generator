class GridColumnFactory{
    constructor(){
    }
    createGridColumn(start, end){
        const value = new HashMap();
        value.set("start", start);
        value.set("end", end);

        return new GridColumn(value, "");
    }
}