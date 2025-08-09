extend("fiskheroes:hero_basic");
loadTextures({
	"layer0": "tgheroes:fantastic_4/mr_fantastic/f4_fantastic_no_arms",
	"no_legs": "tgheroes:fantastic_4/mr_fantastic/f4_fantastic_no_legs",
	"no_legs_no_arms": "tgheroes:fantastic_4/mr_fantastic/f4_fantastic_no_legs_no_arms",
    "blank": "tgheroes:blank",
    "full": "tgheroes:fantastic_4/mr_fantastic/f4_fantastic",
	"arm": "tgheroes:fantastic_4/mr_fantastic/arm_f4",
	"hammer_hand": "tgheroes:fantastic_4/mr_fantastic/hammer_hand_black",
	"fist": "tgheroes:fantastic_4/mr_fantastic/hand_f4",
	"parachute": "tgheroes:fantastic_4/mr_fantastic/parachute",
	"f4_ball": "tgheroes:fantastic_4/mr_fantastic/f4_ball",
	"light": "tgheroes:blank",
	"light_body": "tgheroes:blank",
	"light_body_arm": "tgheroes:blank",
	"light_body_leg": "tgheroes:blank",
	"ball_light": "tgheroes:blank",
	"parash_light": "tgheroes:blank",
});

var utils = implement("fiskheroes:external/utils");
var overlay;
var overlay_light;
var overlay_light_arm;
var overlay_light_leg;
var overlay_light_arm_leg;
var arm_r;
var arm_l;

var leg_l;


function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
		if (!entity.getData("tgheroes:dyn/ball_timer") > 0 && !entity.getData("tgheroes:dyn/jump_timer") > 0) {
            return "layer0";
        }
		else if (!entity.getData("tgheroes:dyn/ball_timer") > 0 && entity.getData("tgheroes:dyn/jump_timer") > 0 && !entity.getData("fiskheroes:tentacles")) {
            return "no_legs";
        }
		else if (!entity.getData("tgheroes:dyn/ball_timer") > 0 && entity.getData("tgheroes:dyn/jump_timer") > 0 && entity.getData("fiskheroes:tentacles")) {
            return "no_legs_no_arms";
        }
        return "blank";
    });
}


