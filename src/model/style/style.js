class Style{
    static space = "\t"
    
    constructor(value, unit){
        this.value    = value;
        this.unit     = unit;
    }
    createStyleBody(){
        throw "this must be implemented";
    }
    getValue(){
        return this.value == null ? "" : this.value;
    }
    getUnit(){
        return this.unit == null ? "" :this.unit;
    }
}