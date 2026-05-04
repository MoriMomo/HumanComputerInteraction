import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getBlogCategory, formatCategoryLabel } from "./blog-categories";

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

describe("formatCategoryLabel", () => {
    test("returns 'Carry Workflow' for 'workflow'", () => {
        assert.equal(formatCategoryLabel("workflow"), "Carry Workflow");
    });

    test("returns 'Materials' for 'materials'", () => {
        assert.equal(formatCategoryLabel("materials"), "Materials");
    });

    test("returns 'Engineering' for 'engineering'", () => {
        assert.equal(formatCategoryLabel("engineering"), "Engineering");
    });

    test("returns 'Engineering' as fallback for invalid category at runtime", () => {
        assert.equal(formatCategoryLabel("invalid" as any), "Engineering");
        assert.equal(formatCategoryLabel(undefined as any), "Engineering");
        assert.equal(formatCategoryLabel(null as any), "Engineering");
    });
});
