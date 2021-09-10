// 1回innerHtmlに変換してからやる方法
// const parseHtmlString = (html) => {
//     const arr = html.split(/\<|\>/).filter(str => str.length > 0);
//     const stack = [];
  
//     const lessSign = "&lt;"
//     const greaterSign = "&gt;\n"
//     const space = "\t"
  
//     for(let i=0; i<arr.length; i++){
//         if(arr[i].charAt(0) != "/"){
//             stack.push([i, arr[i]])
//             continue;
//         }
//         const arr1 = stack.pop();
//         arr[arr1[0]] = space.repeat(stack.length) + lessSign + arr1[1] + greaterSign;
//         arr[i] = space.repeat(stack.length) + lessSign + arr[i] + greaterSign;
//     }
  
//     return arr.join("");
// }

// document.getElementById("translate").addEventListener("click", function(){
//     const input = document.getElementById("code-input").value;
//     const code  = document.getElementById("code");
//     code.innerHTML = parseHtmlString(input);
// })


// ================== nodeの定義 ==========================
class DOM{
    constructor(head, htmlParentNode, styleParentNode){
        this.head           = head;
        this.htmlParentNode = htmlParentNode;
        this.styleParentNode  = styleParentNode;
    }
    print(){
        this.printHelper(this.head);
    }
    printHelper(currNode){
        this.htmlParentNode.append(currNode.createFirstHtmlTag());

        this.styleParentNode.append(currNode.createFirstStyleTag());
        for(const style of currNode.createStyleBodies()){
            this.styleParentNode.append(style);
        }
        this.styleParentNode.append(currNode.createLastStyleTag());
    
        currNode.childNode.forEach(node => {
            this.printHelper(node);
        });

        this.htmlParentNode.append(currNode.createLastHtmlTag());
    }
}

class Node{
    static space = "\t"
    static newLine = "\n"

    constructor(id, tag, style, text, depth){
        this.id        = id;
        this.tag       = tag;
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

const node0 = new Node(0, "div", [], "top", 0, []);
const node1 = new Node(1, "div", [], "", 1, []);
const node2 = new Node(2, "div", [], "", 2, []);
const node3 = new Node(3, "div", [], "keisuke", 3, []);
const node4 = new Node(4, "div", [], "", 3, []);
const node5 = new Node(5, "div", [], "", 2, []);
const node6 = new Node(6, "div", [], "", 1, []);
const node7 = new Node(7, "div", [], "", 2, []);

node2.childNode.push(node3);
node2.childNode.push(node4);
node1.childNode.push(node2);
node1.childNode.push(node5);
node6.childNode.push(node7);
node0.childNode.push(node1);
node0.childNode.push(node6);

const map = new HashMap();
map.set("property", "display");
map.set("value", "grid");

const map2 = new HashMap();
map2.set("property", "width");
map2.set("value", "95");
map2.set("unit", "%");

node0.style.push(map);
node0.style.push(map2);

node7.style.push(map2);

const dom = new DOM(node0, document.getElementById("code"), document.getElementById("code2"));

console.log(dom);

dom.print();


// ======================= htmlとstyleをコピーするイベントリスナー ============================

let str = document.getElementById("code").innerText;
str = str.replace("\n", "").replace(/\n\n/g, "\n");

document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(str);
})

let str2 = document.getElementById("code2").innerText;
str2 = str2.replace("\n", "").replace(/\n\n/g, "\n");

document.getElementById("copy2").addEventListener("click", () => {
    navigator.clipboard.writeText(str2);
})