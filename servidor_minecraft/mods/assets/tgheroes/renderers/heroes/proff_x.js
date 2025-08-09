extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/proff_x/xavier_layer1",
    "layer2": "tgheroes:x_men/proff_x/xavier_layer2",
	"chair": "tgheroes:x_men/proff_x/x_chair"
});

var utils = implement("fiskheroes:external/utils");
var utils;
function init(renderer) {
    parent.init(renderer);
	

}

function initEffects(renderer) {
	var model_chair = renderer.createResource("MODEL", "tgheroes:x_chair");
    model_chair.texture.set("chair");
    chair = renderer.createEffect("fiskheroes:model").setModel(model_chair);
	chair.setOffset (1.0, 4.5, 1.5)
	
    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0xffffff);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
		forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.25;
		return true;
    });
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [-0.5, -6.0, 0.0], "size": [1.0, 1.0] }
    ]);

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [0.5, -6.0, 0.0], "size": [2.0, 2.0],}
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [0.5, -6.0, 0.0], "size": [3.5, 3.5],}
    ]);

    utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:gray_telekinesis");

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.BLOCKING");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");	
	addAnimationWithData(renderer, "psionic.ENERGY_PROJ", "tgheroes:psi_x_blast", "fiskheroes:energy_projection_timer").priority = 4;
    addAnimationWithData(renderer, "psionic.BLOCKING", "tgheroes:psi_x_block", "fiskheroes:shield_blocking_timer").priority = 3;  
    addAnimationWithData(renderer, "psionic.AIMING", "tgheroes:psi_x_blast", "fiskheroes:aiming_timer").priority = 2;
    addAnimationWithData(renderer, "psionic.BLAST", "tgheroes:psi_x_blast", "fiskheroes:beam_shooting_timer").priority = 6;
	addAnimationWithData(renderer, "chair.SEAT", "tgheroes:chair_seat").setData((entity,data) => data.load(entity.getWornChestplate())).priority = 5;			
	addAnimationWithData(renderer, "arms.MOVING", "tgheroes:arms_x").setData((entity,data) => data.load(true)).priority = 1;
// !entity.getData("fiskheroes:beam_shooting") && !entity.getData("fiskheroes:shield_blocking_timer") && !entity.getData("fiskheroes:aiming_timer") && !entity.isPunching()
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "CHESTPLATE" && !entity.as("DISPLAY").isStatic()) {
        chair.render();
    }
}