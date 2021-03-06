class Node{
    static space = "\t"
    static newLine = "\n"

    constructor(id, tag, text, depth){
        this.id        = id;
        this.tag       = tag;
        // styleクラスのハッシュ
        this.style     = new HashMap();
        this.text      = text;
        this.children = [];
        this.depth = depth;
    }
    existChildById(id){
        for(const node of this.children){
            if(node.id == id) return true;
        }
        return false;
    }
    findChildById(id){
        for(const node of this.children){
            if(node.id == id) return node;
        }
        return null;
    }
    hasChildren(){
        return this.children.length > 0;
    }
    addChild(child){
        this.children.push(child);
    }
    addStyle(style){
        this.style.set(style.constructor.property, style);
    }
    addGridProperty(array2d){
        if(!this.hasChildren() && array2d.length > 0){
            this.addStyle(new Display("grid", ""));
            this.addStyle(new GridTemplateColumns(array2d[0].length, ""));
            this.addStyle(new GridTemplateRows(array2d.length, ""));
        }else{
            this.findStyle(config.gridTemplateColumns).updateValue(array2d[0].length);
            this.findStyle(config.gridTemplateRows).updateValue(array2d.length);
        }
    }
    hasStyle(property){
        return this.style.has(property);
    }
    findStyle(property){
        return this.style.get(property);
    }
    updateGridColumn(prevIndex, index, start){
        const gridColumn = this.findStyle(config.gridColumn);
        if(prevIndex != index) gridColumn.updateStartColumnTo(start+1);
        gridColumn.updateEndColumnTo(start+2);
    }
    updateGridRow(prevIndex, index, start){
        const gridRow = this.findStyle(config.gridRow);
        if(prevIndex != index) gridRow.updateStartRowTo(start+1);
        gridRow.updateEndRowTo(start+2);
    }
    createFirstHtmlTag(){
        const tag = document.createElement("p");
        tag.innerText = `${Node.space.repeat(this.depth)}<${this.tag} id="${this.tag}${this.id}>`
        if(this.text.length > 0) tag.innerText += `${Node.newLine}${Node.space.repeat(this.depth + 1)}${this.text}`
        return tag;
    }
    createLastHtmlTag(){
        const tag = document.createElement("p");
        tag.innerText =`${Node.space.repeat(this.depth)}</${this.tag}>`
        return tag;
    }
    createFirstStyleTag(){
        const tag = document.createElement("p");
        tag.innerText = `#div${this.id}{`;
        return tag;
    }
    createStyleBodies(){
        const bodyList = [];
        this.style.forEach((value,key,map) => {
            const body = document.createElement("p");
            body.innerText = value.createStyleBody();
            bodyList.push(body);
        });
        return bodyList;
    }
    createLastStyleTag(){
        const tag = document.createElement("p");
        tag.innerText = `}`;
        return tag;
    }
}