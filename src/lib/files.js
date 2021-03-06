const loadJson = require('load-json-file');
const writeJson = require('write-json-file');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Promise = require('bluebird');

const updateLocalJson = async (jsonFilePath, updateAttrs = {}, nestedObjectAttr) => {
    const currentObject = await loadJson(jsonFilePath);
    let newObject;

    if (nestedObjectAttr) {
        newObject = currentObject;
        newObject[nestedObjectAttr] = Object.assign({}, currentObject[nestedObjectAttr], updateAttrs);
    } else {
        newObject = Object.assign({}, currentObject, updateAttrs);
    }

    await writeJson(jsonFilePath, newObject);
};

/**
 * If you pass /foo/bar as rootPath and /baz/raz as folderPath then it ensures that following folders exists:
 *
 * /foo/bar/baz
 * /foo/bar/baz/raz
 *
 * If you pass only one parameter then rootPath is considered to be '.'
 */
const ensureFolderExistsSync = (rootPath, folderPath) => {
    if (!folderPath) {
        folderPath = rootPath;
        rootPath = '.';
    }

    const parts = folderPath.split(path.sep);
    parts.reduce((currentPath, currentDir) => {
        currentPath = path.join(currentPath, currentDir);

        if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);

        return currentPath;
    }, rootPath);
};

const rimrafPromised = (pathToBeRemoved) => {
    return new Promise((resolve, reject) => {
        rimraf(pathToBeRemoved, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const fileStat = Promise.promisify(fs.stat);
const unlinkFile = Promise.promisify(fs.unlink);

const deleteFile = async (filePath) => {
    const stat = await fileStat(filePath);
    if (stat.isFile()) {
        await unlinkFile(filePath);
    }
};

module.exports = { updateLocalJson, ensureFolderExistsSync, rimrafPromised, deleteFile };
