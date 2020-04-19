
const crypto = require('crypto')
const key = Buffer.from('9vApxLk5G3PAsJrMzxcvbnmo', 'utf8');
const iv = Buffer.from('9vApxLk5G3PAsJrM', 'utf8'); // 初始向量，16 字节
const algorithm = 'aes-192-cbc'; // 加密算法和操作模式

exports.aesEncrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted
}

exports.aesDecrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}