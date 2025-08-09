loadTextures({
	"base":        "tgheroes:aks",
    "crosshair":   "fisktag:crosshairs/sniper"
});

var utils = implement("fisktag:external/utils");
var teams = implement("fisktag:external/teams");

var model;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:aks", "base");
    renderer.setModel(model);

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

     utils.bindScopedBeam(renderer, "tgheroes:bullet_blast", teams.teamBasedColor(0xFDFE79), [
        { "firstPerson": [-6.0, 5.0, -16.0], "offset": [-5.2, 25.0, -20.5], "size": [1.0, 1.0] }], [4.5, -1.3, 2.0]);
		
	utils.bindScopedBeam(renderer, "tgheroes:buller_traser", teams.teamBasedColor(0xFFB841), [
        { "firstPerson": [-6.0, 5.0, -16.0], "offset": [-5.2, 25.0, -20.5], "size": [1.0, 1.0] }], [4.5, -1.3, 2.0]);	
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
	renderer.crosshair.opacity = 1 - (scopeTimer * scopeTimer * scopeTimer);

        
        if (renderType === "EQUIPPED_FIRST_PERSON") {
        var f = Math.sin(entity.getInterpolatedData("fiskheroes:scope_timer") * Math.PI / 2);
        glProxy.rotate(-f * 10, 50, 0, 0);
        glProxy.translate(0, -scopeTimer * 0.125, scopeTimer * 0.2);
        glProxy.translate(0.035, -1.08, recoil * (0.7 - 0.2 * scopeTimer));
    }
        else {
            if (renderType === "ENTITY" || renderType === "INVENTORY") {
                glProxy.translate(0, -0.05, 0.55);
            }
            renderer.opacity = 1;
            glProxy.translate(0, -0.9, -0.15);
			glProxy.scale(1);
        }
    
        
        teams.setTeamBasedTextures(entity, model.texture, true);
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
