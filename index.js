// ========================== <<消しちゃだめ！！>> nodeをつくってレンダリング ===============================
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

// console.log(dom);

// dom.print();


// ======================= <<消しちゃだめ！！>> htmlとstyleをコピーするイベントリスナー ============================

// let str = document.getElementById("code").innerText;
// str = str.replace("\n", "").replace(/\n\n/g, "\n");

// document.getElementById("copy").addEventListener("click", () => {
//     navigator.clipboard.writeText(str);
// })

// let str2 = document.getElementById("code2").innerText;
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

// box.onmousedown = (event) => {
//     box.style.border = "3px solid red";
//     box.style.zIndex = 1000;
//     document.body.append(box);

//     const shiftY  = event.pageY - box.offsetTop;
//     const shiftX = event.pageX - box.offsetLeft;

//     moveAt(event.pageX, event.pageY);

//     function moveAt(pageX, pageY){
//         box.style.left = (pageX - shiftX) + "px";
//         box.style.top  = (pageY - shiftY) + "px";
//     }

//     function onMouseMove(event){
//         moveAt(event.pageX, event.pageY);
//     }

//     document.addEventListener("mousemove", onMouseMove);

//     box.onmouseup = () => {
//         document.removeEventListener('mousemove', onMouseMove);
//         box.onmouseup = null;
//         box.style.border = "none";
//     }
// }

// box.ondragstart = function() {
//     return false;
// };


// =================== new ====================
// (function(){
//     console.log("test");
//     //要素の取得
//     const elements = document.getElementsByClassName("box");

//     //要素内のクリックされた位置を取得するグローバル（のような）変数
//     let x;
//     let y;

//     //マウスが要素内で押されたとき、又はタッチされたとき発火
//     for(var i = 0; i < elements.length; i++) {
//         elements[i].addEventListener("mousedown", mdown, false);
//         elements[i].addEventListener("touchstart", mdown, false);
//     }

//     //マウスが押された際の関数
//     function mdown(e) {
//         console.log("mdown");
//         //クラス名に .drag を追加
//         this.classList.add("drag");

//         //タッチデイベントとマウスのイベントの差異を吸収
//         if(e.type === "mousedown") {
//             var event = e;
//         } else {
//             var event = e.changedTouches[0];
//         }

//         //要素内の相対座標を取得
//         x = event.pageX - this.offsetLeft;
//         y = event.pageY - this.offsetTop;

//         //ムーブイベントにコールバック
//         // ここをbodyじゃなく親要素にしちゃえばはみ出さなくなる？
//         document.body.addEventListener("mousemove", mmove, false);
//         document.body.addEventListener("touchmove", mmove, false);
//     }

//     //マウスカーソルが動いたときに発火
//     function mmove(e) {
//         console.log("mmove");
//         //ドラッグしている要素を取得
//         var drag = document.getElementsByClassName("drag")[0];

//         //同様にマウスとタッチの差異を吸収
//         if(e.type === "mousemove") {
//             var event = e;
//         } else {
//             var event = e.changedTouches[0];
//         }

//         //フリックしたときに画面を動かさないようにデフォルト動作を抑制
//         e.preventDefault();

//         //マウスが動いた場所に要素を動かす
//         drag.style.top = event.pageY - y + "px";
//         drag.style.left = event.pageX - x + "px";

//         //マウスボタンが離されたとき、またはカーソルが外れたとき発火
//         drag.addEventListener("mouseup", mup, false);
//         document.body.addEventListener("mouseleave", mup, false);
//         drag.addEventListener("touchend", mup, false);
//         document.body.addEventListener("touchleave", mup, false);

//     }

//     //マウスボタンが上がったら発火
//     function mup(e) {
//         console.log("mup");
//         var drag = document.getElementsByClassName("drag")[0];

//         //ムーブベントハンドラの消去
//         document.body.removeEventListener("mousemove", mmove, false);
//         drag.removeEventListener("mouseup", mup, false);
//         document.body.removeEventListener("touchmove", mmove, false);
//         drag.removeEventListener("touchend", mup, false);

//         //クラス名 .drag も消す
//         drag.classList.remove("drag");
//     }
// })()

// document.getElementById("add").addEventListener("click", () => {
//     const colors = ["green", "yellow", "burlywood", "blue", "skyblue", "purple"];
//     const div = document.createElement("div");
//     div.classList.add("box");
//     div.style.background = colors[Math.floor(Math.random() * colors.length)];

//     addMoveEvent(div);
//     document.getElementById("test1").append(div);
// })

function addDivEle(){
    const colors = ["green", "yellow", "burlywood", "blue", "skyblue", "purple"];
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.background = colors[Math.floor(Math.random() * colors.length)];

    addMoveEvent(div);
    document.getElementById("test1").append(div);
}

function addMoveEvent(ele){
    // 要素ないのクリックされた位置を取得する変数
    let x;
    let y;

    // mousedownまたはtouchdstartのイベント定義
    ele.addEventListener("mousedown", mousedown, false);
    ele.addEventListener("touchstart", mousedown, false);

    function mousedown(event){
        console.log("mousedown");
        this.classList.add("drag");

        if(event.type !== "mousedown") event = event.changedTouches[0];
        console.log(event);

        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        document.body.addEventListener("mousemove", mousemove, false);
        document.body.addEventListener("touchmove", mousemove, false);
    }

    function mousemove(event){
        console.log("mousemove");

        // mousedown内でイベントを追加する時にbodyではなくboxにしたらここはthisで行ける？
        // その場合ドラッグできる範囲はどうなる？
        const drag = document.getElementsByClassName("drag")[0];

        if(event.type !== "mousemove") event = event.changedTouches[0];

        event.preventDefault();

        drag.style.top  = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        drag.addEventListener("mouseup", mouseup, false);
        document.body.addEventListener("mouseleave", mouseup, false);
        drag.addEventListener("touchend", mouseup, false);
        document.body.addEventListener("touchleave", mouseup, false);
    }

    function mouseup(event){
        console.log("mouseup");
        const drag = document.getElementsByClassName("drag")[0];

        document.body.removeEventListener("mousemove", mousemove, false);
        drag.removeEventListener("mouseup", mouseup, false);
        document.body.removeEventListener("touchmove", mousemove, false);
        drag.removeEventListener("touchend", mouseup, false);

        console.log(drag);
        drag.classList.remove("drag");
        console.log("done");
    }
}