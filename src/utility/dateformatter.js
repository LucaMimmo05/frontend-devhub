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

export const timeSince = dateString => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);

        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
};
