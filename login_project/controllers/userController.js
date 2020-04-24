const statusCode = require('../module/utils/statusCode');
const resMsg = require('../module/utils/responseMessage');
const util = require('../module/utils/util');

const encrypt = require('../module/encryption');
const express = require('express');
const User = require('../models/user.js');

const user = {
    signin : async (req, res) => {
        const { id, password } = req.body;
        if (!id || !password) {
            const missParameters = Object.entries({id, password}).filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(`${resMsg.NULL_VALUE} ${missParameters}`));
            return;
        }
        try {
            const {code, json} = await User.signin(id, password);
            res.status(code).send(json);
        } catch {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(resMsg.INTERNAL_SERVER_ERROR));
        }
    },
    signup: async (req, res) => {
        const { id, password, name, email, phone} = req.body;
        if(!id || !password || !name || !email || !phone) {
            const missParameters = Object.entries({id, password, name, email, phone}).filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(`${resMsg.NULL_VALUE} ${missParameters}`));
            return;
        }
        const isThere = await User.userCheck (id);
        if (!isThere) {
            return res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMsg.ALREADY_ID));
        }
        const {salt, hashed} = await encrypt.encrypt(password);
        try {
            const {code, json} = await User.signup(id, name, hashed, salt, email, phone);
            res.status(code).send(json)
        } catch {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMsg.INTERNAL_SERVER_ERROR));
        }
    }
}

module.exports = user;