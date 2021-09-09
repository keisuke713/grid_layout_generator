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

// これどうしようかー
// ======================== copyは今後弄るから保留 ========================
// document.getElementById("copy").addEventListener("click", function(){
//     const code  = document.getElementById("code");

//     const copyTextarea = document.getElementById("test")
//     copyTextarea.value = code.innerHTML;

//     copyTextarea.focus();
//     copyTextarea.select();

//     try {
//         const successful = document.execCommand('copy');
//         const msg = successful ? 'successful' : 'unsuccessful';
//         console.log('Copying text command was ' + msg);
//     } catch (err) {
//         console.log('Oops, unable to copy');
//     }
// })

// ================== nodeの定義 ==========================
class DOM{
    constructor(head, htmlParentNode){
        this.head           = head;
        this.htmlParentNode = htmlParentNode;
    }
    print(){
        this.printHelper(this.head);
    }
    printHelper(currNode){
        this.htmlParentNode.append(currNode.createFirstTag());
    
        currNode.childNode.forEach(node => {
            this.printHelper(node);
        });

        this.htmlParentNode.append(currNode.createLastTag());
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
    createFirstTag(){
        const tag = document.createElement("p");
        tag.innerText = `${Node.space.repeat(this.depth)}<${this.tag}${this.id}>`
        if(this.text.length > 0) tag.innerText += `${Node.newLine}${Node.space.repeat(this.depth + 1)}${this.text}`
        return tag;
    }
    createLastTag(){
        const tag = document.createElement("p");
        tag.innerText =`${Node.space.repeat(this.depth)}</${this.tag}${this.id}>`
        return tag;
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

const pre  = document.getElementById("pre");
const code  = document.getElementById("code");

const dom = new DOM(node0, code);

console.log(dom);

dom.print();
