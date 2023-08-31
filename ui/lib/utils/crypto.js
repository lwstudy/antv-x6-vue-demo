/**
 * DES 加密、解密模块
 * @module $ui/utils/crypto
 */

import CryptoJS from 'crypto-js'

/**
 * 加密
 * @param {string} message 需要加密的字符串
 * @param {string} key 秘钥
 * @return {string}
 */
export function encryptByDES(message, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

/**
 * 解密
 * @param {string} cipherText 密文
 * @param {string} key 秘钥
 * @return {string}
 */
export function decryptByDES(cipherText, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(cipherText)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * MD5 加密
 * @param {String} text 原始文本
 * @returns {*} 转md5否的文本
 */
export function md5(text) {
  return CryptoJS.MD5(text).toString()
}

/**
 * Base64转码
 * @param {String} text 文本
 * @returns {string} base64文本
 */
export function base64Encode(text) {
  const wordArray = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * Base64 解码
 * @param {String} text base64密文
 * @returns {string} 原始文本
 */
export function base64Decode(text) {
  const parsedWordArray = CryptoJS.enc.Base64.parse(text);
  return parsedWordArray.toString(CryptoJS.enc.Utf8);
}
