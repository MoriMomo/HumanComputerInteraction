export const BLOG_POSTS = [
    {
        slug: "minimalist-carry-essentials",
        title: "The Art of Minimalist Carry",
        excerpt: "Discover how to streamline your everyday carry for maximum efficiency and clarity.",
        date: "March 10, 2026",
        readTime: "5 min read",
        content: `Everyday carry has become something of an art form among professionals who value both form and function. The principle is simple: carry only what you need, and make sure every item earns its place.

Start with your wallet. A bulky bi-fold loaded with receipts and loyalty cards is dead weight. A slim card holder that holds four to six essentials is all most professionals need. Your most-used cards go in front — transit, bank, ID. The rest live at home.

The same logic applies to keys, pens, and notebooks. Every item you carry should have a defined purpose and a defined home. When you know exactly what you have and where it is, decision fatigue disappears before the day even begins.

Premium materials matter because they age well. 6061-T6 aluminium develops a patina of use that cheap plastic never achieves. Anodised finishes hold their colour. A well-made carry object becomes part of your identity over years of daily use.

The goal is not minimalism for its own sake — it is intentionality. Carry less, but carry better.`,
    },
    {
        slug: "premium-materials-guide",
        title: "Understanding Premium Materials",
        excerpt: "A deep dive into aluminium, anodising, and the materials that define professional carry.",
        date: "March 5, 2026",
        readTime: "7 min read",
        content: `Not all aluminium is created equal. When we say 6061-T6, we mean a specific alloy — 97.9% aluminium with controlled additions of magnesium and silicon — then tempered to a precise hardness. It machines cleanly, holds tight tolerances, and resists corrosion better than most alternatives.

Anodising is an electrochemical process that converts the surface of the aluminium into aluminium oxide — a ceramic-like layer that is integral to the metal itself. It cannot peel or chip like paint. Properly anodised aluminium is harder than steel at the surface, yet the body remains lightweight and ductile.

PVD — Physical Vapour Deposition — is a step further. A thin metallic coating is applied in a vacuum chamber at the atomic level. The result is a surface of exceptional hardness and colour consistency. This is why aerospace components and premium watches use PVD.

Micro-blasting before anodising creates the subtly matte texture you feel on SatSet products. It is not a coating. It is the surface itself — thousands of microscopic impacts creating a controlled roughness that diffuses light and conceals fingerprints.

When you hold a well-made aluminium object, you are holding the result of materials science refined over decades.`,
    },
    {
        slug: "office-organization-tips",
        title: "The Organised Desk, Revisited",
        excerpt: "Rethinking desk organisation for the professional who needs their environment to think clearly.",
        date: "February 28, 2026",
        readTime: "4 min read",
        content: `A cluttered desk is not a sign of a creative mind. It is a tax on your attention. Every object that does not serve your current task competes for cognitive bandwidth you need for the work itself.

The rule is simple: surfaces are for work, not storage. Everything on your desk should be either in active use or immediately accessible. Everything else belongs in a drawer, a shelf, or out of the room entirely.

Your most-used desktop items should be within arm's reach and arranged by frequency of use. Phone at the dominant hand. Pen directly in front. Water to the side. Everything else: out.

Cable management is not cosmetic. A desk with tangled cables creates low-level visual noise that accumulates into real fatigue over an eight-hour day. Cable clips, a routing tray, and shorter cables eliminate the problem at the source.

The desk organiser is not optional equipment for a serious professional. It is infrastructure — the difference between a space that prepares you to work and one that quietly drains you from the moment you sit down.`,
    },
];

export type BlogPost = (typeof BLOG_POSTS)[number];
