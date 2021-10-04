function createEle(top, left, id){
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    div.style.height = `${config.height}px`;
    div.style.width = `${config.width}px`;
    div.setAttribute("id", id);
    div.innerText = id;

    let index = Math.floor(Math.random() * config.elementColors.length);
    while(selectedEle.style.background == config.elementColors[index]){
        index = Math.floor(Math.random() * config.elementColors.length);
    }
    div.style.background = config.elementColors[index];

    return div;
}

// 横一列だけど微妙に高さがズレてる
// selectedEle.append(createEle(config.gap*2+5 + config.height, config.gap*2 + config.width, 5));
// selectedEle.append(createEle(config.gap*2 + config.height, config.gap, 4));
// selectedEle.append(createEle(config.gap-5, config.gap*3 + config.width*2, 3));
// selectedEle.append(createEle(config.gap+5, config.gap*2 + config.width, 2));
// selectedEle.append(createEle(config.gap,10,1));

// let childs = [];
// for(const child of selectedEle.childNodes){
//     if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
// }
// console.log("before sorting");
// console.log(childs);

// childs = ElementList.sort(childs);
// console.log("after sorting");
// childs.forEach(ele => console.log(ele));