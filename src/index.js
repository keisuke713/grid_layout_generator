// ========================== <<消しちゃだめ！！>> nodeをつくってレンダリング ===============================
// const node0 = new Node(0, "div", [], "top", 0, []);
// const node1 = new Node(1, "div", [], "", 1, []);
// const node2 = new Node(2, "div", [], "", 2, []);
// const node3 = new Node(3, "div", [], "keisuke", 3, []);
// const node4 = new Node(4, "div", [], "", 3, []);
// const node5 = new Node(5, "div", [], "", 2, []);
// const node6 = new Node(6, "div", [], "", 1, []);
// const node7 = new Node(7, "div", [], "", 2, []);
// const node8 = new Node(8, "div", [], "", 3, []);
// const node9 = new Node(9, "div", [], "", 4, []);
// const node10 = new Node(10, "div", [], "", 5, []);
// const node11 = new Node(11, "div", [], "", 6, []);
// const node12 = new Node(12, "div", [], "", 7, []);
// const node13 = new Node(13, "div", [], "", 8, []);

// node2.childNode.push(node3);
// node2.childNode.push(node4);
// node1.childNode.push(node2);
// node1.childNode.push(node5);

// node12.childNode.push(node13);
// node11.childNode.push(node12);
// node10.childNode.push(node11);
// node9.childNode.push(node10);
// node8.childNode.push(node9);
// node7.childNode.push(node8);
// node6.childNode.push(node7);
// node0.childNode.push(node1);
// node0.childNode.push(node6);

// node0.style.push(new Style("display", "grid"));
// node0.style.push(new Style("width", "95", "%"));

// node7.style.push(new Style("width", "95", "%"));

const styles = [
    new Width("100", "%"),
    new Height("100", "%"),
    new Display("grid", "")
]

const parentNode = new Node(0, "div", styles, "", 0);

const dom = new DOM(parentNode, document.getElementById("html-code"), document.getElementById("style-code"));

console.log(dom);

// dom.print();


// ======================= <<消しちゃだめ！！>> htmlとstyleをコピーするイベントリスナー ============================

// let str = document.getElementById("html-code").innerText;
// str = str.replace("\n", "").replace(/\n\n/g, "\n");

// document.getElementById("copy").addEventListener("click", () => {
//     navigator.clipboard.writeText(str);
// })

// let str2 = document.getElementById("style-code").innerText;
// str2 = str2.replace("\n", "").replace(/\n\n/g, "\n");

// document.getElementById("copy2").addEventListener("click", () => {
//     navigator.clipboard.writeText(str2);
// })

// ============================================== <<消しちゃだめ！！>> ドラッグアンドドロップ ==============================================

// for(let box of document.getElementsByClassName("box")){
//     box.onmousedown = (event) => {
//         console.log("mousedown");
//         box.style.border = "3px solid red";
//         box.style.zIndex = 1000;
//         box.classList.add("drag");
//         document.body.append(box);
    
//         const shiftY  = event.pageY - box.offsetTop;
//         const shiftX = event.pageX - box.offsetLeft;
    
//         moveAt(event.pageX, event.pageY);
    
//         function moveAt(pageX, pageY){
//             box.style.left = (pageX - shiftX) + "px";
//             box.style.top  = (pageY - shiftY) + "px";
//         }
    
//         function onMouseMove(event){
//             console.log("mousemove");
//             moveAt(event.pageX, event.pageY);
//         }
    
//         document.addEventListener("mousemove", onMouseMove);
    
//         box.onmouseup = () => {
//             console.log("mouseup");
//             document.removeEventListener('mousemove', onMouseMove);
//             box.onmouseup = null;
//             box.classList.remove("drag");
//             box.style.zIndex = 0;
//             box.style.border = "1px solid black";
//         }
//     }
    
//     box.ondragstart = function() {
//         return false;
//     };
// }