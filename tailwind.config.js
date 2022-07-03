module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
    content: ["./index.html"],
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            fontFamily: {
                Bree_Serif: ["Bree Serif", "serif"],
            },
        },
    },
    plugins: [],
};
