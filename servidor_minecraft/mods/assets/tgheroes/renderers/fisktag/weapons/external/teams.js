var DEFAULT_COLORS = {
    red: 0xFF0000, blue: 0x0011FF
};

function teamBasedColor(defaultColor) {
    return entity => getTeamBasedColor(entity, defaultColor);
}

function getTeamBasedColor(entity, defaultColor, colorScheme) {
    if (typeof colorScheme === "undefined") {
        colorScheme = DEFAULT_COLORS;
    }
    var s = entity.team().name();
    return s == "fisktag_RED" ? colorScheme.red
        : s == "fisktag_BLUE" ? colorScheme.blue
        : defaultColor;
}

function setTeamBasedTextures(entity, texture, hasLights) {
    var s = entity.team().name();
    var tex = s == "fisktag_RED" ? "red" : s == "fisktag_BLUE" ? "blue" : "base";
    if (hasLights) {
        texture.set(tex, tex + "_lights");
    }
    else {
        texture.set(tex);
    }
}
