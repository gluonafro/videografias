export default (act, max, next) => {
    if (next) return act + 1 >= max ? 0 : act + 1;
    else return act - 1 < 0 ? max - 1 : act - 1;
};