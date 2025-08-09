extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/bunshee/banshee_layer1",
    "scream": "tgheroes:x_men/bunshee/scream",
    "waves": "tgheroes:x_men/bunshee/waves",
	"web_wings": "tgheroes:x_men/bunshee/bunshee_wings"
});

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
		if (entity.getData("fiskheroes:beam_shooting")) {
            return "scream";
        }
		else if (entity.getData("fiskheroes:energy_projection")) {
            return "waves";
        }
        return "layer1";
    });
}

var web_wings;

var utils = implement("fiskheroes:external/utils");

function initEffects(renderer) {
    web_wings = renderer.createEffect("fiskheroes:wingsuit");
    web_wings.texture.set("web_wings");
    web_wings.opacity = 1.0;
    
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:shout_effect", "head", 0xe6e6e6, [
        { "firstPerson": [0.0, 0.0, 0.0], "offset": [0.0, 0.0, 0.0], "size": [0.5, 0.5] }
    ])
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:no_beam", "head", 0xffffff, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0],}
    ]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        web_wings.unfold = entity.getInterpolatedData("fiskheroes:wing_animation_timer");
        web_wings.render();
    }
}
