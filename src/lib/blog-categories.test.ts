import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getBlogCategory } from "./blog-categories";

describe("getBlogCategory", () => {
    test("returns correct category for known slugs", () => {
        assert.equal(getBlogCategory("minimalist-carry-essentials"), "workflow");
        assert.equal(getBlogCategory("premium-materials-guide"), "materials");
        assert.equal(getBlogCategory("how-we-test-daily-carry"), "engineering");
    });

    test("returns 'workflow' as fallback for unknown slugs", () => {
        assert.equal(getBlogCategory("unknown-slug-123"), "workflow");
        assert.equal(getBlogCategory(""), "workflow");
    });
});
