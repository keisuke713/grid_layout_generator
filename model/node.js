class Node{
    static space = "\t"
    static newLine = "\n"

    constructor(id, tag, style, text, depth){
        this.id        = id;
        this.tag       = tag;
        // hashmapの配列
        this.style     = style;
        this.text      = text;
        this.depth     = depth;
        this.childNode = [];
    }
    createFirstHtmlTag(){
        const tag = document.createElement("p");
        tag.innerText = `${Node.space.repeat(this.depth)}<${this.tag}${this.id}>`
        if(this.text.length > 0) tag.innerText += `${Node.newLine}${Node.space.repeat(this.depth + 1)}${this.text}`
        return tag;
    }
    createLastHtmlTag(){
        const tag = document.createElement("p");
        tag.innerText =`${Node.space.repeat(this.depth)}</${this.tag}${this.id}>`
        return tag;
    }
    createFirstStyleTag(){
        const tag = document.createElement("p");
        tag.innerText = `#${this.id}{`;
        return tag;
    }
    createStyleBodies(){
        return this.style.map(currStyle => {
            const body = document.createElement("p");
            body.innerText = `${Node.space}${currStyle.getOrDefault("property", "")}: ${currStyle.getOrDefault("value", "")}${currStyle.getOrDefault("unit","")};`
            return body;
        })
    }
    createLastStyleTag(){
        const tag = document.createElement("p");
        tag.innerText = `}`;
        return tag;
    }
}