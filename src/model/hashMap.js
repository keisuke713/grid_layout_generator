class HashMap{
    constructor(){
        this.map = new Map();
    }
    set(key, value){
        this.map.set(key, value);
    }
    has(key){
        return this.map.has(key);
    }
    get(key){
        return this.map.get(key);
    }
    getOrDefault(key, defaultValue){
        if(!this.map.has(key)) return defaultValue;
        return this.map.get(key);
    }
    delete(key){
        this.map.delete(key);
    }
}