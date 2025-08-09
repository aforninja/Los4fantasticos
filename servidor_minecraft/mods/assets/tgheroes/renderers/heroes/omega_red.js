extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/omega_red/red_omega_layer1",
    "layer2": "tgheroes:x_men/omega_red/red_omega_layer2",
	"segment": "tgheroes:x_men/omega_red/red_omega_wire",
	"hair": "tgheroes:x_men/omega_red/red_omega_ponytale"
});

var utils = implement("fiskheroes:external/utils");
var hair;
function init(renderer) {
    parent.init(renderer);	

}
function initEffects(renderer) {		
	var wire = utils.createModel(renderer, "fiskheroes:ock_arm", "segment");
    var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
        { "offset": [10.0, -2.0, -4.0], "direction": [5.0, 5.0, 0.0] },
		{ "offset": [0.0, -2.0, -4.0], "direction": [-5.0, 5.0, 0.0] }
    ]);
    tentacles.anchor.set("leftArm");
    tentacles.setSegmentModel(wire);
	tentacles.segmentLength = 1.8;
    tentacles.segments = 16;
	
	var model_hair = renderer.createResource("MODEL", "tgheroes:red_omega_ponytale");
    model_hair.texture.set("hair", null);
	model_hair.bindAnimation("tgheroes:ponytail").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    hair = renderer.createEffect("fiskheroes:model").setModel(model_hair);
    hair.anchor.set("head");
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	addAnimation(renderer, "gl.CHAINS", "fiskheroes:dual_aiming").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:tentacle_extend_timer")))
    .priority = -9;
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (entity.getWornHelmet()) {
		hair.render();
    }
}