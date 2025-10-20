export const getImageFromLanguage = language => {
    let normalized = language.toLowerCase();

    if (normalized === "css") {
        normalized = "css3";
    }
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${normalized}/${normalized}-original.svg`;

    console.log("url:", url);

    return url;
};
