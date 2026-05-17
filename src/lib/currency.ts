export function formatIDR(amount: number) {
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(amount);
    } catch (e) {
        return `Rp${amount}`;
    }
}
