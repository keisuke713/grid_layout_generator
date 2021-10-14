function sortList(list, func){
    return list.sort((a,b) => {
        return func(a,b)
    })
}

function compareNodeStrictly(ele1, ele2){
    if(ele1.offsetTop < ele2.offsetTop) return -1;
    if(ele1.offsetTop == ele2.offsetTop && ele1.offsetLeft < ele2.offsetLeft) return -1;
    return 1;
}

function compareNodeFlexibility(ele1, ele2){
    const diff = config.width * 0.4;
    if((ele2.offsetTop - ele1.offsetTop) > diff && ele1.offsetTop < ele2.offsetTop) return -1;
    if(Math.abs(ele1.offsetTop - ele2.offsetTop) <= diff && ele1.offsetLeft < ele2.offsetLeft) return -1;
    return 1;
}