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

function addDivEle(){
    const colors = ["green", "yellow", "burlywood", "blue", "skyblue", "purple", "orange", "chartreuse"];
    const div = document.createElement("div");
    div.classList.add("box");
    const index = Math.floor(Math.random() * colors.length)
    div.style.background = colors[index];

    // addMoveEvent(div);
    div.addEventListener("mousedown", mousedown, false);
    div.addEventListener("touchstart", mousedown, false);
    document.getElementById("test1").append(div);
}

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
function mousedown(event){
    if(event.shiftKey === true) mousedownForResize(event);
    else mousedownForDrag(event);
}

function mousedownForDrag(event){
    console.log("drag");
    console.log("mousedown");

    const ele = event.target;
    ele.classList.add("drag");

    if(event.type !== "mousedown") event = event.changedTouches[0];

    const x = event.pageX - ele.offsetLeft;
    const y = event.pageY - ele.offsetTop;

    function mousemoveForDrag(event){
        console.log("mousemove");

        const drag = document.getElementsByClassName("drag")[0];

        if(event.type !== "mousemove") event = event.changedTouches[0];

        event.preventDefault();

        drag.style.top  = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";
    }

    document.body.addEventListener("mousemove", mousemoveForDrag, false);
    document.body.addEventListener("touchmove", mousemoveForDrag, false);

    function mouseupForDrag(event){
        console.log("mouseup");
        const drag = document.getElementsByClassName("drag")[0];

        document.body.removeEventListener("mousemove", mousemoveForDrag, false);
        drag.removeEventListener("mouseup", mouseupForDrag, false);
        document.body.removeEventListener("touchmove", mousemoveForDrag, false);
        drag.removeEventListener("toucend", mouseupForDrag, false);

        // 追加で記述
        document.body.removeEventListener("mouseleave", mouseupForDrag, false);
        document.body.removeEventListener("touchleave", mouseupForDrag, false);

        drag.classList.remove("drag");
        console.log("done");
    }

    ele.addEventListener("mouseup", mouseupForDrag, false);
    document.body.addEventListener("mouseleave", mouseupForDrag, false);
    ele.addEventListener("touchend", mouseupForDrag, false);
    document.body.addEventListener("touchleave", mouseupForDrag, false);
}

function mousedownForResize(event){
    console.log("resize");

    const ele = event.target;
    ele.classList.add("resize");
}