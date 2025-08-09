extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/gambit/gambit_layer1",
    "layer2": "tgheroes:x_men/gambit/gambit_layer2",
	"card": "tgheroes:x_men/gambit/card",
	"card2": "tgheroes:x_men/gambit/card",
	"coat": "tgheroes:x_men/gambit/coat_gambit",
});

function init(renderer) {
    parent.init(renderer);
}
var utils = implement("fiskheroes:external/utils");
var energy;

function initEffects(renderer) {
	var model_card = renderer.createResource("MODEL", "tgheroes:card");
    model_card.texture.set("card", "card2");
    model_card.bindAnimation("tgheroes:card").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:beam_shooting')));
    card = renderer.createEffect("fiskheroes:model").setModel(model_card);
    card.anchor.set("rightArm");
	card.setScale(0.25);

	


    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0x9400d3, [
        { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [2.0, 1.5] }
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:vortex", "rightArm", 0x9400d3, [
         { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [0, 0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));
	
	
	var model_coat = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat.texture.set("coat");
    model_coat.generateMirror();
    coat = renderer.createEffect("fiskheroes:model").setModel(model_coat);
    coat.anchor.set("rightLeg");
	coat.setOffset (-1.8, -13.0, 0.25);
	coat.setScale (1.05);
    coat.mirror = true;
}

function initAnimations(renderer) {
        parent.initAnimations(renderer);
        renderer.removeCustomAnimation("basic.CHARGED_BEAM");
		renderer.removeCustomAnimation("basic.AIMING");
        addAnimation(renderer, "gambit.STAFF_EQUIP", "tgheroes:equip").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:blade_timer")))
        .priority = -9;
		addAnimationWithData(renderer, "card.THROW", "fiskheroes:aiming_fpcorr", "fiskheroes:beam_charge");
}

function render(entity, renderLayer, isFirstPersonArm) {
		coat.render();
	
	
	if (entity.getData("tgheroes:dyn/card_timer") > 0.5 ) {
            var blade_anchor = card.anchor.set("rightArm");
            var blade_offSet = card.setOffset(1.0, 10.0, -8.0);
            var blade_rot = card.setRotation(90, 90, 0);	
            card.anchor = blade_anchor, blade_offSet, blade_rot;
            card.render();
        }
	
	
}
	