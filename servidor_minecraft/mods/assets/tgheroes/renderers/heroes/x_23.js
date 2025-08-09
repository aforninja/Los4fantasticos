extend("fiskheroes:hero_basic");
loadTextures({
	"adamantium_skeleton": "tgheroes:x_men/x_23/adamantium_skeleton",
    "layer": "tgheroes:x_men/x_23/x_23_layer",
    "slim_arm": "tgheroes:x_men/x_23/x_23",
	"ears": "tgheroes:blank",
	"cape": "tgheroes:x_men/x_23/x_23_hair",
	"claw": "tgheroes:x_men/x_23/wolverine_claws",
	"blank": "tgheroes:blank"
});

var utils = implement("fiskheroes:external/utils");
var claw;
var claw2;
var chest;
var capes = implement("fiskheroes:external/capes");
var cape;
var helmet;
var helmet2;
var alexarm;
var alexarm_l;

function init(renderer) {
	parent.init(renderer);
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm");
	renderer.showModel("LEGGINGS", "rightLeg", "leftLeg");
    renderer.setTexture((entity, renderLayer) => {
		if (entity.getHealth() < 8) {
            return "blank";
        }
		return  "layer";
    });
}

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
		var activate = entity.getInterpolatedData("tgheroes:dyn/killer");
        return entity.getInterpolatedData("tgheroes:dyn/killer") ? 1 - 0.4 * activate : entity.isAlive() ? 0.995 : 1;
    });


	var model_claw = renderer.createResource("MODEL", "tgheroes:x23_claws");
	model_claw.bindAnimation("tgheroes:claws").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:blade_timer') ));
    model_claw.texture.set("claw");
    
	
	claw = renderer.createEffect("fiskheroes:model").setModel(model_claw);
	claw.anchor.set("leftArm");
	claw.setOffset (7.0, -8.0, 1.0);
	claw.mirror = true;
	
	claw2 = renderer.createEffect("fiskheroes:model").setModel(model_claw);
	claw2.anchor.set("leftArm");
	claw2.setOffset (7.0, -8.0, -1.0);
	claw2.mirror = true;
	
	var model_claw_leg = renderer.createResource("MODEL", "tgheroes:x23_claws");
	model_claw_leg.bindAnimation("tgheroes:leg_claws").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:blade_timer') ));
    model_claw_leg.texture.set("claw");
	claw_leg = renderer.createEffect("fiskheroes:model").setModel(model_claw_leg);	
	claw_leg.anchor.set("leftLeg");
	claw_leg.mirror = true;
	claw_leg.setOffset (0.0, -6.0, 7.0);	
	claw_leg.setRotation (0.0, 90.0, 0.0);	
	
	
	
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	helmet = renderer.createEffect("fiskheroes:model");
    helmet.setModel(utils.createModel(renderer, "tgheroes:wolverine_ears", "ears"));
    helmet.anchor.set("head");
	helmet.setOffset(3.5, -24.0, -3.0);
	helmet.setRotation(0, -30, 0);
	
	
	helmet2 = renderer.createEffect("fiskheroes:model");
    helmet2.setModel(utils.createModel(renderer, "tgheroes:wolverine_ears", "ears"));
    helmet2.anchor.set("head");
	helmet2.setOffset(-3.5, -24.0, -3.0);
	helmet2.setRotation(0, 30, 0);
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
		
	adamantium_skeleton_head = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_head.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_head", "adamantium_skeleton", null));
    adamantium_skeleton_head.anchor.set("head");
    adamantium_skeleton_head.mirror = false;
	adamantium_skeleton_head.setOffset(0.0, -8.0, 0.0);
	adamantium_skeleton_head.setScale(0.9); 
	
    adamantium_skeleton_chest = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_chest.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_chest", "adamantium_skeleton", null));
    adamantium_skeleton_chest.anchor.set("body");
    adamantium_skeleton_chest.mirror = false;
    adamantium_skeleton_chest.setScale(0.9); 

    adamantium_skeleton_right_arm = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_right_arm.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_right_arm", "adamantium_skeleton", null));
    adamantium_skeleton_right_arm.anchor.set("rightArm");
    adamantium_skeleton_right_arm.mirror = false;
	adamantium_skeleton_right_arm.setOffset(1.0, -2.0, -1.0);
	adamantium_skeleton_right_arm.setScale(0.9); 

    adamantium_skeleton_left_arm = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_left_arm.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_left_arm", "adamantium_skeleton", null));
    adamantium_skeleton_left_arm.anchor.set("leftArm");
    adamantium_skeleton_left_arm.mirror = false;
	adamantium_skeleton_left_arm.setOffset(1.0, -2.0, -1.0);
	adamantium_skeleton_left_arm.setScale(0.9); 

    adamantium_skeleton_right_leg = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_right_leg.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_right_leg", "adamantium_skeleton", null));
    adamantium_skeleton_right_leg.anchor.set("rightLeg");
    adamantium_skeleton_right_leg.mirror = false;
	adamantium_skeleton_right_leg.setOffset(-2.0, 0.0, 0.0);
	adamantium_skeleton_right_leg.setScale(0.9); 

    adamantium_skeleton_left_leg = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_left_leg.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_left_leg", "adamantium_skeleton", null));
    adamantium_skeleton_left_leg.anchor.set("leftLeg");
    adamantium_skeleton_left_leg.mirror = false;
	adamantium_skeleton_left_leg.setOffset(2.0, 0.0, 0.0);
	adamantium_skeleton_left_leg.setScale(0.9); 
	
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);

	
	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);	
	utils.addFlightAnimation(renderer, "x_23.CRAWL", "tgheroes:wall_crawl");
	utils.addAnimationEvent(renderer, "CEILING_CRAWL", "fiskheroes:crawl_ceiling");	
	
    addAnimation(renderer, "wolverine.CLAWS", "tgheroes:wolverine_claws").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/claws_timer"))).setCondition(entity => entity.motionX() == 0 && entity.motionY() == 0);
	addAnimation(renderer, "wolverine.RUN", "fiskheroes:speedster_sprint").setData((entity, data) => data.load(entity.isSprinting() && entity.getData("fiskheroes:blade") && entity.isOnGround()));
	addAnimation(renderer, "wolverine.JUMP", "tgheroes:wolverine_leap").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/jump_timer"))).setCondition(entity => !entity.isOnGround());
	addAnimation(renderer, "wolverine.land", "tgheroes:wolverine_attack_reverse").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/jump_timer"))).setCondition(entity => entity.isOnGround());
	addAnimationWithData(renderer, "two.PUNCH", "tgheroes:shue_arm_left_punch").setData((entity,data) => data.load(entity.getData("fiskheroes:blade_timer") > 0.3 && entity.isPunching())).priority = 5;			
}

function render(entity, renderLayer, isFirstPersonArm) {
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getHealth() > 8) {
        alexarm.render();
        alexarm_l.render();
    }
		
	if (entity.getWornHelmet() && entity.getHealth() > 8) {
		cape.render(entity);
		helmet.render();
		helmet2.render();
    }
	
        adamantium_skeleton_head.render();
        adamantium_skeleton_chest.render();
        adamantium_skeleton_right_arm.render();
        adamantium_skeleton_left_arm.render();
        adamantium_skeleton_right_leg.render();
        adamantium_skeleton_left_leg.render();
    
	
	
			chest.render();
	
			claw.render();
			claw2.render();
			
			claw_leg.render();
			
	
	
}