let selectedEle = config.parentEle;
updateSelectedEle(selectedEle)

// 現在の要素数
let numberOfBoxes = 1;
function addDivEle(){
    const div = createBox(numberOfBoxes);

    const childs = sortList(getChild(selectedEle), compareNodeFlexibility);

    let top = config.gap;
    let left = config.gap;
    let column = 0;
    let prevCols = [];

    for(const child of childs){
        prevCols.push(child);

        if(top < (child.offsetTop + child.originalHeight)) break;
        if(top == child.offsetTop && (left + config.gap*2 + config.width) < child.offsetLeft) break;

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

    // parseDom(selectedEle);
    updateNode(parseDom(selectedEle));
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
        // parseDom();
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

        // parseDom(selectedEle);
        updateNode(parseDom(selectedEle));
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
// 現在選択されているノードとその子要素だけ見れば大丈夫そ？
function parseDom(parent){
    console.clear();
    console.log("parseDom:start");

    const childs = sortList(getChild(selectedEle), compareNodeFlexibility);

    let prevCols = [];
    let columns = [];
    const grid = [];

    for(let i=0; i<childs.length; i++){
        const child = childs[i];

        prevCols.push(child);
        columns.push(Number(child.dataset.id));

        // 行が変わるもしくは最後の要素
        if(childs[i+1] != null && (childs[i+1].offsetTop - child.offsetTop) <= 10) continue;
        grid.push(columns);
        if(childs[i+1] != null){
            columns = [];

            for(let j=0; j<prevCols.length; j++){
                const prevCol = prevCols[j];
                if((prevCol.offsetTop + prevCol.offsetHeight) > childs[i+1].offsetTop){
                    columns.splice(j, 0, Number(prevCol.dataset.id));
                }
            }
            prevCols = prevCols.filter(ele => {
                return (ele.offsetTop + ele.offsetHeight) > childs[i+1].offsetTop;
            })
        }
    }
    // 横に伸びる要素があった場合の対処
    // 基準とする横幅を算定(一番小さい要素の幅とする)
    let starndardWidth = selectedEle.offsetWidth;
    for(let i=0; i<childs.length; i++){
        const child = childs[i];
        starndardWidth = Math.min(starndardWidth, child.offsetWidth);
    }
    // 要素の幅の基準については現在存在する要素のなかで一番小さい幅を採用
    const maxColumns = Math.floor(selectedEle.offsetWidth / starndardWidth);
    const patternCache = new HashMap();
    const childsHash = new HashMap();
    for(const child of childs){
        childsHash.set(Number(child.dataset.id), child.offsetWidth);
    }
    const newGrid = grid.map(columns => {
        if(columns.length == maxColumns) return columns;

        // このラムダの中の最終的な戻り値
        const newColumns = [];

        let patterns;
        if(patternCache.has(columns.length)) patterns = patternCache.get(columns.length);
        else{
            patterns = getPatterns(maxColumns, columns.length - 1);
            patternCache.set(columns.length, patterns);
        }

        for(const pattern of patterns){
            const widthRatio = getRatio(pattern);

            if(matchRatio(columns, widthRatio, childsHash, starndardWidth)){
                for(let i=0; i<columns.length; i++){
                    let count = widthRatio[i];
                    while(0 < count){
                        newColumns.push(columns[i]);
                        count--;
                    }
                }
                break;
            }
        }

        return newColumns;
    });
    console.log(newGrid);
    console.log("parseDom:end");
    return newGrid;
}

// domの更新はdom内部でなくクライアントサイドから行うようにする
function updateNode(array2d){
    const parentId = selectedEle.dataset.id;
    if(!dom.exist(parentId)) return;

    const parent = dom.findById(parentId);
    if(!parent.hasChildren() && array2d.length > 0){
        parent.addStyle(new Display("grid", ""));
        parent.addStyle(new GridTemplateColumns(array2d[0].length, ""));
        parent.addStyle(new GridTemplateRows(array2d.length, ""));
    }
    if(parent.hasStyle(config.gridTemplateColumns)){
        const gridTemplateColumns = parent.findStyle(config.gridTemplateColumns);
        gridTemplateColumns.updateValue(array2d[0].length);
    }
    if(parent.hasStyle(config.gridTemplateRows)){
        const gridTemplateRows = parent.findStyle(config.gridTemplateRows);
        gridTemplateRows.updateValue(array2d.length);
    }

    // grid-columnの設定
    for(const columns of array2d){
        let prevIndex = -1;

        for(let i=0; i<columns.length; i++){
            const index = columns[i];
            const gridColumnFactory = new GridColumnFactory();

            if(parent.existChildById(index)){
                const node = parent.findChildById(index);

                if(node.hasStyle(config.gridColumn)){
                    const gridColumn = node.findStyle(config.gridColumn);

                    if(prevIndex != index) gridColumn.updateStartColumnTo(i+1);
                    gridColumn.updateEndColumnTo(i+2);
                }else{
                    node.addStyle(gridColumnFactory.createGridColumn(i+1, i+2));
                }
            }else{
                const node = new Node(index, "div", "", parent.depth + 1);
                node.addStyle(gridColumnFactory.createGridColumn(i+1, i+2));
                parent.addChild(node);
            }
            prevIndex = index;
        }
    }

    // grid-rowの設定
    const transposedArray2d = transpose(array2d);
    for(const columns of transposedArray2d){
        let prevIndex = -1;

        for(let i=0; i<columns.length; i++){
            const index = columns[i];
            const gridRowFactory = new GridRowFactory();

            if(parent.existChildById(index)){
                const node = parent.findChildById(index);

                if(node.hasStyle(config.gridRow)){
                    const gridRow = node.findStyle(config.gridRow);

                    if(prevIndex != index) gridRow.updateStartRowTo(i+1);
                    gridRow.updateEndRowTo(i+2);
                }else{
                    node.addStyle(gridRowFactory.createGridRow(i+1, i+2));
                }
            }else{
                const node = new Node(index, "div", "", null);
                node.addStyle(gridRowFactory.createGridRow(i+1, i+2));
            }
            prevIndex = index;
        }
    }
    dom.print();
}

function getPatterns(amountOfCell, amountOfPartition){
    const result = []
    getPatternsHelper(amountOfCell, amountOfPartition, 0, []);

    function getPatternsHelper(amountOfCell, amountOfPartition, startIndex, patterns){
        if(amountOfPartition < 1){
            patterns.push(amountOfCell-1);
            result.push(patterns);
            return;
        }
        for(let i=startIndex; i<amountOfCell-1; i++){
            const patternCopy = JSON.parse(JSON.stringify(patterns));
            patternCopy.push(i);
            getPatternsHelper(amountOfCell, amountOfPartition-1, i+1, patternCopy);
        }
    }
    return result;
}

function getRatio(pattern){
    const ratio = [];
    let lastPartition = -1;

    for(const partition of pattern){
        ratio.push(partition - lastPartition);
        lastPartition = partition;
    }

    return ratio;
}

function matchRatio(columns, ratio, childsHash, width){
    for(let i=0; i<columns.length; i++){
        const childNodeWidth = childsHash.get(columns[i]);
        if(childNodeWidth == null) break;
        if(!(Math.abs(childNodeWidth - width * ratio[i]) < Math.abs(childNodeWidth - width * (ratio[i] - 1)) && Math.abs(childNodeWidth - width * ratio[i]) < Math.abs(childNodeWidth - width * (ratio[i] + 1)))) break;
        if(i == columns.length - 1) return true;
    }
    return false;
}

function getChild(parent){
    const childs = [];
    for(const child of parent.childNodes){
        if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
    }
    return childs;
}

function transpose(array2d){
    if(!(isTrasposedArray(array2d))) return array2d;
    const transposedArray = [];

    for(let i=0; i<array2d[0].length; i++){
        const tmp = [];
        for(let j=0; j<array2d.length; j++){
            if(array2d[j][i] != null) tmp.push(array2d[j][i]);
        }
        transposedArray.push(tmp);
    }
    return transposedArray;
}

function isTrasposedArray(array){
    if(array.length == 0) return false;
    for(const ele of array){
        if(!(ele instanceof Array)) return false;
    }
    return true;
}

console.log("========== issue ============");
console.log("縦に長くするとrowの数が少ない");
console.log("====================");