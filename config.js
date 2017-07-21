/**
 * Created by yujintang on 2017/7/18.
 */
'use strict';

const host = 'http://127.0.0.1:2222';

const config = {};

config.Url = {
    loginUrl: host + '/api/login',
    getUpToken: host + '/api/pure_getUpToken',
    getPoetry: host + '/api/getPoetry',
    saveShare: host + '/api/auth_saveShare',
    findShare: host + '/api/findShare',
    saveComment: host + '/api/auth_saveComment',
    commentList: host + '/api/commentList'
};
config.Base = {
    host:'http://127.0.0.1:2222',
    imgHost: 'http://xcximg.7diary.com/',
    qiniuUpload: 'https://up.qbox.me/',
    baseShareImage:'http://xcximg.7diary.com/akiss.gif',
    fops: '!beauty1'
}

module.exports = config;

