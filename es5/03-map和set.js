var _map = new Map();
_map.set('jaja',3);
_map.set('haha',43);
console.log(_map.get('jaja'))
_map.delete('jaja')
console.log(_map.has('jaja'))
for (const iterator of _map) {
    console.log(iterator[0])
}
_map.forEach(function(item,index){
    console.log(item)
    console.log(index)
})