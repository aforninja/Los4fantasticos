extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/angel/angel",
    "layer_angel_suit": "tgheroes:x_men/angel/angel.tx.json",
    "layer_arch_suit": "tgheroes:x_men/angel/archangel.tx.json",
    "layer_arch": "tgheroes:x_men/angel/arch_angel",
	"wing_angel": "tgheroes:x_men/angel/angel_wings",
	"wing_arch": "tgheroes:x_men/angel/xor_wings/arch_wings.tx.json",
    "blank": "tgheroes:blank",
	
});

var utils = implement("fiskheroes:external/utils");
var overlay;


function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
        timer = entity.getData("tgheroes:dyn/archangel_timer")
        return timer < 0.001 ? "layer1" : timer < 1 ? "layer_angel_suit" : "layer_arch"; 
    });
}

function initEffects(renderer) {
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
	
	overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set("layer_arch_suit");
	
	var model_wings = renderer.createResource("MODEL", "tgheroes:wings_angel");
	model_wings.bindAnimation("tgheroes:wings_slow_flap").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && !entity.isSprinting() && entity.loop(35)));
	model_wings.bindAnimation("tgheroes:wings_fast_flop").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && entity.isSprinting() && entity.loop(20)));
	model_wings.bindAnimation("tgheroes:wings_off").setData((entity,data) => data.load(!entity.getInterpolatedData('fiskheroes:flight_timer')));
    model_wings.texture.set("wing_angel");
    wings = renderer.createEffect("fiskheroes:model").setModel(model_wings);
    wings.anchor.set("body");
	wings.setOffset(0.0, 0.0, 1.0);


    var model_wings_arch = renderer.createResource("MODEL", "tgheroes:wings_angel");
	model_wings_arch.bindAnimation("tgheroes:wings_slow_flap").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && !entity.isSprinting() && entity.loop(35)));
	model_wings_arch.bindAnimation("tgheroes:wings_fast_flop").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && entity.isSprinting() && entity.loop(20)));
	model_wings_arch.bindAnimation("tgheroes:wings_off").setData((entity,data) => data.load(!entity.getInterpolatedData('fiskheroes:flight_timer')));
	model_wings_arch.bindAnimation("tgheroes:wings_shield").setData((entity,data) => data.load(entity.getInterpolatedData("fiskheroes:shield_blocking_timer")));
    model_wings_arch.texture.set("wing_arch");
    wings_arch = renderer.createEffect("fiskheroes:model").setModel(model_wings_arch);
    wings_arch.anchor.set("body");
	wings_arch.setOffset(0.0, 0.0, 1.0);

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.BLOCKING");

	utils.addFlightAnimation(renderer, "wings.FLIGHT", "fiskheroes:flight/propelled_hands.anim.json");
    utils.addHoverAnimation(renderer, "wings.HOVER", "fiskheroes:flight/idle/propelled_hands");
	utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
	addAnimationWithData(renderer, "wings.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;

}

function render(entity, renderLayer, isFirstPersonArm) {
	overlay.opacity = entity.getInterpolatedData("tgheroes:dyn/archangel_timer") > 0
	overlay.render();
	
	if (entity.getInterpolatedData("tgheroes:dyn/archangel_timer") == 0){
        wings.render();
    }
	
    if (entity.getInterpolatedData("tgheroes:dyn/archangel_timer") > 0){
        wings_arch.render();
    }
}

 