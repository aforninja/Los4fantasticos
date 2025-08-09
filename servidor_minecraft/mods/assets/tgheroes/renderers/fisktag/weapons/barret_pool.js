loadTextures({
    "base":        "tgheroes:deadpool/deadpool_barrett",
    "scope":       "tgheroes:deadpool/barrett_csope",
	"base_lights": "tgheroes:barrett_light",
    "crosshair":   "fisktag:crosshairs/sniper"
});

var utils = implement("fisktag:external/utils");
var teams = implement("fisktag:external/teams");

var model;
var scope;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:barrett1", "base", "base_lights");
    renderer.setModel(model);
    scope = renderer.bindOverlay();

    utils.addPlayerAnimation(renderer, "tgheroes:m4_reload")
	.setData((entity, data) => {data.load(0, entity.getInterpolatedData("fiskheroes:reload_timer"));      
    }).priority = 1;

    utils.makeDilatingCrosshair(renderer, "crosshair", 22, 18, [
        { "pos": [9, 7], "size": [5, 5] }, // Center
        { "pos": [1, 7], "size": [8, 5], "axis": [-1, 0] }, // Left
        { "pos": [14, 7], "size": [8, 5], "axis": [1, 0] }, // Right
        { "pos": [9, 1], "size": [5, 6], "axis": [0, -1] }, // Top
        { "pos": [9, 12], "size": [5, 6], "axis": [0, 1] } // Bottom
    ], 18, 18);

    utils.bindScopedBeam(renderer, "tgheroes:bullet_blast", teams.teamBasedColor(0xFF5EF9), [
        { "firstPerson": [-5.0, 2.0, -18.0], "offset": [-1.0, 20.0, -4.5], "size": [1.0, 1.0] }], [3.0, -2.0, -2.0]);
	utils.bindScopedBeam(renderer, "tgheroes:buller_traser", teams.teamBasedColor(0xFFB841), [
        { "firstPerson": [-5.0, 2.0, -18.0], "offset": [-1.0, 20.0, -4.5], "size": [1.0, 1.0] }], [3.0, -2.0, -2.0]);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    if (renderType == "HUD") {
        switch (entity.team().name()) {
        default:
            scope.texture.set("scope");
            break;
        }
        scope.opacity = scopeTimer * scopeTimer * scopeTimer;
        renderer.crosshair.opacity = 1 - scope.opacity;
    }
    else {
        if (renderType === "EQUIPPED_FIRST_PERSON") {
            renderer.opacity = 1 - scopeTimer * scopeTimer * scopeTimer;
            glProxy.translate(scopeTimer * -0.054, scopeTimer * -0.15, scopeTimer * 0.53);
            glProxy.translate(0, 0, recoil * 0.6);
            glProxy.translate(0, 0.25, -0.4);
			glProxy.rotate(-90, 0, -1, 0);
			glProxy.rotate(0, -1, 0, 0);
			glProxy.rotate(0, 0, 0, -1);
			 glProxy.scale(0.85);
			
        }
        else {
            if (renderType === "ENTITY" || renderType === "INVENTORY") {
                glProxy.translate(0, -0.05, 0.55);
            }
            renderer.opacity = 1;
            glProxy.translate(0, 0.25, -0.4);
			glProxy.rotate(-90, 0, -1, 0);
			glProxy.rotate(0, -1, 0, 0);
			glProxy.rotate(0, 0, 0, -1);
			 glProxy.scale(0.85);
        }
    
       
        teams.setTeamBasedTextures(entity, model.texture, true);
    }
}
