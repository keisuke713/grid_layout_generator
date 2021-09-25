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

// function addMoveEvent(ele){
//     // 要素ないのクリックされた位置を取得する変数
//     let x;
//     let y;

//     // mousedownまたはtouchdstartのイベント定義
//     ele.addEventListener("mousedown", mousedown, false);
//     ele.addEventListener("touchstart", mousedown, false);

//     function mousedown(event){
//         console.log("mousedown");
//         this.classList.add("drag");

//         if(event.type !== "mousedown") event = event.changedTouches[0];
//         console.log(event);

//         x = event.pageX - this.offsetLeft;
//         y = event.pageY - this.offsetTop;

//         document.body.addEventListener("mousemove", mousemove, false);
//         document.body.addEventListener("touchmove", mousemove, false);
//     }

//     function mousemove(event){
//         console.log("mousemove");

//         // mousedown内でイベントを追加する時にbodyではなくboxにしたらここはthisで行ける？
//         // その場合ドラッグできる範囲はどうなる？
//         const drag = document.getElementsByClassName("drag")[0];

//         if(event.type !== "mousemove") event = event.changedTouches[0];

//         event.preventDefault();

//         drag.style.top  = event.pageY - y + "px";
//         drag.style.left = event.pageX - x + "px";

//         drag.addEventListener("mouseup", mouseup, false);
//         document.body.addEventListener("mouseleave", mouseup, false);
//         drag.addEventListener("touchend", mouseup, false);
//         document.body.addEventListener("touchleave", mouseup, false);
//     }

//     function mouseup(event){
//         console.log("mouseup");
//         const drag = document.getElementsByClassName("drag")[0];

//         document.body.removeEventListener("mousemove", mousemove, false);
//         drag.removeEventListener("mouseup", mouseup, false);
//         document.body.removeEventListener("touchmove", mousemove, false);
//         drag.removeEventListener("touchend", mouseup, false);

//         console.log(document.getElementById("test1").offsetWidth);
//         console.log(drag);
//         drag.classList.remove("drag");
//         console.log("done");
//     }
// }
let selectedEle = config.parentEle;
updateSelectedEle(selectedEle)

let numberOfBoxes = 0;
function addDivEle(){
    numberOfBoxes += 1;

    // 新しいdiv要素を作成
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.height = `${config.height}px`;
    div.style.width = `${config.width}px`;
    div.setAttribute("id", `ele${numberOfBoxes}`);
    div.innerText = numberOfBoxes;

    // 親要素の被らないカラーを取得
    let index = Math.floor(Math.random() * config.elementColors.length);
    while(selectedEle.style.background == config.elementColors[index]){
        index = Math.floor(Math.random() * config.elementColors.length);
    }
    div.style.background = config.elementColors[index];

    div.addEventListener("mousedown", mousedown, false);
    div.addEventListener("touchstart", mousedown, false);
    div.addEventListener("click", clickEle,false);

    // ↓子の要素をソート
    const childs = [];
    for(const child of selectedEle.querySelectorAll(".box")){
        if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
    }

    childs.sort((a,b) => {
        if(a.offsetTop < b.offsetTop) return -1;
        if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
        return 1;
    });
    // ↑子の要素をソート

    let top = config.gap;
    let left = config.gap;
    let column = 0;
    let prevCols = [];

    for(let i=0; i<childs.length; i++){
        const child = childs[i];
        prevCols.push(child);

        if(top < child.offsetTop) break;
        if(top == child.offsetTop && left < child.offsetLeft) break;

        if(selectedEle.offsetWidth - (child.offsetLeft + child.offsetWidth + 2 * config.gap) > config.width){
            left = child.offsetLeft + child.offsetWidth + config.gap;
        }else{
            column += 1;
            top = column * config.height + (1 + column) * config.gap;
            left = config.gap;
            for(let j=0; j<prevCols.length; j++){
                const prevCol = prevCols[j];
                if(top < prevCol.offsetHeight) left += (prevCol.offsetWidth + config.gap);
                else break;
            }
            // prevcolsの編集
            prevCols = prevCols.filter((ele) => {
                return top + config.height < ele.offsetTop + ele.offsetHeight;
            });
        }
    }
    div.style.top = top + "px";
    div.style.left = left + "px";

    if((top + config.height + config.gap) <= selectedEle.offsetHeight && (left + config.width + config.gap) <= selectedEle.offsetWidth){
        selectedEle.append(div);
    }

    updateSelectedEle(config.parentEle);
}
function clickEle(event){
    if(event.shiftKey == false){
        updateSelectedEle(config.parentEle);
    }else{
        updateSelectedEle(event.target);
    }
}

function mousedown(event){
    const resizeRange = 30;
    const client = event.target.getBoundingClientRect();

    if(client.top + client.height - resizeRange <= event.pageY && client.left + client.width - resizeRange <= event.pageX) mousedownForResize(event);
    else mousedownForDrag(event);
}

