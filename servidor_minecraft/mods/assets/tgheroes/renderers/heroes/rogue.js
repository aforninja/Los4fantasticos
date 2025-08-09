extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/rogue/rogue_layer1",
	"layer2": "tgheroes:x_men/rogue/rogue_layer2",
	"wing_angel": "tgheroes:x_men/angel/angel_wings",
	"metal": "tgheroes:x_men/rogue/rogue_colosus",
	"tail": "tgheroes:x_men/nightcrawler/tail_nightcrawler",
	"claw": "tgheroes:x_men/rogue/colosus_claws",
	"claw_bone": "tgheroes:x_men/rogue/bone_claw",
	"tail": "tgheroes:x_men/nightcrawler/tail_nightcrawler",
	"night": "tgheroes:x_men/rogue/rogue_crawler",
	"slim_arm": "tgheroes:x_men/rogue/rogue",
	"cape": "tgheroes:x_men/rogue/rogue_hair",
	"diamond_arm": "tgheroes:x_men/rogue/nogloves_slim",
	"cape2": "tgheroes:x_men/rogue/hair_colosus",
	"cape3": "tgheroes:x_men/rogue/rogue_crawler_hair",
	"cape4": "tgheroes:x_men/rogue/hair_ulti"
});

var chest;
var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var speedster_powers = implement("tgheroes:external/speedster_utils");
var metal_heat;
var overlay_metal;
var overlay_night;
var overlay_ulti;
var alexarm_r;
var alexarm_l;
var alexarm_r_no_gloves;
var alexarm_l_no_gloves;
var capes = implement("fiskheroes:external/capes");
var cape;
var cape2;
var cape3;
var cape4;
var eyes = implement("tgheroes:external/rouge_eyes");
var eye;

