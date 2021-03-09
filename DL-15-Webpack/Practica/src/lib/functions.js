const getTime = () => {
    let fyh = new Date().toLocaleDateString();
    let timestamp = new Date.now();
    return {fyh, timestamp}
}

module.exports = {
    getTime
}