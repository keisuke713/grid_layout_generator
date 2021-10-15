class Node{
    static space = "\t"
    static newLine = "\n"

    constructor(id, tag, style, text, depth){
        this.id        = id;
        this.tag       = tag;
        // styleクラスの配列
        this.style     = style;
        this.text      = text;
        this.depth     = depth;
        this.children = [];
    }
    existChildById(id){
        for(const node of this.children){
            if(node.id == id) return true;
        }
        return false;
    }
    getChildById(id){
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
        this.style.push(style);
    }
    createFirstHtmlTag(){
        const tag = document.createElement("p");
        tag.innerText = `${Node.space.repeat(this.depth)}<${this.tag} id=div${this.id}>`
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
        return this.style.map(currStyle => {
            const body = document.createElement("p");
            body.innerText = currStyle.createStyleBody();
            return body;
        })
    }
    createLastStyleTag(){
        const tag = document.createElement("p");
        tag.innerText = `}`;
        return tag;
    }
}