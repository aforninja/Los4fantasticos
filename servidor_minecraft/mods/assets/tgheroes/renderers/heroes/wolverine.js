extend("fiskheroes:hero_basic");
loadTextures({
	"adamantium_skeleton": "tgheroes:x_men/x_23/adamantium_skeleton",
    "layer1": "tgheroes:x_men/wolverine/wolverine",
	"ears": "tgheroes:x_men/wolverine/wolverine_ears",
	"blank": "tgheroes:blank",
	"logo": "tgheroes:blank",
	"claw": "tgheroes:x_men/x_23/wolverine_claws",
});

var utils = implement("fiskheroes:external/utils");
var helmet;
var helmet2;

function init(renderer) {
	parent.init(renderer);
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm");
	renderer.showModel("LEGGINGS", "rightLeg", "leftLeg");
    renderer.setTexture((entity, renderLayer) => {
		if (entity.getHealth() < 9) {
            return "blank";
        }
		return  "layer1";
    });
}

function initEffects(renderer) {
	
	
	var model_claw = renderer.createResource("MODEL", "tgheroes:wolverine_claws");
	model_claw.bindAnimation("tgheroes:claws").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:blade_timer') ));
    model_claw.texture.set("claw");
    claw = renderer.createEffect("fiskheroes:model").setModel(model_claw);
	claw.anchor.set("leftArm");
	claw.setOffset (6.0, -8.0, 0.0);
	claw.mirror = true;

    var model_logo = renderer.createResource("MODEL", "tgheroes:x_logo");
    model_logo.texture.set("logo", null);
    logo = renderer.createEffect("fiskheroes:model").setModel(model_logo);
    logo.anchor.set("body");
	logo.setOffset (0.0, 0.0, 2.7);
   // logo.setScale(0.7);
	
	helmet = renderer.createEffect("fiskheroes:model");
    helmet.setModel(utils.createModel(renderer, "tgheroes:wolverine_ears", "ears"));
    helmet.anchor.set("head");
	helmet.setScale(1.0);
	helmet.setOffset(3.5, -24.0, -3.0);
	helmet.setRotation(0, -30, 0);
	
	
	helmet2 = renderer.createEffect("fiskheroes:model");
    helmet2.setModel(utils.createModel(renderer, "tgheroes:wolverine_ears", "ears"));
    helmet2.anchor.set("head");
	helmet2.setScale(1.0);
	helmet2.setOffset(-3.5, -24.0, -3.0);
	helmet2.setRotation(0, 30, 0);
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "tgheroes:dyn/doorman_suit");
	
	adamantium_skeleton_head = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_head.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_head", "adamantium_skeleton", null));
    adamantium_skeleton_head.anchor.set("head");
    adamantium_skeleton_head.mirror = false;
	adamantium_skeleton_head.setOffset(0.0, -8.0, 0.0);
	
    adamantium_skeleton_chest = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_chest.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_chest", "adamantium_skeleton", null));
    adamantium_skeleton_chest.anchor.set("body");
    adamantium_skeleton_chest.mirror = false;

    adamantium_skeleton_right_arm = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_right_arm.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_right_arm", "adamantium_skeleton", null));
    adamantium_skeleton_right_arm.anchor.set("rightArm");
    adamantium_skeleton_right_arm.mirror = false;
	adamantium_skeleton_right_arm.setOffset(2.0, -2.0, -1.0);

    adamantium_skeleton_left_arm = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_left_arm.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_left_arm", "adamantium_skeleton", null));
    adamantium_skeleton_left_arm.anchor.set("leftArm");
    adamantium_skeleton_left_arm.mirror = false;
	adamantium_skeleton_left_arm.setOffset(0.0, -2.0, -1.0);

    adamantium_skeleton_right_leg = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_right_leg.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_right_leg", "adamantium_skeleton", null));
    adamantium_skeleton_right_leg.anchor.set("rightLeg");
    adamantium_skeleton_right_leg.mirror = false;
	adamantium_skeleton_right_leg.setOffset(-2.0, 0.0, 0.0);

    adamantium_skeleton_left_leg = renderer.createEffect("fiskheroes:model");
    adamantium_skeleton_left_leg.setModel(utils.createModel(renderer, "tgheroes:adamantium_skeleton_left_leg", "adamantium_skeleton", null));
    adamantium_skeleton_left_leg.anchor.set("leftLeg");
    adamantium_skeleton_left_leg.mirror = false;
	adamantium_skeleton_left_leg.setOffset(2.0, 0.0, 0.0);
	
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;

	

	
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);	

	addAnimation(renderer, "wolverine.CLAWS", "tgheroes:wolverine_claws").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/claws_timer"))).setCondition(entity => entity.motionX() == 0 && entity.motionY() == 0);
	addAnimation(renderer, "wolverine.RUN", "fiskheroes:speedster_sprint").setData((entity, data) => data.load(entity.isSprinting() && entity.getData("fiskheroes:blade") && entity.isOnGround()));
	addAnimation(renderer, "wolverine.JUMP", "tgheroes:wolverine_leap").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/jump_timer"))).setCondition(entity => !entity.isOnGround());
	addAnimation(renderer, "wolverine.land", "tgheroes:wolverine_attack_reverse").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/jump_timer"))).setCondition(entity => entity.isOnGround());
	addAnimationWithData(renderer, "two.PUNCH", "tgheroes:shue_arm_left_punch").setData((entity,data) => data.load(entity.getData("fiskheroes:blade_timer") > 0.3 && entity.isPunching())).priority = 5;			
	utils.addFlightAnimation(renderer, "catwoman.FLIGHT", "tgheroes:wall_crawl");
}

function render(entity, renderLayer, isFirstPersonArm) {


	if (entity.getWornHelmet() && entity.getHealth() > 8) {
		helmet.render();
		helmet2.render()       
    }
    if (entity.getWornChestplate() && entity.getHealth() > 8) {
        logo.render();       
     
    }

		if (entity.getHealth() < 9) {
        adamantium_skeleton_head.render();
        adamantium_skeleton_chest.render();
        adamantium_skeleton_right_arm.render();
        adamantium_skeleton_left_arm.render();
        adamantium_skeleton_right_leg.render();
        adamantium_skeleton_left_leg.render();
		}
	
		
			claw.render();
		
	
	
}
