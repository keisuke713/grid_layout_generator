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