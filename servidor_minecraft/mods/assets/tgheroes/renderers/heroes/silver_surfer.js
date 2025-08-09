extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:fantastic_4/surfer/surfer_layer1",
    "layer2": "tgheroes:fantastic_4/surfer/surfer_layer2",
	"surfboard": "tgheroes:fantastic_4/surfer/surf",
	"null": "tgheroes:blank"
});

var utils = implement("fiskheroes:external/utils");


function init(renderer) {
    parent.init(renderer);	

}
function initEffects(renderer) {	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:magnetic_rays", "body", 0x7A2BFF, [
		{ "firstPerson": [-3.75, 3.0, -6.0], "offset": [-1.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "rightArm" }
    ]);
	
    renderer.bindProperty("fiskheroes:gravity_manipulation").color.set(0x7A2BFF);
	
	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:doom_telekinesis");

	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:doom_magic", "body", 0xd2e6f0, [
        {"firstPerson": [4.5, 3.75, -7.0], "offset": [0.5, 12.0, 0.0], "size": [4.0, 4.0], "anchor": "leftArm" },
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [4.0, 4.0], "anchor": "rightArm" }
    ]);

	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:doom_magic", "rightArm", 0xd2e6f0, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [2.0, 2.0] }
    ]);

    var model_surfboard = renderer.createResource("MODEL", "tgheroes:surfboard");
    model_surfboard.texture.set("surfboard");
    surfboard = renderer.createEffect("fiskheroes:model").setModel(model_surfboard);
    surfboard.anchor.ignoreAnchor(true);

	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");


	addAnimation(renderer, "basic.AIMING", "fiskheroes:dual_aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });
	
	addAnimation(renderer, "surf.SLOW", "tgheroes:slow_fly").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:flight_timer")
	 )).setCondition(entity =>  !entity.getInterpolatedData("fiskheroes:flight_boost_timer")>0.999);

    addAnimation(renderer, "surf.FAST", "tgheroes:fast_fly").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
        data.load(Math.max(entity.getData("fiskheroes:flight_boost_timer") ? Math.min(charge * 1, 1) : Math.max(charge * 5 - 4, 0)));
    });
/*
	addAnimation(renderer, "surf.FAST", "tgheroes:fast_fly").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:flight_boost_timer")
	 ));
*/
}

function render(entity, renderLayer, isFirstPersonArm) {
	var fly = entity.getInterpolatedData("fiskheroes:flight_timer");
	
	if (entity.getData("fiskheroes:flight_timer") > 0) {
		surfboard.setOffset (0.0, 0.0, -206 * fly);

		surfboard.render(); 
	}

}


