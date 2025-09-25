export const renderColor = folderColor => {
    switch (folderColor) {
        case "RED":
            return "#FF0000";
        case "GREEN":
            return "#00FF00";
        case "BLUE":
            return "#0000FF";
        case "YELLOW":
            return "#FFFF00";
        case "ORANGE":
            return "#FFA500";
        case "PURPLE":
            return "#800080";
        case "PINK":
            return "#FFC0CB";
        case "BROWN":
            return "#A52A2A";
        case "GRAY":
            return "#808080";
        case "CYAN":
            return "#00FFFF";
        default:
            return "#FFFFFF";
    }
};
