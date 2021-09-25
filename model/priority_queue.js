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