var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {path: 'examples/home.html'})
})

console.log('载入路由...');

function responseCommon(req, res) {
    var _path = req.path.substring(1);

    if (req.headers['x-pjax']) {
        res.render(_path);
    } else {
        res.render('index', {path: _path});
    }
}

router.all('/*', function (req, res) {
    responseCommon(req, res);
});

router.all('/system/account/*', function (req, res) {
    res.charset = 'utf-8';
    var _path = req.path.substring(1),
        fileName = _path.lastIndexOf('/'),
        _index = 'system/account/index.html';

    fileName = _path.substring(fileName + 1);

    if (req.headers['x-pjax']) {
        switch (fileName) {
            case 'index.html':
                if(req.headers['x-pjax-container'] === '#accountContent'){
                    res.render('system/account/message.html');
                }else{
                    res.render(_index, {
                        path1:'message.html',
                        fileName:fileName
                    });
                }
                break;
            case 'password.html':
                if(req.headers['x-pjax-container'] === '#accountContent'){
                    res.render('system/account/password.html');
                }else{
                    res.render(_index, {
                        path1: 'password.html',
                        fileName:fileName
                    });
                }
                break;
            case 'log.html':
                if(req.headers['x-pjax-container'] === '#accountContent'){
                    res.render('system/log-table.html');
                }else{
                    res.render(_index,{
                        path1: '../log-table.html',
                        fileName:fileName
                    });
                }
                break;
            case 'display.html':
                if(req.headers['x-pjax-container'] === '#accountContent'){
                    res.render('system/settings/display.html');
                }else{
                    res.render(_index,{
                        path1: '../settings/display.html',
                        fileName:fileName
                    });
                }
                break;
        }
    } else {
        switch (fileName) {
            case 'index.html':
                res.render('index', {
                    path: _index,
                    path1:'message.html',
                    fileName: fileName
                });
                break;
            case 'password.html':
                res.render('index', {
                    path: _index,
                    path1: 'password.html',
                    fileName: fileName
                });
                break;
            case 'log.html':
                res.render('index',{
                    path: _index,
                    path1: '../log-table.html',
                    fileName: fileName
                });
                break;
            case 'display.html':
                res.render('index',{
                    path: _index,
                    path1: '../settings/display.html',
                    fileName: fileName
                });
                break;
        }
    }
});

module.exports = router;
