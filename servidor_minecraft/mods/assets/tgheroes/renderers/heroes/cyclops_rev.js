extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/cyclops/extinction_layer1",
    "layer2": "tgheroes:x_men/cyclops/extinction_layer2",
    "logo": "tgheroes:x_men/cyclops/x_logo_small",
	"lights": "tgheroes:x_men/cyclops/extinction_light"
});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
	parent.init(renderer);
	 renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "HELMET" && (entity.is("DISPLAY") && entity.as("DISPLAY").isStatic() ? entity.getData("fiskheroes:mask_open") : entity.getData("tgheroes:dyn/mask_open_timer") > 0.35)) {
            return "layer2";
        }
        return renderLayer == "LEGGINGS" ? "layer2" : "layer1";
    });
	renderer.setLights((entity, renderLayer) => {
		if (entity.getData("fiskheroes:beam_shooting") || entity.getData("fiskheroes:aiming_timer")) {
			return renderLayer == "LEGGINGS" ? "lights" : "lights";
		}
		return renderLayer == "CHESTPLATE" ? null : null;
	});
}

function initEffects(renderer) {
	
    utils.bindParticles(renderer, "tgheroes:cyclops_eyes").setCondition(entity => entity.getData("fiskheroes:beam_charging") && entity.getData("fiskheroes:beam_charge") < 1);
	
    utils.bindBeam(renderer, "fiskheroes:heat_vision", "tgheroes:cyclops_no_mask", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.2, -3.3, -4.0], "size": [1.5, 0.75] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.2, -3.3, -4.0], "size": [1.5, 0.75] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:cyclops_charged", "head", 0xFF0000, [
        { "firstPerson": [0.0, 0.0, 3.0], "offset": [0.0, -3.0, 1.0], "size": [4.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:heat_vision", "head", 0xFF0000, [
        { "firstPerson": [0.0, 0.0, 3.0], "offset": [0.0, -3.0, 1.0], "size": [4.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	var model_logo = renderer.createResource("MODEL", "tgheroes:x_logo_small");
    model_logo.texture.set("logo", null);
    logo = renderer.createEffect("fiskheroes:model").setModel(model_logo);
    logo.anchor.set("body");
	logo.setOffset (0.0, 6.6, -1.5);
    logo.setScale(0.7);
	
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	addAnimation(renderer, "cyclops.MASK", "fiskheroes:remove_cowl")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("tgheroes:dyn/mask_open_timer");
            data.load(f < 1 ? f : 0);
        });
	
    renderer.removeCustomAnimation("basic.AIMING");
	addAnimationWithData(renderer, "cyclops.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "cyclops.BEAM", "tgheroes:psi_blast", "fiskheroes:beam_shooting");
}

function render(entity, renderLayer, isFirstPersonArm) {
	   
    logo.render();       
	
}

