let selectedEle = config.parentEle;
updateSelectedEle(selectedEle)

// 現在の要素数
let numberOfBoxes = 1;
function addDivEle(){
    const div = createBox(numberOfBoxes);

    const children = sortList(getChildren(selectedEle), compareNodeFlexibility);

    let top = config.gap;
    let left = config.gap;
    let column = 0;
    let prevCols = [];

    for(const child of children){
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

        const children = [];
        for(const child of parent.querySelectorAll(".box")){
            if(child.nodeType == 1 && child.classList.contains("box")) children.push(child);
        }
    
        children.sort((a,b) => {
            if(a.offsetTop < b.offsetTop) return -1;
            if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
            return 1;
        });

        // dragの細かい動きはまだ決まっていないからコメントアウト
        // for(const child of children){
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

        const children = [];
        for(const child of parent.querySelectorAll(".box")){
            if(child.nodeType == 1 && child.classList.contains("box")) children.push(child);
        }
    
        children.sort((a,b) => {
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

        for(const child of children){
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

// domの更新はdom内部でなくクライアントサイドから行うようにする
function updateNode2(array2d){
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
            if(index == undefined) continue;
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
            if(index == undefined) continue;
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
                parent.addChild(node);
            }
            prevIndex = index;
        }
    }
    dom.print();
}

function updateNode(array2d){
    const parentId = selectedEle.dataset.id;
    if(!dom.exist(parentId)) return;

    const parent = dom.findById(parentId);
    parent.addGridProperty(array2d);

    for(const columns of array2d){
        let prevIndex = -1;

        for(let i=0; i<columns.length; i++){
            const index = columns[i];
            if(index == undefined) continue;
            const gridColumnFactory = new GridColumnFactory();

            if(parent.existChildById(index)){
                parent.findChildById(index).updateGridColumn(prevIndex, index, i);
            }else{
                const node = new Node(index, "div", "", parent.depth + 1);
                node.addStyle(gridColumnFactory.createGridColumn(i+1, i+2));
                parent.addChild(node);
            }
            prevIndex = index;
        }
    }

    for(const columns of transpose(array2d)){
        let prevIndex = -1;

        for(let i=0; i<columns.length; i++){
            const index = columns[i];
            if(index == undefined) continue;
            const gridRowFactory = new GridRowFactory();

            if(parent.existChildById(index)){
                const node = parent.findChildById(index);
                if(node.hasStyle(config.gridRow))node.updateGridRow(prevIndex, index, i);
                else node.addStyle(gridRowFactory.createGridRow(i+1, i+2));
            }else{
                const node = new Node(index, "div", "", parent.depth + 1);
                node.addStyle(gridRowFactory.createGridRow(i+1, i+2));
                parent.addChild(node);
            }
            prevIndex = index;
        }
    }
    dom.print();
}

function getChildren(parent){
    const children = [];
    for(const child of parent.childNodes){
        if(child.nodeType == 1 && child.classList.contains("box")) children.push(child);
    }
    return children;
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

function parseDom(parent){
    console.clear();
    console.log("parseDom:start");

    const children = sortList(getChildren(parent), compareNodeFlexibility);

    let standardWidth = parent.offsetWidth;
    let standardHeight = parent.offsetHeight;
    for(const child of children){
        standardWidth = Math.min(standardWidth, child.offsetWidth);
        standardHeight = Math.min(standardHeight, child.offsetHeight);
    }

    const grid = [];
    let rowIndex = 0;
    let columnIndex = 0;
    let prevOffsetLeft = -1;
    for(let i=0; i<children.length; i++){
        const child = children[i]
        if(prevOffsetLeft > child.offsetLeft){
            rowIndex++;

            if (grid[rowIndex] == undefined){
                columnIndex = 0;
            }else{
                for(let i=0; i<grid[rowIndex].length; i++){
                    if(grid[rowIndex][i] == undefined || i == grid[rowIndex].length - 1){
                        columnIndex = i;
                        break;
                    }
                }
            }
        }

        while(grid[rowIndex] != undefined && grid[rowIndex][columnIndex] != undefined){
            columnIndex++;
        }

        // 縦に要素をみていく
        const heightDiffCache = [];
        for(let i=0; i<=Math.ceil(child.offsetHeight / standardHeight); i++){
            heightDiffCache.push(Math.abs(child.offsetHeight - standardHeight * i));
        }

        let heightIndex = 1;
        for(let i=2; i<heightDiffCache.length; i++){
            if(heightDiffCache[heightIndex] > heightDiffCache[i]) heightIndex = i;
        }

        for(let i=rowIndex; i<rowIndex+heightIndex; i++){
            if(grid[i] == undefined){
                const length = grid[i-1] == undefined ? columnIndex + 1 : grid[i-1].length;
                grid[i] = new Array(length);
            }
            while(grid[i].length <= columnIndex){grid[i].push(undefined)}
            grid[i].splice(columnIndex, 1, Number(child.dataset.id));
        }

        // 横に要素をみていく
        const widthDiffCache = [];
        for(let i=0; i<=Math.ceil(child.offsetWidth / standardWidth); i++){
            widthDiffCache.push(Math.abs(child.offsetWidth - standardWidth * i));
        }

        let widthIndex = 1;
        for(let i=2; i<widthDiffCache.length; i++){
            if(widthDiffCache[widthIndex] > widthDiffCache[i]) widthIndex = i;
        }

        for(let i=rowIndex; i<rowIndex + heightIndex; i++){
            for(let j=1; j<widthIndex; j++){
                if(grid[i].length <= columnIndex){
                    grid[i].splice(columnIndex + j, 0, Number(child.dataset.id));
                }else{
                    grid[i].splice(columnIndex + j, 1, Number(child.dataset.id));
                }
            }
        }

        prevOffsetLeft = child.offsetLeft + child.offsetWidth;
    }
    console.log("parseDom:end");
    return grid;
}

console.log("========== issue ============");
console.log("parseDomが100行近くあるから何とかしたい")
console.log("====================");