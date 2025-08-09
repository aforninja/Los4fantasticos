extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/cyclops/cyclops_layer1",
    "layer2": "tgheroes:x_men/cyclops/cyclops_layer2",
    "logo": "tgheroes:x_men/cyclops/x_logo_small",
    "logo2": "tgheroes:blank",
    "visor": "tgheroes:x_men/cyclops/visor",
	"lights": "tgheroes:x_men/cyclops/visor_light"
});

var utils = implement("fiskheroes:external/utils");

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
	
	var model_visor = renderer.createResource("MODEL", "tgheroes:mask");
    model_visor.texture.set("visor", "lights");
	model_visor.bindAnimation("tgheroes:visor").setData((entity,data) => data.load(entity.getInterpolatedData("fiskheroes:mask_open_timer") > 0));
    visor = renderer.createEffect("fiskheroes:model").setModel(model_visor);
    visor.anchor.set("head");
	visor.setOffset (-0.15, 0.0, -0.25);
	visor.setScale(1.05);
    
    var model_logo = renderer.createResource("MODEL", "tgheroes:x_logo_small");
    model_logo.texture.set("logo", null);
    logo = renderer.createEffect("fiskheroes:model").setModel(model_logo);
    logo.anchor.set("body");
	logo.setOffset (-2.1, -0.6, -1.5);
    logo.setScale(0.7);

    var model_logo2 = renderer.createResource("MODEL", "tgheroes:x_logo_small");
    model_logo2.texture.set("logo2", null);
    logo2 = renderer.createEffect("fiskheroes:model").setModel(model_logo2);
    logo2.anchor.set("body");
	logo2.setOffset (0.0, 6.6, -1.5);
    logo2.setScale(0.7);
	
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	addAnimation(renderer, "cyclops.MASK", "tgheroes:visor").setData((entity,data) => data.load(entity.getInterpolatedData("fiskheroes:mask_open_timer") > 0)).priority = 5;			
	
	
    renderer.removeCustomAnimation("basic.AIMING");
	addAnimationWithData(renderer, "cyclops.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "cyclops.BEAM", "tgheroes:psi_blast", "fiskheroes:beam_shooting_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
	
    visor.render();       
    logo.render();       
    logo2.render();       
	
}
