class ElementList{
    static sort(list){
        return list.sort((a,b) => {
            // if(a.offsetTop < b.offsetTop) return -1;
            // if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
            // return 1;

            // offsetTop上下10pxの誤差は同じ行として見なす
            if((b.offsetTop - a.offsetTop) > 10) return -1;
            if(Math.abs(a.offsetTop - b.offsetTop) <= 10 && a.offsetLeft < b.offsetLeft) return -1;
            return 1;
        });
    }
}