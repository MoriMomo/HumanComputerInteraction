import { test, describe } from "node:test";
import assert from "node:assert";
import { getBlogCategory } from "./blog-categories.ts";

describe("getBlogCategory", () => {
    test("returns correct category for known slugs", () => {
        assert.strictEqual(getBlogCategory("minimalist-carry-essentials"), "workflow");
        assert.strictEqual(getBlogCategory("premium-materials-guide"), "materials");
        assert.strictEqual(getBlogCategory("how-we-test-daily-carry"), "engineering");
    });

    test("returns 'workflow' as fallback for unknown slugs", () => {
        assert.strictEqual(getBlogCategory("unknown-slug-123"), "workflow");
        assert.strictEqual(getBlogCategory(""), "workflow");
    });
});
