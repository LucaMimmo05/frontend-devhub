export const getFormattedDate = isoDate => {
    const now = new Date(isoDate);
    const options = { weekday: "long", day: "numeric", month: "long" };
    // eslint-disable-next-line no-undef
    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
    const weekday = parts.find(p => p.type === "weekday").value;
    const day = parts.find(p => p.type === "day").value;
    const month = parts.find(p => p.type === "month").value;
    const formattedDate = `${weekday} ${day}, ${month}`;

    return `${formattedDate}`;
};

export const getFormattedTime = isoDate => {
    const now = new Date(isoDate);
    const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return formattedTime;
};
