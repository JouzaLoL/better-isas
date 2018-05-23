module.exports = function getRandomTitle() {
    const titles = [
        "Better iSAS",
        "iSAS but it's actually useful",
        "psst, want some weighted average?",
        "ayySAS"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
};