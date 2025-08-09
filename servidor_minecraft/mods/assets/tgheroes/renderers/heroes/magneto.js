extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/magneto/magneto_layer1",
    "layer2": "tgheroes:x_men/magneto/magneto_layer2",
	"cape": "tgheroes:x_men/magneto/mganeto_cape",
	"magneto_platform": "tgheroes:x_men/magneto/magneto_platform",
	"iron_wall": "tgheroes:x_men/magneto/iron_wall",
	"metal_chip": "tgheroes:x_men/magneto/metal_chip",
	"null": "tgheroes:blank"
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var cape;
var iron_wall;

function init(renderer) {
    parent.init(renderer);	

}
function initEffects(renderer) {	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:magnetic_rays", "body", 0x7A2BFF, [
		{ "firstPerson": [-3.75, 3.0, -6.0], "offset": [-1.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "rightArm" }
    ]);
	
    renderer.bindProperty("fiskheroes:gravity_manipulation").color.set(0x7A2BFF);
	
	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:doom_telekinesis");
	
	
	var iron_wall_model = renderer.createResource("MODEL", "tgheroes:icewall");
	iron_wall_model.bindAnimation("tgheroes:ice_block").setData((entity, data) => data.load(Math.min(entity.getInterpolatedData("fiskheroes:shield_timer") * 2, 1)));
	iron_wall_model.texture.set("iron_wall");
	iron_wall = renderer.createEffect("fiskheroes:model").setModel(iron_wall_model);
	iron_wall.anchor.set("body");
	
	iron_wall2 = renderer.createEffect("fiskheroes:model").setModel(iron_wall_model);
	iron_wall2.anchor.set("body");
	iron_wall2.setRotation (0.0, 180.0, 0.0);
	
	iron_wall3 = renderer.createEffect("fiskheroes:model").setModel(iron_wall_model);
	iron_wall3.anchor.set("body");
	iron_wall3.setRotation (0.0, 90.0, 0.0);
	
	iron_wall4 = renderer.createEffect("fiskheroes:model").setModel(iron_wall_model);
	iron_wall4.anchor.set("body");
	iron_wall4.setRotation (0.0, -90.0, 0.0);
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.8;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.7;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");

    var model_magneto_platform = renderer.createResource("MODEL", "tgheroes:magneto_platform");
    model_magneto_platform.texture.set("magneto_platform");
    magneto_platform = renderer.createEffect("fiskheroes:model").setModel(model_magneto_platform);
    magneto_platform.anchor.set("body");
	
	var arm = utils.createModel(renderer, "tgheroes:fantasticarm", "null");
	var stretchfist = utils.createModel(renderer, "tgheroes:metal_chip", "metal_chip");
	var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
        { "offset": [2.0, -4.5, -2.0], "direction": [13.0, 10.0, -10.0] },
        { "offset": [-2.0, -4.5,-2.0], "direction": [-13.0, 10.0, -10.0] },
        { "offset": [2.0, -7.5, -2.0], "direction": [13.0, -10.0, -10.0] },
        { "offset": [-2.0, -7.5, -2.0], "direction": [-13.0, -10.0, -10.0] },
		{ "offset": [0.0, 0.0, 0.0], "direction": [0.0, 20.0, -15.0] }
    ]);
    tentacles.anchor.set("body");
    tentacles.setSegmentModel(arm);
	tentacles.setHeadModel(stretchfist);
    tentacles.segmentLength = 1.0;
    tentacles.segments = 16;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	
	utils.addFlightAnimation(renderer, "kang.FLIGHT", "tgheroes:gliding");
    utils.addHoverAnimation(renderer, "kang.HOVER", "tgheroes:gliding");
	addAnimationWithData(renderer, "storm.WIND", "fiskheroes:aiming", "fiskheroes:energy_projection_timer");
	
	addAnimation(renderer, "gl.CHAINS", "fiskheroes:aiming").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:tentacle_extend_timer")))
    .priority = -9;

}

function render(entity, renderLayer, isFirstPersonArm) {
	if (entity.getData("fiskheroes:shield_timer")) {
      iron_wall.render();
	  iron_wall2.render();
	  iron_wall3.render();
	  iron_wall4.render();
    }
	
	if (entity.getData("fiskheroes:flight_timer") > 0.1) {
		
		var flight_offSet = magneto_platform.setOffset(0.0, 4.5, 0.0);
		magneto_platform.anchor = flight_offSet;
		magneto_platform.render(); 
	}
	if (!entity.getData("fiskheroes:shield_timer")) {
	cape.render(entity);
	}
}


