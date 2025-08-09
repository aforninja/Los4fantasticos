loadTextures({
    "base":        "tgheroes:deadpool/d_rocket",
    "base_lights": "tgheroes:r_louncher_light",
    "scope":       "tgheroes:deadpool/rocket_launcher_blue",
    "crosshair":   "fisktag:crosshairs/rocket_launcher"
});

var utils = implement("fisktag:external/utils");
var teams = implement("fisktag:external/teams");

var model;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:r_louncher", "base", "base_lights");
    renderer.setModel(model);
    utils.addPlayerAnimationWithData(renderer, "fisktag:dual_hand", "fiskheroes:aiming_timer");

    scope = renderer.bindOverlay();
    scope.texture.set("scope");

    utils.addPlayerAnimation(renderer, "tgheroes:rocket_reload")
	.setData((entity, data) => {data.load(0, entity.getInterpolatedData("fiskheroes:reload_timer"));      
    }).priority = 1;

    utils.makeDilatingCrosshair(renderer, "crosshair", 26, 26, [
        { "pos": [11, 11], "size": [5, 5] }, // Center
        { "pos": [1, 11], "size": [10, 5], "axis": [-1, 0] }, // Left
        { "pos": [16, 11], "size": [10, 5], "axis": [1, 0] }, // Right
        { "pos": [11, 16], "size": [5, 10], "axis": [0, 1] }, // Bottom
    ], 5, 5, 10);

    utils.bindScopedBeam(renderer, "fisktag:rocket_launcher_beam", teams.teamBasedColor(0xFFA860), [
        { "firstPerson": [-5.0, 2.5, -18.0], "offset": [-1.5, 24.0, -5.5], "size": [5.0, 5.0] }
    ], [-3.0, -3.5, -18.0]);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    if (renderType === "HUD") {
        switch (entity.team().name()) {        
        default:
            scope.texture.set("scope");
            break;
        }
        scope.opacity = scopeTimer * scopeTimer * scopeTimer;
        renderer.crosshair.opacity = 1 - scope.opacity;
        return;
    }
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        var f = easeInOutSine(entity.getInterpolatedData("fiskheroes:scope_timer"));
        renderer.opacity = 1 - scopeTimer * scopeTimer * scopeTimer;
        glProxy.rotate(-90, 0, -1, 0);
		glProxy.rotate(0, -1, 0, 0);
		glProxy.rotate(0, 0, 0, -1);
        glProxy.translate(0.5, -0.5, -0.5);

    }
    else {
        if (renderType === "EQUIPPED") {
            var aiming = easeInOutSine(entity.getInterpolatedData("fiskheroes:aiming_timer"));
			glProxy.translate(-0.3, 0.0, -1.0);
			glProxy.translate(0.2* aiming, 0.5* aiming, 0.25* aiming);
            glProxy.rotate(-45.0 * aiming, -0.1, 0.0, 0.0);
			glProxy.rotate(25.0 * aiming, 0.0, -0.1, 0.0);
			glProxy.rotate(-90, 0, -1, 0);
			glProxy.rotate(0, -1, 0, 0);
			glProxy.rotate(0, 0, 0, -1);
		
        }
		
        else if (renderType === "ENTITY" || renderType === "INVENTORY") {
            glProxy.translate(0, 0.1, -0.25);
			glProxy.rotate(-90, 0, -1, 0);
			glProxy.rotate(0, -1, 0, 0);
			glProxy.rotate(0, 0, 0, -1);
        }
        renderer.opacity = 1;
    }
    glProxy.scale(1.2);
    teams.setTeamBasedTextures(entity, model.texture, true);
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
