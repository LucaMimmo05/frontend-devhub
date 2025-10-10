import python from "../assets/language/python.svg";
import javascript from "../assets/language/javascript.svg";
import java from "../assets/language/java.svg";
import typescript from "../assets/language/typescript.svg";

export const getImageFromLanguage = language => {
    switch (language) {
        case "JavaScript":
            return javascript;
        case "Python":
            return python;
        case "Java":
            return java;
        case "TypeScript":
            return typescript;

        default:
            return null;
    }
};
