module.exports = {
    randomTitle: function getRandomTitle() {
        const titles = [
            "EK",
            "iSAS but it's actually useful",
            "psst, want some weighted average?",
            "ayySAS"
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }
};