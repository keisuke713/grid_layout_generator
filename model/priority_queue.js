class PriorityQueue{
    constructor(list){
        // this.list = this.buildList(list);

        // 最初からboxを実装したやつだけにしろ
        this.list = list;
        this.buildMinHeap();
    }
    // buildList(list){
    //     for(const ele of list){
    //         if(ele.nodeType != 1 || !ele.classList.contains("box")) continue;
    //         this.list.push(ele);
    //     }
    // }
    buildMinHeap(){
        for(let i = this.list.length - 1; 0 <= i; i--){
            this.minHeapify(i);
        }
    }
    minHeapify(index){
        const left = this.leftChild(index);
        const right = this.rightChild(index);

        let smallest = index;

        if(left < this.list.length && this.list[left].offsetTop < this.list[smallest].offsetTop) smallest = left;
        else if(left < this.list.length && this.list[left].offsetTop == this.list[smallest].offsetTop && this.list[left].offsetLeft < this.list[smallest].offsetLeft) smallest = left;
        if(right < this.list.length && this.list[right].offsetTop < this.list[smallest].offsetTop) smallest = right;
        else if(right < this.list.length && this.list[right].offsetTop == this.list[smallest].offsetTop && this.list[right].offsetLeft < this.list[smallest].offsetLeft) smallest = right;

        if(smallest != index){
            const tmp = this.list[index];
            this.list[index] = this.list[smallest];
            this.list[smallest] = tmp;
            this.minHeapify(smallest);
        }
    }
    pop(){
        const head = this.list.shift();
        if(this.empty()) return head;
        this.list.unshift(this.list.pop());

        // ここあってるか分からん
        this.minHeapify(0);
        return head;
    }
    parent(index){
        return Math.floor((index - 1) / 2);
    }
    leftChild(index){
        return 2 * index + 1;
    }
    rightChild(index){
        return 2 * index + 2;
    }
    printList(){
        while(this.list.length > 0){
            const ele = this.pop();
            console.log("============");
            console.log(`div:${ele.innerText}`);
            console.log(`offsetTop:${ele.offsetTop}`);
            console.log(`offsetLeft:${ele.offsetLeft}`);
            console.log(`offsetHeight:${ele.offsetHeight}`);
            console.log(`offsetWidth:${ele.offsetWidth}`);
        }
    }
    empty(){
        return this.list.length == 0;
    }
    size(){
        return this.list.length;
    }
}

// const d1 = document.createElement("div");
// d1.setAttribute("id", 1);
// d1.classList.add("box");
// d1.style.top = "10px";
// d1.style.left = "10px";
// d1.style.position = "absolute";
// d1.style.height = "680px";
// d1.style.width = "200px";
// d1.style.border = "1px solid black";
// d1.innerText = "1";

// config.parentEle.append(d1);

// const d2 = document.createElement("div");
// d2.setAttribute("id", 2);
// d2.classList.add("box");
// d2.style.top = "10px";
// d2.style.left = "220px";
// d2.style.position = "absolute";
// d2.style.height = "200px";
// d2.style.width = "200px";
// d2.style.border = "1px solid black";
// d2.innerText = "2";

// config.parentEle.append(d2);

// const d3 = document.createElement("div");
// d3.setAttribute("id", 3);
// d3.classList.add("box");
// d3.style.top = "10px";
// d3.style.left = "430px";
// d3.style.position = "absolute";
// d3.style.height = "200px";
// d3.style.width = "200px";
// d3.style.border = "1px solid black";
// d3.innerText = "3";

// config.parentEle.append(d3);

// const parent = config.parentEle;
// const childs = [];
// for(const child of parent.childNodes){
//     if(child.nodeType == 1 && child.classList.contains("box")) childs.push(child);
// }
// console.log(childs);

// childs.sort((a,b) => {
//     if(a.offsetTop < b.offsetTop) return -1;
//     if(a.offsetTop == b.offsetTop && a.offsetLeft < b.offsetLeft) return -1;
//     return
// });
// console.log(childs);

// const d4 = document.createElement("div");
// d4.style.top = "460px";
// d4.style.left = "10px";
// d4.style.position = "absolute";
// d4.style.height = "200px";
// d4.style.width = "200px";
// d4.style.border = "1px solid black";
// d4.innerText = "4";

// config.parentEle.append(d4);

// const d5 = document.createElement("div");
// d5.style.top = "460px";
// d5.style.left = "240px";
// d5.style.position = "absolute";
// d5.style.height = "200px";
// d5.style.width = "200px";
// d5.style.border = "1px solid black";
// d5.innerText = "5";

// config.parentEle.append(d5);

// const queue = new PriorityQueue([d5,d4,d3,d2,d1]);
// queue.printList();