function initEffects(renderer) {
	var eye_shape = renderer.createResource("SHAPE", "tgheroes:eye");
    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:not_spin_beam");

    eye = eyes.create(renderer, 0xd60068 , eye_shape, beam, "tgheroes:dyn/rogue_all");
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm_r = renderer.createEffect("fiskheroes:model");
    alexarm_r.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm_r.anchor.set("rightArm");
	alexarm_r.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	alexarm_r_no_gloves = renderer.createEffect("fiskheroes:model");
    alexarm_r_no_gloves.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "diamond_arm", null));
    alexarm_r_no_gloves.anchor.set("rightArm");
	alexarm_r_no_gloves.setOffset (-6.0, -2.05, 0.0);

    alexarm_l_no_gloves = renderer.createEffect("fiskheroes:model");
    alexarm_l_no_gloves.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "diamond_arm", null));
    alexarm_l_no_gloves.anchor.set("leftArm");
	alexarm_l_no_gloves.setOffset (5.0, -2.05, 0.0);
	
    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
	
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	
	cape2 = capes.createGlider(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape2.effect.texture.set("cape2");
	
	cape3 = capes.createGlider(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape3.effect.texture.set("cape3");
	
	cape4 = capes.createGlider(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape4.effect.texture.set("cape4");
		
	//ANGEL
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
	//WOLVERINE
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.setCondition(entity => entity.getData("tgheroes:dyn/rogue_x_timer") > 0.5 || entity.getData("tgheroes:dyn/rogue_all_timer") > 0.5);
    night_v.firstPersonOnly = false;
	
	var model_claw = renderer.createResource("MODEL", "tgheroes:wolverine_claws");
	model_claw.bindAnimation("tgheroes:claws").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:blade_timer') ));
    model_claw.texture.set("claw_bone");
	
    claw = renderer.createEffect("fiskheroes:model").setModel(model_claw);
	claw.anchor.set("leftArm");
	claw.setOffset (7.0, -8.0, 0.0);
	claw.mirror = true;
	
	var model_claw_leg = renderer.createResource("MODEL", "tgheroes:x23_claws");
	model_claw_leg.bindAnimation("tgheroes:leg_claws").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:blade_timer') ));
    model_claw_leg.texture.set("claw_bone");
	
	claw_leg = renderer.createEffect("fiskheroes:model").setModel(model_claw_leg);	
	claw_leg.anchor.set("leftLeg");
	claw_leg.mirror = true;
	claw_leg.setOffset (0.0, -6.0, 7.0);	
	claw_leg.setRotation (0.0, 90.0, 0.0);	
	
	
	
	//QUICKSILVER
	speedster.init(renderer, "tgheroes:rogue_trail");
	speedster_powers.init(renderer, "tgheroes:rogue_trail", utils);
	//COLOSUS
	metal_heat = renderer.createEffect("fiskheroes:metal_heat");
    metal_heat.includeEffects(alexarm_l, alexarm_r, chest);
	
    metal_heat.texture.set("metal");

	overlay_metal = renderer.createEffect("fiskheroes:overlay");
    overlay_metal.texture.set("metal");
	//NIGHTCRAWLER
	overlay_night = renderer.createEffect("fiskheroes:overlay");
    overlay_night.texture.set("night");
	var model_tail = renderer.createResource("MODEL", "tgheroes:tail_nightcrawler");
    model_tail.texture.set("tail");
	model_tail.bindAnimation("tgheroes:tail_walk").setData((entity,data) => data.load(entity.getData("fiskheroes:moving") && entity.loop(40)));
    tail = renderer.createEffect("fiskheroes:model").setModel(model_tail);
    tail.anchor.set("body");
	tail.setOffset (0.0, -1.0, -2.0);	
	utils.bindCloud(renderer, "fiskheroes:teleportation", "tgheroes:nightcrawler_teleport");
	//ULTIMATE
	var model_claw_ulti = renderer.createResource("MODEL", "tgheroes:wolverine_claws");
	model_claw_ulti.bindAnimation("tgheroes:claws").setData((entity,data) => data.load(entity.getInterpolatedData("tgheroes:dyn/rogue_all_timer") ));
    model_claw_ulti.texture.set("claw");
	
    claw_ulti = renderer.createEffect("fiskheroes:model").setModel(model_claw_ulti);
	claw_ulti.anchor.set("leftArm");
	claw_ulti.setOffset (7.0, -8.0, 0.0);
	claw_ulti.mirror = true;
	
	var model_claw_ulti_leg = renderer.createResource("MODEL", "tgheroes:x23_claws");
	model_claw_ulti_leg.bindAnimation("tgheroes:leg_claws").setData((entity,data) => data.load(entity.getInterpolatedData("tgheroes:dyn/rogue_all_timer") ));
    model_claw_ulti_leg.texture.set("claw");
	
	claw_ulti_leg = renderer.createEffect("fiskheroes:model").setModel(model_claw_ulti_leg);	
	claw_ulti_leg.anchor.set("leftLeg");
	claw_ulti_leg.mirror = true;
	claw_ulti_leg.setOffset (0.0, -6.0, 7.0);	
	claw_ulti_leg.setRotation (0.0, 90.0, 0.0);	
	
	var chain = utils.bindCloud(renderer, "fiskheroes:telekinesis_chain", "tgheroes:doom_2099_teleport");
    chain.anchor.set("rightArm");
    chain.setOffset(-0.5, 10.0, 0.0);
    chain.setFirstPerson(-4.75, 4.0, -8.5);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:psi_beam", "head", 0xd60068, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [2.0, 2.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
	
	overlay_ulti = renderer.createEffect("fiskheroes:overlay");
    overlay_ulti.texture.set("metal");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	addAnimationWithData(renderer, "storm.BEAM", "fiskheroes:dual_hand_beam", "fiskheroes:beam_charge");
	addAnimationWithData(renderer, "rogue.RUN", "fiskheroes:speedster_sprint").setData((entity,data) =>
	data.load(entity.getData("fiskheroes:speeding") && entity.isSprinting())).priority = 10;	
	addAnimationWithData(renderer, "two.PUNCH", "tgheroes:shue_arm_left_punch").setData((entity,data) =>
	data.load(entity.getData("fiskheroes:blade_timer") > 0.3 && entity.isPunching() || entity.getData("tgheroes:dyn/rogue_all_timer") > 0.3 && entity.isPunching())).priority = 5;	
	utils.addFlightAnimation(renderer, "wings.FLIGHT", "fiskheroes:flight/propelled_hands.anim.json");
    utils.addHoverAnimation(renderer, "wings.HOVER", "fiskheroes:flight/idle/propelled_hands");
	utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
	addAnimationWithData(renderer, "wings.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
	addAnimation(renderer, "rogue.GLOVES", "tgheroes:gloves_off")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("tgheroes:dyn/mask_open_timer");
            data.load(f < 1 ? f : 0);
        });

}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") < 0.23) {
        alexarm_r.render();
        alexarm_l.render();
	} 
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") > 0.23 && entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") < 0.66) {
        alexarm_r_no_gloves.render();
        alexarm_l.render();
	} 
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/mask_open_timer") > 0.66) {
        alexarm_r_no_gloves.render();
        alexarm_l_no_gloves.render();
	}

	
		if (!isFirstPersonArm && !entity.getData("tgheroes:dyn/rogue_night") && !entity.getData("tgheroes:dyn/rogue_all") && !entity.getData("tgheroes:dyn/rogue_colos") && renderLayer == "CHESTPLATE") {
			cape.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}
		if (!isFirstPersonArm && !entity.getData("tgheroes:dyn/rogue_night") && !entity.getData("tgheroes:dyn/rogue_all") && entity.getData("tgheroes:dyn/rogue_colos") && renderLayer == "CHESTPLATE") {
			cape2.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}	
		if (!isFirstPersonArm && entity.getData("tgheroes:dyn/rogue_night") && !entity.getData("tgheroes:dyn/rogue_all") && !entity.getData("tgheroes:dyn/rogue_colos") && renderLayer == "CHESTPLATE") {
			cape3.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}	
		if (!isFirstPersonArm && !entity.getData("tgheroes:dyn/rogue_night") && entity.getData("tgheroes:dyn/rogue_all") && !entity.getData("tgheroes:dyn/rogue_colos") && renderLayer == "CHESTPLATE") {
			cape4.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}
	
	if (entity.getData("tgheroes:dyn/rogue_night") || entity.getData("tgheroes:dyn/rogue_all")) {
        tail.render();
		}
		overlay_night.opacity = entity.getData("tgheroes:dyn/rogue_night");
        overlay_night.render();	
    
	if (renderLayer == "HELMET" || renderLayer == "CHESTPLATE" || renderLayer == "LEGGINGS" || renderLayer == "BOOTS") {
		metal_heat.opacity = entity.getInterpolatedData("fiskheroes:metal_heat");
        metal_heat.render();
		overlay_metal.opacity = entity.getData("tgheroes:dyn/rogue_colos");
        overlay_metal.render();
	}	
    if (renderLayer == "CHESTPLATE") {
        chest.render();
    }	

	if (entity.getData("tgheroes:dyn/rogue_angel") || entity.getData("tgheroes:dyn/rogue_all")) {
        if (renderLayer == "CHESTPLATE") {	
			wings.render();
		}
    }	
	//WOLVERINE
				if (entity.getInterpolatedData("tgheroes:dyn/rogue_x")){
					claw.render();
					claw_leg.render();
			
			}		

	//ULTIMATE
			if (entity.getInterpolatedData("tgheroes:dyn/rogue_all_timer")){
			eye.render(entity, isFirstPersonArm);
			claw_ulti.render();
			claw_ulti_leg.render();
			
			}
			
			overlay_ulti.opacity = entity.getData("tgheroes:dyn/rogue_all");
			overlay_ulti.render();
	

	
}
