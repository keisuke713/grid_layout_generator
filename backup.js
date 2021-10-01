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

        const parent = resize.parentNode;

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

        console.log("=====");
        console.log(rightEles);
        console.log(bottomEles);
        console.log(bottomRightEles);

        for(const child of rightEles){
            const diff = (resize.offsetLeft + resize.offsetWidth - child.offsetLeft);
            child.style.left = `${resize.offsetLeft + resize.offsetWidth + config.gap}px`;
            child.style.width = `${child.offsetWidth - (diff + config.gap)}px`;

            child.style.height = `${resize.offsetHeight}px`;
        }

        for(const child of bottomEles){
            const diff = (resize.offsetTop + resize.offsetHeight - child.offsetTop);
            child.style.top = `${resize.offsetTop + resize.offsetHeight + config.gap}px`;
            child.style.height = `${child.offsetHeight - (diff + config.gap)}px`;

            child.style.width = `${resize.offsetWidth}px`;
        }

        for(const child of bottomRightEles){
            const widthDiff = (resize.offsetLeft + resize.offsetWidth - child.offsetLeft);
            child.style.left = `${resize.offsetLeft + resize.offsetWidth + config.gap}px`;
            child.style.width = `${child.offsetWidth - (widthDiff + config.gap)}px`;

            const heightDiff = (resize.offsetTop + resize.offsetHeight - child.offsetTop);
            child.style.top = `${resize.offsetTop + resize.offsetHeight + config.gap}px`;
            child.style.height = `${child.offsetHeight - (heightDiff + config.gap)}px`;
        }
    }

    ele.addEventListener("mouseup", mouseupForResize, false);
    document.body.removeEventListener("mouseleave", mouseupForResize, false);
    ele.addEventListener("touchend", mouseupForResize, false);
    document.body.addEventListener("touchleave", mouseupForResize, false);
}