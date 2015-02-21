// pretend it's a data base

var data = [];

function lookup(arr){
    var objectHash = {};
    for(var i = 0; i < arr.length; i++){
        objectHash[arr[i].key] = arr[i].key; // pretty slick
    }
}

module.exports.createData = function(resource){
    data.push(resource);
    return true;
};

module.exports.updateData = function(resource){
    var hash = lookup(resource);
    hash[resource.key] = resource;
};

module.exports.deleteData = function(resource){
    var hash = lookup(resource); // could add some sort of caching mechanismmm check to improve this
    delete hash[resource.key]; // will this work? its still referenced in the data array..
};

module.exports.readData = function(){
    // what would happen if we returned the lookup object?
    return data;
};
