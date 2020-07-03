export default max => {
    let a=[]
    for (let i=0;i<max;++i) a[i]=i;
    const shuffle = array => {
        let tmp, current, top = array.length;
        if(top) while(--top) {
            current = ~~(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }
    return shuffle(a);
}