extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/sentinel/sentinel_layer1",
    "layer2": "tgheroes:x_men/sentinel/sentinel_layer2",
	"lights": "tgheroes:x_men/sentinel/sentinel_light",
	"wire": "tgheroes:x_men/sentinel/wire"
});

var utils = implement("fiskheroes:external/utils");
var metal_heat;
var boosters2;
var boots_booster = implement("tgheroes:external/sentinel_boost");

function init(renderer) {
	parent.init(renderer);
	renderer.setLights((entity, renderLayer) => {
		if (entity.isAlive() || !entity.isAlive()) {
			return renderLayer == "LEGGINGS" ? "lights" : "lights";
		}
		return renderLayer == "CHESTPLATE" ? null : null;
	});
}

function initEffects(renderer) {	
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
	metal_heat = renderer.createEffect("fiskheroes:metal_heat");
	
	boosters2 = boots_booster.create(renderer, "fiskheroes:blue_fire_layer_%s", true);

    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
	
	var wire = utils.createModel(renderer, "tgheroes:wire", "wire");
    var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
        { "offset": [10.0, -2.0, -4.0], "direction": [5.0, -2.0, 0.0] },
		{ "offset": [0.0, -2.0, -4.0], "direction": [-5.0, -2.0, 0.0] }
    ]);
    tentacles.anchor.set("leftArm");
    tentacles.setSegmentModel(wire);
	tentacles.segmentLength = 7.0;
    tentacles.segments = 8;
	
	utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.isSprinting() && entity.getData("fiskheroes:flying") ? 0.3 * Math.sin(Math.PI * entity.getInterpolatedData("fiskheroes:flight_boost_timer")) : 0;
        return true;
    });
    shake.intensity = 0.15;
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:repulsor_blast", "rightArm", 0xce1414, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [10.0, 10.0] }
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:heat_vision", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.2, -3.3, -4.0], "size": [0.5, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.2, -3.3, -4.0], "size": [0.5, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	utils.addFlightAnimationWithLanding(renderer, "iron_man.FLIGHT", "fiskheroes:flight/iron_man.anim.json");
    utils.addHoverAnimation(renderer, "iron_man.HOVER", "fiskheroes:flight/idle/iron_man");
	addAnimation(renderer, "gl.CHAINS", "fiskheroes:dual_aiming").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:tentacle_extend_timer")))
    .priority = -9;

}

function render(entity, renderLayer, isFirstPersonArm) {
	boosters2.render(entity, renderLayer, isFirstPersonArm, false);
	
	metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
    metal_heat.render();
}

 