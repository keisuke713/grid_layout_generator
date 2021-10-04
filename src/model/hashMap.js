class HashMap{
    constructor(){
        this.map = new Map();
    }
    set(key, value){
        this.map.set(key, value);
    }
    getOrDefault(key, defaultValue){
        if(!this.map.has(key)) return defaultValue;
        return this.map.get(key);
    }
    delete(key){
        this.map.delete(key);
    }
}