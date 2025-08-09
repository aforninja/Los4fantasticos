extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/cyclops/casual__layer1",
    "layer2": "tgheroes:x_men/cyclops/casual__layer2",
    "visor": "tgheroes:x_men/cyclops/glasses",
	"lights": "tgheroes:x_men/cyclops/glasses_light"
});

var utils = implement("fiskheroes:external/utils");



function initEffects(renderer) {
	
    utils.bindBeam(renderer, "fiskheroes:heat_vision", "tgheroes:cyclops_no_mask", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.2, -3.3, -4.0], "size": [1.0, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.2, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:cyclops_no_mask", "head", 0xFF0000, [
       { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.2, -3.3, -4.0], "size": [1.0, 1.0] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.2, -3.3, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:cyclops_no_mask", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.2, -3.3, -4.0], "size": [1.0, 1.0] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.2, -3.3, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
	var model_visor = renderer.createResource("MODEL", "tgheroes:mask");
    model_visor.texture.set("visor", "lights");
	model_visor.bindAnimation("tgheroes:visor").setData((entity,data) => data.load(entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") > 0.35));
    visor = renderer.createEffect("fiskheroes:model").setModel(model_visor);
    visor.anchor.set("head");
	visor.setOffset (-0.15, 0.1, -0.25);
	visor.setScale(1.05);	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	addAnimation(renderer, "cyclops.MASK", "tgheroes:visor").setData((entity,data) => data.load(entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") > 0.3 )).priority = 5;			
	
	
    renderer.removeCustomAnimation("basic.AIMING");
	addAnimationWithData(renderer, "cyclops.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "cyclops.BEAM", "tgheroes:psi_blast", "fiskheroes:beam_shooting");
}

function render(entity, renderLayer, isFirstPersonArm) {
	
    visor.render();       
	
}
