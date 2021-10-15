class Style{
    static space = "\t"
    
    constructor(property, value, unit){
        this.property = property;
        this.value    = value;
        this.unit     = unit;
    }
    createStyleBody(){
        return `${Style.space}${this.getProperty()}: ${this.getValue()}${this.getUnit()};`
    }
    getProperty(){
        return this.property == null ? "" : this.property;
    }
    getValue(){
        return this.value == null ? "" : this.value;
    }
    getUnit(){
        return this.unit == null ? "" :this.unit;
    }
}
alert("cssの使うプロパティ洗い出して全部Styleクラスのサブクラスに数r");