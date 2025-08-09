extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/emma_frost/emma_layer1",
	"slim_arm": "tgheroes:x_men/emma_frost/emma_frost_slim",
	"diamond": "tgheroes:x_men/emma_frost/emma_frost_diamond",
	"diamond_arm": "tgheroes:x_men/emma_frost/emma_frost_diamond_slim",
	"cape": "tgheroes:x_men/emma_frost/emma_frost_cape",
	"cape2": "tgheroes:x_men/emma_frost/emma_frost_diamond_cape",
	"hair": "tgheroes:blank",
	"hair_d": "tgheroes:blank",
	"tapes": "tgheroes:blank",
	"coat": "tgheroes:blank",
	"x_logo": "tgheroes:blank",
});

var chest;
var utils = implement("fiskheroes:external/utils");
var utils;
var logo;
var alexarm;
var alexarm_l;
var capes = implement("fiskheroes:external/capes");
var cape;
var cape2;

function init(renderer) {
	parent.init(renderer);
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm");
	renderer.showModel("LEGGINGS", "rightLeg", "leftLeg");
    renderer.setTexture((entity, renderLayer) => {
        if (entity.getInterpolatedData("tgheroes:dyn/diamond_timer") > 0.65) {
            return "diamond";
        }
		return  "layer1";
    });
}

function initEffects(renderer) {
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;

    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set("diamond");

	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:gray_telekinesis");

	
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	
	cape2 = capes.createGlider(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape2.effect.texture.set("cape2");
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	
	logo = renderer.createEffect("fiskheroes:model");
    logo.setModel(utils.createModel(renderer, "tgheroes:x_logo_small_shoulder", "x_logo", null));
    logo.anchor.set("leftArm");
	logo.setOffset (5.0, -2.05, 0.0);
    logo.mirror = true;
	
	hair = renderer.createEffect("fiskheroes:model");
    hair.setModel(utils.createModel(renderer, "tgheroes:hair", "hair", null));
    hair.anchor.set("head");
	//hair.setOffset (5.0, -2.05, 0.0);
	
	hair_d = renderer.createEffect("fiskheroes:model");
    hair_d.setModel(utils.createModel(renderer, "tgheroes:hair", "hair_d", null));
    hair_d.anchor.set("head");
	//hair_d.setOffset (5.0, -2.05, 0.0);
	
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	alexarm_d = renderer.createEffect("fiskheroes:model");
    alexarm_d.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "diamond_arm", null));
    alexarm_d.anchor.set("rightArm");
	alexarm_d.setOffset (-6.0, -2.05, 0.0);

    alexarm_l_d = renderer.createEffect("fiskheroes:model");
    alexarm_l_d.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "diamond_arm", null));
    alexarm_l_d.anchor.set("leftArm");
	alexarm_l_d.setOffset (5.0, -2.05, 0.0);

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

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [0.5, -6.0, 0.0], "size": [2.0, 2.0],}
    ]);

	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	
	var model_coat = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat.texture.set("coat");
    model_coat.generateMirror();
    coat = renderer.createEffect("fiskheroes:model").setModel(model_coat);
    coat.anchor.set("rightLeg");
	coat.setOffset (-1.8, -13.0, 0.25);
	coat.setScale (1.05);
    coat.mirror = true;
	
	var model_tapes = renderer.createResource("MODEL", "tgheroes:tapes");
    model_tapes.texture.set("tapes");
    model_tapes.generateMirror();
    tapes = renderer.createEffect("fiskheroes:model").setModel(model_tapes);
    tapes.anchor.set("body");
	
	//tapes.setOffset (-2.0, -13.5, 0.5);
	//tapes.setScale (1.1);

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.BLOCKING");
    addAnimationWithData(renderer, "psionic.BLOCKING", "tgheroes:psi_blast", "fiskheroes:shield_blocking_timer");    
    addAnimationWithData(renderer, "psionic.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "psionic.BLAST", "tgheroes:psi_beam", "fiskheroes:beam_shooting_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
		chest.render();
		coat.render();
		logo.render();
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && !entity.getInterpolatedData("tgheroes:dyn/diamond")) {
        alexarm.render();
        alexarm_l.render();
        hair.render();
    }
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        var moving = entity.getData("fiskheroes:moving");
		tapes.setOffset (0.0, (moving ? 3.0 * moving : 0.0), (moving ? -7.0 * moving : 1.0));
		tapes.setRotation( (moving ? 45.0 * moving : 0.0), 0, 0);	
        tapes.render();	
        overlay.opacity = entity.getInterpolatedData("tgheroes:dyn/diamond_timer");
        overlay.render();
    }

	
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/diamond")) {
        alexarm_d.render();
        alexarm_l_d.render();
        hair_d.render();
		
    }
	

	
	if (!isFirstPersonArm && !entity.getData("tgheroes:dyn/diamond") && renderLayer == "CHESTPLATE") {
			cape.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}
		if (!isFirstPersonArm && entity.getData("tgheroes:dyn/diamond") && renderLayer == "CHESTPLATE") {
			cape2.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}	
}