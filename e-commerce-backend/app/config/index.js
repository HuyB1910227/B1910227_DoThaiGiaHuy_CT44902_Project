const config = {
    app: {
        port: process.env.PORT || 9000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myshop"
    }
};

module.exports = config;