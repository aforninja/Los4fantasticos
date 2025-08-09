extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/cable/cable_layer1",
    "layer2": "tgheroes:x_men/cable/cable_layer2",
    "eye": "tgheroes:x_men/cable/eye"
});

var utils = implement("fiskheroes:external/utils");
var overlay;

function init(renderer) {
    parent.init(renderer);
}

function initEffects(renderer) {
	initEquipped(renderer);	
	
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
	overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "eye");
	
	var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0xffa420);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.0);
    forcefield.setCondition(entity => {
		forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15;
		return true;
    });

	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:gray_telekinesis");
    utils.bindCloud(renderer, "fiskheroes:teleportation", "tgheroes:gray_teleport");
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:not_spin_beam","body", 0xffa420, [
        { "firstPerson": [4.5, 3.75, -8.0], "offset": [1.0, 9.0, 0.0], "size": [1.5, 1.5],"anchor": "leftArm" }
	]);
}

function initEquipped(renderer) {
	utils.addLivery(renderer, "BERETTA_93", "gun");

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "leftLeg", "scale": 0.6, "offset": [2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] }
    ]).slotIndex = 1;
    
	renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.7, "offset": [-3.5, 2.0, 3.0], "rotation": [0.0, -90.0, 60.0] }
    ]).addOffset("QUIVER", 0.0, 0.0, 3.0).slotIndex = 0;
	
	renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "rightLeg", "scale": 0.7, "offset": [-1.0, -1.0, 2.0], "rotation": [90.0, -90.0, 0.0] }
    ]).slotIndex = 2;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimation(renderer, "beter.CHARGED_BEAM","fiskheroes:aiming_left").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });
	
}

function render(entity, renderLayer, isFirstPersonArm) {
	
	overlay.render();

}