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
            colors:{
              greenBlueCrayola: '#2081C3',
              opal: '#BED8D4',
              cultured: '#F7F9F9',
              mediumTurqoise: '#78D5D7'
            },
        },
    },
    plugins: [
      
    ],
};
