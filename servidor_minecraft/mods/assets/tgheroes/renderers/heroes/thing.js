extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:blank",
	"stand": "tgheroes:fantastic_4/thing/thing_smol",
	"big": "tgheroes:fantastic_4/thing/thing_f4",
	"coat": "tgheroes:blank",
    "stone": "tgheroes:fantastic_4/thing/throw_stone",
});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
		if (entity.as("DISPLAY").isStatic()) {
            return "stand";
        }
        return "layer1";
    });

    renderer.showModel("LEGGINGS", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("LEGGINGS");
}


function initEffects(renderer) {
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:thund", "head", 0xcccccc, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, -6.15, -4.0], "size": [3.0, 3.0] }
    ]);
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer"); 
	
	utils.addCameraShake(renderer, 0.001, 0.75, "fiskheroes:beam_shooting_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.getInterpolatedData("fiskheroes:energy_projection_timer") > 0 ? entity.getInterpolatedData("fiskheroes:energy_projection_timer") 
		: entity.getInterpolatedData("fiskheroes:energy_projection_timer") ? 0 : entity.getData("fiskheroes:dyn/superhero_landing_timer") ? 0.999 : 0;
        return true;
    });
    shake.intensity = 0.0;
	

    // STONE
    var model_stone = renderer.createResource("MODEL", "tgheroes:throw");
    model_stone.texture.set("stone");
    model_stone.bindAnimation("tgheroes:stone_before").setData((entity,data) => {
        var timer = entity.getInterpolatedData('tgheroes:dyn/stone_timer')
        var dataS = entity.getData('tgheroes:dyn/stone')
        data.load(0, timer > 0.1  && timer < 0.3 && dataS ? timer >= 0.13 ? 1 : (timer - 0.06) * 15 : 0);
        data.load(1, timer > 0.3 && dataS ? timer - 0.12 : 0);
        data.load(2, entity.getInterpolatedData('tgheroes:dyn/y'))
        data.load(3, timer > 0.75 ? timer - 0.75 : 0)
        // data.load(4, entity.getInterpolatedData('tgheroes:dyn/z'))
        // data.load(4, entity.getInterpolatedData('tgheroes:dyn/x'))
    });
    // model_stone.bindAnimation("tgheroes:stone_after").setData((entity,data) => {
    // });
    stone = renderer.createEffect("fiskheroes:model").setModel(model_stone);
    stone.anchor.set("rightLeg");
	stone.setOffset(-3, 20, -9);
	stone.setScale(0.5);
	
	//THING
	var model_thing_head = renderer.createResource("MODEL", "tgheroes:thing_head");
    model_thing_head.texture.set("big");
    thing_head = renderer.createEffect("fiskheroes:model").setModel(model_thing_head);
    thing_head.anchor.set("head");
	thing_head.setOffset(0, 5, 0);
	thing_head.setScale(0.9); 
	
    var model_thing_body = renderer.createResource("MODEL", "tgheroes:thing_body");
    model_thing_body.texture.set("big");
    thing_body = renderer.createEffect("fiskheroes:model").setModel(model_thing_body);
    thing_body.anchor.set("body");
	thing_body.setOffset(0, 3, 0);
	thing_body.setScale(0.9); 
	
    var model_thing_rightArm = renderer.createResource("MODEL", "tgheroes:thing_r_arm");
    model_thing_rightArm.texture.set("big");
    thing_rightArm = renderer.createEffect("fiskheroes:model").setModel(model_thing_rightArm);
    thing_rightArm.anchor.set("leftArm");
	thing_rightArm.setOffset(8, 3, -1);
	thing_rightArm.setScale(0.9);  

    var model_thing_leftArm = renderer.createResource("MODEL", "tgheroes:thing_l_arm");
    model_thing_leftArm.texture.set("big");
    thing_leftArm = renderer.createEffect("fiskheroes:model").setModel(model_thing_leftArm);
    thing_leftArm.anchor.set("rightArm");
	thing_leftArm.setOffset(-8, 3, -1);
	thing_leftArm.setScale(0.9); 
	
	var model_thing_rightLeg = renderer.createResource("MODEL", "tgheroes:thing_r_leg");
    model_thing_rightLeg.texture.set("big");
    thing_rightLeg = renderer.createEffect("fiskheroes:model").setModel(model_thing_rightLeg);
    thing_rightLeg.anchor.set("leftLeg");
	thing_rightLeg.setOffset(2, -9.5, 0);
	thing_rightLeg.setScale(0.9);  

    var model_thing_leftLeg = renderer.createResource("MODEL", "tgheroes:thing_l_leg");
    model_thing_leftLeg.texture.set("big");
    thing_leftLeg = renderer.createEffect("fiskheroes:model").setModel(model_thing_leftLeg);
    thing_leftLeg.anchor.set("rightLeg");
	thing_leftLeg.setOffset(-2, -9.5, 0);
	thing_leftLeg.setScale(0.9); 

    //COAT

	var model_thing_coat_head = renderer.createResource("MODEL", "tgheroes:thing_coat_head");
    model_thing_coat_head.texture.set("coat");
    thing_coat_head = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_head);
    thing_coat_head.anchor.set("head");
	thing_coat_head.setOffset(0, 5, 0);
	thing_coat_head.setScale(0.9); 
	
    var model_thing_coat_body = renderer.createResource("MODEL", "tgheroes:thing_coat_body");
    model_thing_coat_body.texture.set("coat");
    thing_coat_body = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_body);
    thing_coat_body.anchor.set("body");
	thing_coat_body.setOffset(0, 3, 0);
	thing_coat_body.setScale(0.9); 
	
    var model_thing_coat_rarm = renderer.createResource("MODEL", "tgheroes:thing_coat_rarm");
    model_thing_coat_rarm.texture.set("coat");
    thing_coat_rarm = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_rarm);
    thing_coat_rarm.anchor.set("leftArm");
	thing_coat_rarm.setOffset(8, 3, -1);
	thing_coat_rarm.setScale(0.9);  

    var model_thing_coat_larm = renderer.createResource("MODEL", "tgheroes:thing_coat_larm");
    model_thing_coat_larm.texture.set("coat");
    thing_coat_larm = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_larm);
    thing_coat_larm.anchor.set("rightArm");
	thing_coat_larm.setOffset(-8, 3, -1);
	thing_coat_larm.setScale(0.9); 
	
	var model_thing_coat_rleg = renderer.createResource("MODEL", "tgheroes:thing_coat_rleg");
    model_thing_coat_rleg.texture.set("coat");
    thing_coat_rleg = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_rleg);
    thing_coat_rleg.anchor.set("leftLeg");
	thing_coat_rleg.setOffset(2, -9.5, 0);
	thing_coat_rleg.setScale(0.9);  

    var model_thing_coat_lleg = renderer.createResource("MODEL", "tgheroes:thing_coat_lleg");
    model_thing_coat_lleg.texture.set("coat");
    thing_coat_lleg = renderer.createEffect("fiskheroes:model").setModel(model_thing_coat_lleg);
    thing_coat_lleg.anchor.set("rightLeg");
	thing_coat_lleg.setOffset(-2, -9.5, 0);
	thing_coat_lleg.setScale(0.9); 
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	
	addAnimationWithData(renderer, "iron_man.LAND", "tgheroes:giant_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;
	
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	addAnimation(renderer, "thing.WALK", "tgheroes:thing_walk").setData((entity, data) => data.load(entity.exists()));


    addAnimation(renderer, "thing.CLAP", "tgheroes:thing_clap").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getInterpolatedData("fiskheroes:aiming_timer"), entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 0.7, 1) : Math.max(charge * 5 - 4, 0)));
    });

	addAnimation(renderer, "thing.THROW", "tgheroes:throw_thing").setData((entity, data) => data.load( entity.getInterpolatedData("tgheroes:dyn/stone_timer")))
    .setCondition(entity => entity.getInterpolatedData("tgheroes:dyn/stone"));
	/*
    addAnimation(renderer, "thing.HANDSDOWN", "tgheroes:throw_hands_down").setData((entity, data) => data.load(1 - entity.getInterpolatedData("tgheroes:dyn/stone_timer")))
    .setCondition(entity => entity.getData("tgheroes:dyn/stone") == false);
	*/
	
}

function render(entity, renderLayer, isFirstPersonArm) {

    if (entity.getData("tgheroes:dyn/stone_timer") > 0 && entity.getData("tgheroes:dyn/stone")) {
            stone.render()
            
        }
    if (entity.getData("tgheroes:dyn/stone_timer") > 0.3) {
	    stone.setOffset(-6, 15, 0);
        stone.anchor.set("rightArm");
    } else {
        stone.anchor.set("rightLeg");
        stone.setOffset(-3, 20, -9);

    }

    if (!isFirstPersonArm && renderLayer == "CHESTPLATE", "HELMET", "LEGGINGS", "BOOTS" && !entity.as("DISPLAY").isStatic()) {
		thing_rightArm.render();
		thing_leftArm.render();
		thing_body.render();
		thing_head.render();
		thing_leftLeg.render();
		thing_rightLeg.render();
    }

    if (!isFirstPersonArm && renderLayer == "CHESTPLATE", "HELMET", "LEGGINGS", "BOOTS" && !entity.as("DISPLAY").isStatic()) {
		thing_coat_rarm.render();
		thing_coat_larm.render();
		thing_coat_body.render();
		thing_coat_head.render();
		thing_coat_lleg.render();
		thing_coat_rleg.render();
    }
	
	
}