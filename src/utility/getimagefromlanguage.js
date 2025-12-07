/* eslint-disable max-len */
const LANGUAGE_ALIASES = {
    css: "css3",
    scss: "sass",
    js: "javascript",
    ts: "typescript",
    node: "nodejs",
    postgres: "postgresql",
    mysql: "mysql",
    csharp: "csharp",
    "c++": "cplusplus",
};

const FALLBACK_ICON =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 64 64'><rect width='100%' height='100%' fill='none'/><text x='50%' y='50%' font-size='28' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'>N/A</text></svg>";

export const getImageFromLanguage = language => {
    if (!language) return FALLBACK_ICON;

    let normalized;

    try {
        normalized = language.toLowerCase().trim();
    } catch {
        return FALLBACK_ICON;
    }

    const aliased = LANGUAGE_ALIASES[normalized] || normalized;

    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${aliased}/${aliased}-original.svg`;
};
