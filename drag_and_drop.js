let selectedEle = config.parentEle;
updateSelectedEle(selectedEle)

// 現在の要素数
let numberOfBoxes = 1;
function addDivEle(){
    const div = createBox(numberOfBoxes);

    const childs = [];
    for(const child of selectedEle.childNodes){
        if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
    }

    childs.sort((a,b) => {
        if(a.offsetTop < b.offsetTop) return -1;
        if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
        return 1;
    });

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
                if(top < prevCol.offsetTop + prevCol.offsetHeight && selectedEle.offsetWidth - (prevCol.offsetLeft + prevCol.offsetWidth + 2 * config.gap) > 0) left += (prevCol.offsetWidth + config.gap);
                else{
                    top = prevCol.offsetTop + prevCol.offsetHeight + config.gap;
                    break;
                }
            }
            prevCols = prevCols.filter((ele) => {
                return top + config.height < ele.offsetTop + ele.offsetHeight;
            });
        }
    }
    div.style.top = top + "px";
    div.style.left = left + "px";

    if((top + config.height + config.gap) <= selectedEle.offsetHeight && (left + config.width + config.gap) <= selectedEle.offsetWidth){
        selectedEle.append(div);
        numberOfBoxes += 1;
    }else{
        console.log("=================");
        console.log(`top:${top}`);
        console.log(`selectedEle.height:${selectedEle.offsetHeight}`)
        console.log(`left:${left}`);
        console.log(`width:${selectedEle.offsetWidth}`);
        alert("スペースがありません。")
    }
}

function createBox(numberOfBoxes){
    // style,id設定
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.height = `${config.height}px`;
    div.style.width  = `${config.width}px`;
    div.setAttribute("id", `ele${numberOfBoxes}`);
    div.dataset.id = numberOfBoxes;
    div.innerText = numberOfBoxes;

    // 色設定
    let index = Math.floor(Math.random() * config.elementColors.length);
    while(selectedEle.style.background == config.elementColors[index]){
        index = Math.floor(Math.random() * config.elementColors.length);
    }
    div.style.background = config.elementColors[index];

    // イベント追加
    div.addEventListener("mousedown", mousedown, false);
    div.addEventListener("touchstart", mousedown, false);
    div.addEventListener("click", clickEle, false);

    return div;
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
        translateHtml();
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

config.parentEle.addEventListener("click", event => {
    if(event.target != config.parentEle) return;
    updateSelectedEle(event.target);
})

// 現在表示されているブロック要素をコードに変換していく
function translateHtml(){
    const id = selectedEle.dataset.id;
}