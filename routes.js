require('mime');

exports.index = function(req, res){
    res.sendFile(path, {root: __dirname + '/public/'});
}
