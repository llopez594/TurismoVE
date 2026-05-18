const cacheStore = new Map();

export function cache(ttlSeconds = 300) {
    return function cacheMiddleware(req, res, next) {
        const key = req.originalUrl;
        const cached = cacheStore.get(key);

        if (cached && cached.expiresAt > Date.now()) {
            return res.status(200).json({
                cached: true,
                data: cached.data
            });
        }

        const originalJson = res.json.bind(res);

        res.json = (body) => {
            cacheStore.set(key, {
                data: body,
                expiresAt: Date.now() + ttlSeconds * 1000
            });

            return originalJson(body);
        };

        next();
    };
}

export function clearCache() {
  cacheStore.clear();
}