extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/scarlet_witch/wanda_layer1",
    "layer2": "tgheroes:x_men/scarlet_witch/wanda_layer2",
	"shadowdome": "tgheroes:x_men/scarlet_witch/area_of_chaos",
	"slim_arm": "tgheroes:x_men/scarlet_witch/witch_slim",
	"cape": "tgheroes:x_men/scarlet_witch/scarlet_witch_cape",
	"lights_eyes": "tgheroes:x_men/scarlet_witch/scarlet_eyes",
	"darkhold": "tgheroes:x_men/scarlet_witch/darkhold",
	"coat": "tgheroes:blank",

});

var magic;
var magic2;
var magic3;
var magic4;
var chest;
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var cape;
var alexarm;
var alexarm_l;

function init(renderer) {
	parent.init(renderer);
	renderer.setLights((entity, renderLayer) => {
        if (entity.getData("tgheroes:dyn/chaos_timer") == 1) {
            return renderLayer == "HELMET" ? "lights_eyes" : "lights_eyes";
        }
        return renderLayer == "CHESTPLATE" ? null : null;
    });
}

function initEffects(renderer) {
	utils.bindParticles(renderer, "tgheroes:scarlet_witch_flight").setCondition(entity => entity.getData("fiskheroes:flying"));
	
    utils.bindParticles(renderer, "tgheroes:chaos_arm").setCondition(entity => entity.getData("tgheroes:dyn/no_mutants_timer") > 0.3 
	&& entity.getData("tgheroes:dyn/no_mutants_timer") < 0.9 && entity.getData("tgheroes:dyn/no_mutants"));
	
	
	utils.bindCloud(renderer, "fiskheroes:teleportation", "tgheroes:chaos");
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
    var model_coat = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat.texture.set("coat");
    model_coat.generateMirror();
    coat = renderer.createEffect("fiskheroes:model").setModel(model_coat);
    coat.anchor.set("rightLeg");
	coat.setOffset (-1.8, -13.0, 0.25);
	coat.setScale (1.05);
    coat.mirror = true;
	
	var shadowdome = renderer.bindProperty("fiskheroes:shadowdome");
	shadowdome.texture.set(null, "shadowdome");
	shadowdome.setShape(36, 36);
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
		
		
	var magic_x = renderer.bindProperty("fiskheroes:spellcasting");
    magic_x.colorEarthCrack.set(0xff242a);
    magic_x.colorAtmosphere.set(0xff242a);

	var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0x76181a);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.9;
        return true;
    });
	
	var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:chaos_beam");
	
	var beam2 = renderer.createResource("BEAM_RENDERER", "tgheroes:witch_beam");
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam2, "rightArm", 0xff242a, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/chaos_timer") == 0);
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam, "rightArm", 0xff242a, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/chaos_timer") == 1);
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", beam2, "rightArm", 0xff242a, [
         { "firstPerson": [-3.75, 3.0, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [2.0, 2.0], "anchor": "rightArm" }
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", beam, "body", 0xff242a, [
        { "firstPerson": [-3.75, 3.0, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [2.0, 2.0], "anchor": "rightArm" }
    ]);
	
	
    magic = utils.createLines(renderer, beam2, 0x76181a, [
        {"start": [0, 0.8, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 8.0]},
    ]);
    magic.setOffset(-0.5, 8.0, 0.0).setScale(3.3);
    magic.anchor.set("leftArm");
    magic.mirror = true;
	
	magic2 = utils.createLines(renderer, beam2, 0xff0000, [
    {"start": [0, 0.8, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 8.0]},
    ]);
    magic2.setOffset(0.5, 8.0, 0.0).setScale(3.3);
    magic2.anchor.set("rightArm");
    magic2.mirror = true; 
	
	magic3 = utils.createLines(renderer, beam, 0x76181a, [
        {"start": [0, 0.8, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 8.0]},
    ]);
    magic3.setOffset(-0.5, 8.0, 0.0).setScale(3.3);
    magic3.anchor.set("leftArm");
    magic3.mirror = true;
	
	magic4 = utils.createLines(renderer, beam, 0xff0000, [
    {"start": [0, 0.8, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 8.0]},
    ]);
    magic4.setOffset(0.5, 8.0, 0.0).setScale(3.3);
    magic4.anchor.set("rightArm");
    magic4.mirror = true;
	
	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:chaos_telekinesis");
	
    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);

	initEquipped(renderer);	
}

function initEquipped(renderer) {

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.75, "offset": [10.0, -6.0, 4.0], "rotation": [0.0, 0.0, 36.25] }
    ]).slotIndex = 0;
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	addAnimationWithData(renderer, "wanda.STAND", "tgheroes:darkhold", "tgheroes:dyn/stand");	
    utils.addFlightAnimation(renderer, "magic1.FLIGHT", "fiskheroes:flight/propelled_hands.anim.json");
    utils.addHoverAnimation(renderer, "magic1.HOVER", "fiskheroes:flight/idle/propelled_hands");
    addAnimationWithData(renderer, "no_mutants.AOE", "tgheroes:no_more_mutants", "tgheroes:dyn/no_mutants_timer").setCondition(entity => entity.getData("tgheroes:dyn/no_mutants"));
	
	 renderer.removeCustomAnimation("basic.BLOCKING");
    addAnimationWithData(renderer, "wanda.BLOCKING", "tgheroes:star_pose", "fiskheroes:shield_blocking_timer");


}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }
		coat.render();
	
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        chest.render();
    }
	
	if (renderLayer == "CHESTPLATE" && entity.getData("tgheroes:dyn/chaos_timer") == 0) {
	magic.progress = entity.getInterpolatedData("fiskheroes:energy_projection") || 
	entity.getInterpolatedData("fiskheroes:aiming") || entity.getInterpolatedData("fiskheroes:flying") ||
	entity.getInterpolatedData("fiskheroes:shield") || entity.getInterpolatedData("fiskheroes:spell_fraction");
	magic.render();
	
	magic2.progress = entity.getInterpolatedData("fiskheroes:energy_projection") || 
	entity.getInterpolatedData("fiskheroes:aiming") || entity.getInterpolatedData("fiskheroes:flying") ||
	entity.getInterpolatedData("fiskheroes:shield") || entity.getInterpolatedData("fiskheroes:spell_fraction");
	magic2.render();
		
    }
	
	if (renderLayer == "CHESTPLATE" && entity.getData("tgheroes:dyn/chaos_timer") == 1) {
	magic3.progress = entity.getInterpolatedData("fiskheroes:energy_projection") || 
	entity.getInterpolatedData("fiskheroes:aiming") || entity.getInterpolatedData("fiskheroes:flying") ||
	entity.getInterpolatedData("fiskheroes:shield") || entity.getInterpolatedData("fiskheroes:spell_fraction");
	magic3.render();
	
	magic4.progress = entity.getInterpolatedData("fiskheroes:energy_projection") || 
	entity.getInterpolatedData("fiskheroes:aiming") || entity.getInterpolatedData("fiskheroes:flying") ||
	entity.getInterpolatedData("fiskheroes:shield") || entity.getInterpolatedData("fiskheroes:spell_fraction");
	magic4.render();
		
    }
	
	cape.render(entity);
	
	
}
