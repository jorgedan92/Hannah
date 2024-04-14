module.exports = {
    apps: [
        {
            name: "Hannah",
            script: "./src/index.js",
            env: {
                DB_STRING: "",
                PORT: 8080,
                TELEGRAM_API: "",
            },
        },
    ],
};
