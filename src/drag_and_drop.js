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

    for(const child of childs){
        prevCols.push(child);

        if(top < child.offsetTop) break;
        if(top == child.offsetTop && left < child.offsetLeft) break;

        if(selectedEle.offsetWidth - (child.offsetLeft + child.offsetWidth + 2 * config.gap) > config.width){
            left = child.offsetLeft + child.offsetWidth + config.gap;
        }else{
            column += 1;
            top = column * config.height + (1 + column) * config.gap;
            left = config.gap;
            for(const prevCol of prevCols){
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
    translateHtml();
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
    const originalTop = ele.offsetTop;
    const originalLeft = ele.offsetLeft;

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

        const parent = drag.parentNode;
        // if(drag.offsetTop < config.gap || drag.offsetLeft < config.gap){
        //     drag.style.top = `${originalTop}px`;
        //     drag.style.left = `${originalLeft}px`;
        // }

        if(parent.offsetHeight - (drag.offsetTop + drag.offsetHeight + config.gap) < 0){
            drag.style.top = `${originalTop}px`;
            drag.style.left = `${originalLeft}px`;
        }

        if(parent.offsetWidth - (drag.offsetLeft + drag.offsetWidth + config.gap) < 0){
            drag.style.top = `${originalTop}px`;
            drag.style.left = `${originalLeft}px`;
        }

        const childs = [];
        for(const child of parent.querySelectorAll(".box")){
            if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
        }
    
        childs.sort((a,b) => {
            if(a.offsetTop < b.offsetTop) return -1;
            if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
            return 1;
        });

        // dragの細かい動きはまだ決まっていないからコメントアウト
        // for(const child of childs){
        //     if(drag == child) continue;
        //     if(overlapAnotherEle(drag, child)){
        //         drag.style.top = `${originalTop}px`;
        //         drag.style.left = `${originalLeft}px`;
        //         break;
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
    const originalHeight = ele.offsetHeight;
    const originalWidth  = ele.offsetWidth;
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

        const parent = resize.parentNode;

        const childs = [];
        for(const child of parent.querySelectorAll(".box")){
            if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
        }
    
        childs.sort((a,b) => {
            if(a.offsetTop < b.offsetTop) return -1;
            if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
            return 1;
        });

        // リサイズした要素と横幅がかぶっている要素
        const rightEles = [];
        // リサイズした要素と縦幅がかぶっている要素
        const bottomEles = [];
        // リサイズした要素と縦横幅両方かぶっている要素
        const bottomRightEles = [];

        for(const child of childs){
            if(resize == child) continue;
            if(resize.offsetTop > child.offsetTop + child.offsetHeight) continue;
            if(resize.offsetLeft > child.offsetLeft + child.offsetWidth) continue;

            if(resize.offsetTop == child.offsetTop && resize.offsetLeft < child.offsetLeft && (resize.offsetLeft + resize.offsetWidth) >= child.offsetLeft) rightEles.push(child);
            if(resize.offsetLeft == child.offsetLeft && resize.offsetTop < child.offsetTop && (resize.offsetTop + resize.offsetHeight) >= child.offsetTop) bottomEles.push(child);
            if((resize.offsetLeft + resize.offsetWidth) >= child.offsetLeft && 
            (resize.offsetTop + resize.offsetHeight) >= child.offsetTop && 
            !rightEles.includes(child) &&
            !bottomEles.includes(child)) bottomRightEles.push(child);
        }

        if(bottomRightEles.length > 0){
            resize.style.width = `${originalWidth}px`;
            resize.style.height = `${originalHeight}px`;
        }else if(rightEles.length > 0){
            resize.style.width = `${originalWidth}px`;
        }else if(bottomEles.length > 0){
            resize.style.height = `${originalHeight}px`;
        }

        // 縦幅の制御
        if(parent.offsetHeight - (resize.offsetTop + resize.offsetHeight + config.gap) < 0){
            const height = parent.offsetHeight - (resize.offsetTop + config.gap);
            resize.style.height = `${height}px`;
        }
        // 横幅の制御
        if(parent.offsetWidth - (resize.offsetLeft + resize.offsetWidth + config.gap) < 0){
            const width = parent.offsetWidth - (resize.offsetLeft + config.gap);
            resize.style.width = `${width}px`;
        }

        translateHtml();
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

function overlapAnotherEle(ele1, ele2){
    // console.log(ele1);
    // console.log(ele2);
    // if((ele2.offsetLeft + ele2.offsetWidth + config.gap) < ele1.offsetLeft && (ele2.offsetTop + ele2.offsetHeight + config.gap) > ele1.offsetTop) return true;
    // if((ele1.offsetLeft + ele1.offsetWidth + config.gap) > ele2.offsetLeft && (ele2.offsetTop + ele2.offsetHeight + config.gap) > ele1.offsetTop) return true;
    // if((ele2.offsetLeft + ele2.offsetWidth + config.gap) > ele1.offsetLeft && (ele1.offsetTop + ele1.offsetHeight + config.gap) > ele2.offsetTop) return true;
    // if((ele1.offsetLeft + ele1.offsetWidth + config.gap) < ele2.offsetLeft && (ele1.offsetTop + ele1.offsetHeight + config.gap) > ele2.offsetTop) return true;
    // return false;

    return !(((ele2.offsetTop + ele2.offsetHeight + config.gap) < ele1.offsetTop) || 
                ((ele2.offsetLeft + ele2.offsetWidth + config.gap) < ele1.offsetLeft) || 
                ((ele1.offsetTop + ele1.offsetHeight + config.gap) < ele2.offsetTop) || 
                ((ele1.offsetLeft + ele1.offsetWidth + config.gap) < ele2.offsetLeft)
            );
}

config.parentEle.addEventListener("click", event => {
    if(event.target != config.parentEle) return;
    updateSelectedEle(event.target);
})

// 現在表示されているブロック要素をコードに変換していく
function translateHtml(){
    console.log("変換開始");
    const parent = config.parentEle;
    console.log(parent);
    console.log("変換終了");
}