function mousedownForDrag(event){
    event.stopPropagation();
    const ele = event.target;
    ele.classList.add("drag");

    if(event.type !== "mousedown") event = event.changedTouches[0];

    const x = event.pageX - ele.offsetLeft;
    const y = event.pageY - ele.offsetTop;

    function mousemoveForDrag(event){
        const drag = document.getElementsByClassName("drag")[0];

        if(event.type !== "mousemove") event = event.changedTouches[0];

        event.preventDefault();

        drag.style.top  = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";
    }

    document.body.addEventListener("mousemove", mousemoveForDrag, false);
    document.body.addEventListener("touchmove", mousemoveForDrag, false);

    function mouseupForDrag(event){
        const drag = document.getElementsByClassName("drag")[0];

        document.body.removeEventListener("mousemove", mousemoveForDrag, false);
        drag.removeEventListener("mouseup", mouseupForDrag, false);
        document.body.removeEventListener("touchmove", mousemoveForDrag, false);
        drag.removeEventListener("toucend", mouseupForDrag, false);

        document.body.removeEventListener("mouseleave", mouseupForDrag, false);
        document.body.removeEventListener("touchleave", mouseupForDrag, false);

        drag.classList.remove("drag");

        // ↓子の要素をソート
        // const parent = drag.parentNode;
        // const childs = [];
        // for(const child of parent.querySelectorAll(".box")){
        //     if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
        // }
    
        // childs.sort((a,b) => {
        //     if(a.offsetTop < b.offsetTop) return -1;
        //     if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
        //     return 1;
        // });
        // ↑子の要素をソート

        // let top = config.gap;
        // let left = config.gap;
        // const prevCols = [];

        // for(let i=0; i<childs.length; i++){
        //     const child = childs[i];
        //     if(i == 0){
        //         child.style.top = `${top}px`;
        //         child.style.left = `${left}px`;
        //         left += (child.offsetWidth + config.gap);
        //         continue;
        //     }
        //     if(left + child.offsetWidth + config.gap <= parent.offsetWidth){
        //         child.style.top = `${top}px`;
        //         child.style.left = `${left + config.gap}px`;
        //         left += (child.offsetWidth + config.gap);
        //     }else{
        //         for(let j=0; prevCols.length; j++){
        //             const prevChild = prevCols[j];
        //             if(prevChild.offsetTop + prevChild.offsetHeight + child.offsetHeight + config.gap * 2 > parent.offsetHeight) continue;
        //             top = `${prevChild.offsetTop + prevChild.offsetHeight + config.gap}px`;
        //             left = `${prevChild.offsetLeft}px`;

        //         }
        //         child.style.top = `${top}px`;
        //         child.style.left = `${left}px`;
        //     }
        // }
    }

    ele.addEventListener("mouseup", mouseupForDrag, false);
    document.body.addEventListener("mouseleave", mouseupForDrag, false);
    ele.addEventListener("touchend", mouseupForDrag, false);
    document.body.addEventListener("touchleave", mouseupForDrag, false);
}

function mousedownForResize(event){
    event.stopPropagation();

    const ele = event.target;
    ele.classList.add("resize");

    if(event.type !== "mousedown") event = event.changedTouches[0];

    const x = (ele.offsetLeft + ele.offsetWidth) - event.pageX;
    const y = (ele.offsetTop + ele.offsetHeight) - event.pageY;

    function mousemoveForResize(event){
        const resize = document.getElementsByClassName("resize")[0];

        if(event.type !== "mousemove") event = event.changedTouches[0];

        event.preventDefault();

        resize.style.width  = (event.pageX - resize.offsetLeft) + x + "px";
        resize.style.height = (event.pageY - resize.offsetTop) + y + "px";
    }

    document.body.addEventListener("mousemove", mousemoveForResize, false);
    document.body.addEventListener("touchmove", mousemoveForResize, false);

    function mouseupForResize(event){
        const resize = document.getElementsByClassName("resize")[0];

        document.body.removeEventListener("mousemove", mousemoveForResize, false);
        resize.removeEventListener("mouseup", mouseupForResize, false);
        document.body.removeEventListener("touchmove", mousemoveForResize, false);
        resize.removeEventListener("touchend", mouseupForResize, false);

        document.body.removeEventListener("mouseleave", mouseupForResize, false);
        document.body.removeEventListener("touchleave", mouseupForResize, false);

        resize.classList.remove("resize");
    }

    ele.addEventListener("mouseup", mouseupForResize, false);
    document.body.removeEventListener("mouseleave", mouseupForResize, false);
    ele.addEventListener("touchend", mouseupForResize, false);
    document.body.addEventListener("touchleave", mouseupForResize, false);
}

function updateSelectedEle(ele){
    selectedEle.classList.remove("selected");
    selectedEle = ele;
    selectedEle.classList.add("selected");

    if(config.parentEle === selectedEle) config.selectedEleInfo.innerText = "";
    else config.selectedEleInfo.innerText = selectedEle.getAttribute("id");
}