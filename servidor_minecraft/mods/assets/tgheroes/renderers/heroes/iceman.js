extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/iceman/human_form",
	"human_suit": "tgheroes:x_men/iceman/iceman_human_form.tx.json",
	"ice_suit": "tgheroes:x_men/iceman/iceman_ice_form.tx.json",
	"base": "tgheroes:x_men/iceman/ice_form",
	"icicle": "tgheroes:x_men/iceman/iceman_icicle",
	"blade": "tgheroes:x_men/iceman/ice_arm",
    "blank": "tgheroes:blank",
	"ice_sled": "tgheroes:x_men/iceman/ice_wall_placeholder",
});

var utils = implement("fiskheroes:external/utils");
var spikeL;
var spikeR;
var icewall;
var overlay;

function init(renderer) {
    parent.init(renderer);
	  renderer.setTexture((entity, renderLayer) => {
        timer = entity.getData("tgheroes:dyn/ice_timer")
        return timer < 0.001 ? "layer1" : timer < 1 ? "human_suit" : "base"; 
        // return 'blank'
    });


    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:cold_beam", "body", 0x87cefa, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "rightArm" }
    ]);
	
	overlay_night = renderer.createEffect("fiskheroes:overlay");
    overlay_night.texture.set("blade");
	
	overlay_ice = renderer.createEffect("fiskheroes:overlay");
    overlay_ice.texture.set("ice_suit");
	
	spikeL = renderer.createEffect("fiskheroes:shield");
    spikeL.texture.set("icicle");
    spikeL.anchor.set("rightArm");
    spikeL.setRotation(0.0, 0.0, -3.125).setCurve(20.0, 90.0);
    spikeR = renderer.createEffect("fiskheroes:shield");
    spikeR.texture.set("icicle");
    spikeR.anchor.set("rightArm");
    spikeR.setRotation(0.0, 180.0, -3.125).setCurve(20.0, 90.0);
	
    utils.bindParticles(renderer, "tgheroes:iceman_ice").setCondition(entity => entity.getData("fiskheroes:flying"));
	utils.bindParticles(renderer, "tgheroes:ice_beam2").setCondition(entity => entity.getData("fiskheroes:shield_timer") == 1);
	
	var icewall_model = renderer.createResource("MODEL", "tgheroes:icewall");
	icewall_model.bindAnimation("tgheroes:ice_block").setData((entity, data) => data.load(Math.min(entity.getInterpolatedData("fiskheroes:shield_timer") * 2, 1)));
	icewall_model.texture.set("ice_sled");
	icewall = renderer.createEffect("fiskheroes:model").setModel(icewall_model);
	icewall.anchor.set("body");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");

    addAnimation(renderer, "basic.AIMING", "fiskheroes:aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getInterpolatedData("fiskheroes:aiming_timer"), entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    utils.addFlightAnimation(renderer, "thor.FLIGHT", "tgheroes:iceman_flight");
    utils.addHoverAnimation(renderer, "thor.HOVER", "tgheroes:iceman_flight");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {       

        spikeL.unfold = spikeR.unfold = entity.getInterpolatedData("fiskheroes:blade_timer");

        var f = Math.min(spikeL.unfold * 5, 1);
        spikeL.setOffset(2.25 + 1.0 * f, 8.0 + 2.0 * f, 0.0);
        spikeR.setOffset(-0.25 - 1.0 * f, 8.0 + 2.0 * f, 0.0);
        spikeL.render();
        spikeR.render();
		}
		if (entity.getData("fiskheroes:shield_timer")) {
      icewall.render();
    }
	
	overlay_ice.opacity = (entity.getInterpolatedData("tgheroes:dyn/ice_timer") > 0);
	overlay_ice.render();
	
	if (renderLayer == "HELMET" || renderLayer == "CHESTPLATE" || renderLayer == "LEGGINGS" || renderLayer == "BOOTS") {
        overlay_night.opacity = !entity.getData("tgheroes:dyn/ice") && entity.getData("fiskheroes:blade");
        overlay_night.render();	
	}
}