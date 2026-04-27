export class RateLimiter {
    private store: Map<string, { count: number; resetTime: number }> = new Map();

    constructor(
        private maxRequests: number,
        private windowMs: number
    ) {}

    check(ip: string): boolean {
        const now = Date.now();
        const record = this.store.get(ip);

        if (!record) {
            this.store.set(ip, { count: 1, resetTime: now + this.windowMs });
            return true;
        }

        if (now > record.resetTime) {
            this.store.set(ip, { count: 1, resetTime: now + this.windowMs });
            return true;
        }

        if (record.count >= this.maxRequests) {
            return false;
        }

        record.count += 1;
        return true;
    }

    cleanUp() {
        const now = Date.now();
        for (const [ip, record] of this.store.entries()) {
            if (now > record.resetTime) {
                this.store.delete(ip);
            }
        }
    }
}

export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 requests per 15 minutes
export const contactRateLimiter = new RateLimiter(3, 60 * 60 * 1000); // 3 requests per hour

setInterval(() => {
    authRateLimiter.cleanUp();
    contactRateLimiter.cleanUp();
}, 1000 * 60 * 60); // Clean up every hour
