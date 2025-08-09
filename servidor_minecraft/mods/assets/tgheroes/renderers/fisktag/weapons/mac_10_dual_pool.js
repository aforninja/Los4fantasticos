loadTextures({
    "base":      "tgheroes:deadpool/deadpool_mac",
    "crosshair": "fisktag:crosshairs/pistol"
});

var utils = implement("fisktag:external/utils");
var teams = implement("fisktag:external/teams");

var model;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:mac10_2", "base");
    renderer.setModel(model);

    utils.addPlayerAnimation(renderer, "tgheroes:mac10_reload")
	.setData((entity, data) => {data.load(0, entity.getInterpolatedData("fiskheroes:reload_timer"));
        
    }).priority = 1;

    utils.makeDilatingCrosshair(renderer, "crosshair", 16, 8, [
        { "pos": [6, 1], "size": [5, 7] }, // Center
        { "pos": [1, 1], "size": [5, 7], "axis": [-1, 0] }, // Left
        { "pos": [11, 1], "size": [5, 7], "axis": [1, 0] } // Right
    ], 0, 4, 12.5);

    utils.bindScopedBeam(renderer, "tgheroes:bullet_blast", teams.teamBasedColor(0xFF5EF9), [
        { "firstPerson": [-5.0, 2.0, -18.0], "offset": [-1.0, 20.0, -4.5], "size": [1.0, 1.0] }], [3.0, -2.0, -2.0]);
	utils.bindScopedBeam(renderer, "tgheroes:buller_traser", teams.teamBasedColor(0xFFB841), [
        { "firstPerson": [-5.0, 2.0, -18.0], "offset": [-1.0, 20.0, -4.5], "size": [1.0, 1.0] }], [3.0, -2.0, -2.0]);	
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    glProxy.translate(0, -0.3, 0.25);

    if (renderType === "EQUIPPED_FIRST_PERSON") {
        var f = 1 - scopeTimer * 0.4;
        recoil *= 0.7;
        glProxy.translate(-Math.sin(entity.getInterpolatedData("fiskheroes:scope_timer") * Math.PI / 2) * 0.5, 0.1, 0.3 * recoil);
        glProxy.rotate(-recoil * (20 - scopeTimer * 7), 1, 0, 0);
        glProxy.translate(0.02 * recoil * (1 - scopeTimer), -0.04 * recoil * f, (Math.sin(recoil * Math.PI) * 0.1) * f);
    }
	
    glProxy.scale(0.75);
    teams.setTeamBasedTextures(entity, model.texture, false);
}