function initEffects(renderer) {
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:no_beam", "rightArm", 0xFFFFFF, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 0);
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:no_beam", "leftArm", 0xFFFFFF, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 1);
	
	overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set("full", null);

	overlay_light = renderer.createEffect("fiskheroes:overlay");
    overlay_light.texture.set(null, "light_body");

	overlay_light_arm = renderer.createEffect("fiskheroes:overlay");
    overlay_light_arm.texture.set(null, "light_body_arm");

	overlay_light_leg = renderer.createEffect("fiskheroes:overlay");
    overlay_light_leg.texture.set(null, "light_body_leg");

	overlay_light_arm_leg = renderer.createEffect("fiskheroes:overlay");
    overlay_light_arm_leg.texture.set(null, "light");
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	
	arm_r = renderer.createEffect("fiskheroes:model");
    arm_r.setModel(utils.createModel(renderer, "tgheroes:steve_right_arm", "full", "light"));
    arm_r.anchor.set("rightArm");
	arm_r.setOffset (7.0, -2.05, 0.0);

    arm_l = renderer.createEffect("fiskheroes:model");
    arm_l.setModel(utils.createModel(renderer, "tgheroes:steve_left_arm", "full", "light"));
    arm_l.anchor.set("leftArm");
	arm_l.setOffset (-7.0, -2.05, 0.0);
	
	
	var model_leg_r = renderer.createResource("MODEL", "tgheroes:steve_right_leg");
    model_leg_r.texture.set("full", "light");
    leg_r = renderer.createEffect("fiskheroes:model").setModel(model_leg_r);
    leg_r.anchor.set("rightLeg");
	
	leg_l = renderer.createEffect("fiskheroes:model");
    leg_l.setModel(utils.createModel(renderer, "tgheroes:steve_left_leg", "full", "light"));
    leg_l.anchor.set("leftLeg");
	
	var arm = utils.createModel(renderer, "tgheroes:arm_f4", "arm");
	var stretchfist = utils.createModel(renderer, "tgheroes:hand_f4", "fist");
	var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
        { "offset": [2.0, -2.5, 0.0], "direction": [20.0, 0.0, -0.0] },
        { "offset": [-2.0, -2.5, 0.0], "direction": [-20.0, 0.0, -0.0] }
    ]);
    tentacles.anchor.set("body");
    tentacles.setSegmentModel(arm);
	tentacles.setHeadModel(stretchfist);
    tentacles.segmentLength = 4.0;
    tentacles.segments = 12;

	var model_hammer_hand = renderer.createResource("MODEL", "tgheroes:hammer_hand");
    model_hammer_hand.texture.set("hammer_hand");
    hammer_hand = renderer.createEffect("fiskheroes:model").setModel(model_hammer_hand);
    hammer_hand.anchor.set("rightArm");
    hammer_hand.setRotation(0, 180, 0);
			
	var model_parachute = renderer.createResource("MODEL", "tgheroes:parachute");
    model_parachute.texture.set("parachute", "parash_light");
    parachute = renderer.createEffect("fiskheroes:model").setModel(model_parachute);
    parachute.anchor.set("body");
	
	var model_f4_ball = renderer.createResource("MODEL", "tgheroes:f4_ball");
    model_f4_ball.texture.set("f4_ball", "ball_light");
	model_f4_ball.bindAnimation("tgheroes:f4_ball_spin").setData((entity,data) => data.load(entity.getInterpolatedData("tgheroes:dyn/move_timer")*2));
    f4_ball = renderer.createEffect("fiskheroes:model").setModel(model_f4_ball);
    
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	
	addAnimationWithData(renderer, "beting.AIMING", "tgheroes:aiming_fpcorr2", "fiskheroes:aiming_timer");	
	
	addAnimationWithData(renderer, "parash.ARMS", "tgheroes:parash_arms", "tgheroes:dyn/parash_timer");  
	
	addAnimationWithData(renderer, "ball.BODY", "tgheroes:bubble_f4", "tgheroes:dyn/ball_timer");  
	
	addAnimationWithData(renderer, "umbrella.GLIDE", "tgheroes:fantastic_glide", "fiskheroes:wing_animation_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
	
	overlay.opacity = !entity.getData("tgheroes:dyn/parash_timer") && !entity.getData("fiskheroes:tentacles") && entity.getData("tgheroes:dyn/ball_timer") < 0.95 
	&& !entity.getData("fiskheroes:aiming") && !entity.getData("tgheroes:dyn/jump_timer");
	overlay.render();
	
	if (entity.getData("tgheroes:dyn/ball_timer") < 0.5 ){	
	overlay_light.render();
	}

	if (entity.getData("tgheroes:dyn/parash_timer") < 0.05 && entity.getData("fiskheroes:aiming") < 0.05 && entity.getData("tgheroes:dyn/ball_timer") < 0.5 && !entity.getData("fiskheroes:tentacles")){	
		overlay_light_arm.render();
	}

	if (entity.getData("tgheroes:dyn/jump_timer") < 0.05 && entity.getData("tgheroes:dyn/ball_timer") < 0.5 ){	
		overlay_light_leg.render();
	}

	if (entity.getData("tgheroes:dyn/jump_timer") < 0.05 && entity.getData("tgheroes:dyn/parash_timer") < 0.05 
	&& entity.getData("fiskheroes:aiming") < 0.05 && entity.getData("tgheroes:dyn/ball_timer") < 0.5 && !entity.getData("fiskheroes:tentacles")){	
		overlay_light_arm_leg.render();
	}

	if (entity.getData("tgheroes:dyn/parash_timer") > 0.95 ){
		parachute.render();
	}
	
	if (entity.getData("tgheroes:dyn/ball_timer") > 0 ){
		var bl1 = entity.getInterpolatedData("tgheroes:dyn/ball_timer");
		
		f4_ball.setScale((bl1 ? 1.6 * bl1 : 0.2), (bl1 ? 1.6 * bl1 : 0.2), (bl1 ? 1.6 * bl1 : 0.2));	
		f4_ball.setOffset (0.0, (bl1 ? -14.0 * bl1 : 0.0), 0.0);
		f4_ball.render();
	}
	
	
		
	
	if (entity.getData("tgheroes:dyn/parash_timer") > 0 && entity.getData("tgheroes:dyn/parash_timer") < 0.95 ){
		
		var pt = entity.getInterpolatedData("tgheroes:dyn/parash_timer");
		
		arm_r.setScale(1, (pt ? 4.0 * pt : 1.0), 1);		
		arm_r.render();
		
		arm_l.setScale(1, (pt ? 4.0 * pt : 1.0), 1);		
        arm_l.render();
	}
	
	if (!entity.getData("tgheroes:dyn/ball_timer") > 0 && entity.getData("tgheroes:dyn/jump_timer")){
		
		var jt = entity.getInterpolatedData("tgheroes:dyn/jump_timer");
		
		leg_l.setScale(1, (jt ? 2.0 * jt : 1.0), 1);		
		leg_l.setOffset (-2.0, (-24.0 * jt), 0.0);
		leg_l.render();			
		
		leg_r.setScale(1, (2.0 * jt), 1);		
		leg_r.setOffset (2.0, (-24.0 * jt), 0.0);
        leg_r.render();
	}

	
		var aim2 = entity.getInterpolatedData("tgheroes:dyn/mf_rarm");		
		arm_r.setScale(1, (aim2 ? 15.0 * aim2 * entity.getData("fiskheroes:energy_projection_timer") : 1.0), 1);		
		
		var aim = entity.getInterpolatedData("tgheroes:dyn/mf_larm");		
		arm_l.setScale(1, (aim ? 15.0 * aim * entity.getData("fiskheroes:energy_projection_timer") : 1.0), 1);		
		
	if (entity.getData("fiskheroes:aiming")) {
		arm_r.render();			
        arm_l.render();
	}
	

        if (entity.getData("fiskheroes:blade_timer")) {
			var blade = entity.getInterpolatedData("fiskheroes:blade_timer");
            
			hammer_hand.setOffset(1.0, -18.0 * blade, 0.0);			
            hammer_hand.setScale((1.25 * blade), (1.25 * blade), (1.25 * blade));	
            hammer_hand.render();
        }
	
}