extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/apocalypse/apocalypse_layer1",
	"layer2": "tgheroes:x_men/apocalypse/apocalypse_layer2"
});

var utils = implement("fiskheroes:external/utils");

function initEffects(renderer) {


    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0xffffff);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
		forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15;
		return true;
    });

	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:doom_2099_telekinesis");
    utils.bindCloud(renderer, "fiskheroes:teleportation", "tgheroes:doom_2099_teleport");
	
	    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:repulsor_blast", "rightArm", 0x470718, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [2.0, 2.0] }
    ]);


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:kang_beam", "rightArm", 0x470718, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0],}
    ]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");

    addAnimation(renderer, "beter.CHARGED_BEAM", "fiskheroes:aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    utils.addFlightAnimation(renderer, "mmcw.FLIGHT", "fiskheroes:flight/default_arms_forward.anim.json");
}