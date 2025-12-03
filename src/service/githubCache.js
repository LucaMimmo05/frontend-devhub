const CACHE_PREFIX = "github_cache_";
const DEFAULT_TTL = 5 * 60 * 1000;

const CACHE_CONFIG = {
    userInfo: { ttl: 10 * 60 * 1000 },
    repos: { ttl: 5 * 60 * 1000 },
    activities: { ttl: 2 * 60 * 1000 },
};

const getCacheKey = (type, userId, params = {}) => {
    const paramsString = Object.keys(params).length > 0 ? `_${JSON.stringify(params)}` : "";

    return `${CACHE_PREFIX}${type}_${userId}${paramsString}`;
};

const setCache = (key, data, ttl = DEFAULT_TTL) => {
    const cacheEntry = {
        data,
        timestamp: Date.now(),
        ttl,
    };

    try {
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (error) {
        console.warn("Cache write failed:", error);
        clearExpiredCache();
    }
};

const getCache = key => {
    try {
        const cached = localStorage.getItem(key);

        if (!cached) return null;

        const cacheEntry = JSON.parse(cached);
        const now = Date.now();

        if (now - cacheEntry.timestamp > cacheEntry.ttl) {
            localStorage.removeItem(key);

            return null;
        }

        return cacheEntry.data;
    } catch (error) {
        console.warn("Cache read failed:", error);

        return null;
    }
};

export const invalidateUserCache = userId => {
    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX) && key.includes(userId));

        keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.warn("User cache invalidation failed:", error);
    }
};

export const clearExpiredCache = () => {
    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX));
        const now = Date.now();

        keys.forEach(key => {
            try {
                const cached = localStorage.getItem(key);

                if (cached) {
                    const cacheEntry = JSON.parse(cached);

                    if (now - cacheEntry.timestamp > cacheEntry.ttl) {
                        localStorage.removeItem(key);
                    }
                }
            } catch {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.warn("Cache cleanup failed:", error);
    }
};

export const clearAllGithubCache = () => {
    try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX));

        keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.warn("Cache clear failed:", error);
    }
};

export const withCache = async (type, userId, params, fetchFn) => {
    const cacheKey = getCacheKey(type, userId, params);

    const cachedData = getCache(cacheKey);

    if (cachedData !== null) {
        console.log(`[Cache HIT] ${type}`, params);

        return cachedData;
    }

    console.log(`[Cache MISS] ${type}`, params);
    const data = await fetchFn();

    const ttl = CACHE_CONFIG[type]?.ttl || DEFAULT_TTL;

    setCache(cacheKey, data, ttl);

    return data;
};

export const getCacheInfo = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX));
    const info = {
        totalEntries: keys.length,
        entries: [],
    };

    keys.forEach(key => {
        try {
            const cached = localStorage.getItem(key);

            if (cached) {
                const cacheEntry = JSON.parse(cached);
                const age = Date.now() - cacheEntry.timestamp;
                const remaining = cacheEntry.ttl - age;

                info.entries.push({
                    key: key.replace(CACHE_PREFIX, ""),
                    ageSeconds: Math.round(age / 1000),
                    remainingSeconds: Math.max(0, Math.round(remaining / 1000)),
                    expired: remaining <= 0,
                });
            }
        } catch {
            // Ignora entry corrotte
        }
    });

    return info;
};
