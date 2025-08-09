extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:fantastic_4/human_torch/f4_torch_layer1",
    "layer2": "tgheroes:fantastic_4/human_torch/f4_torch_layer2",
    "suit_lights": "tgheroes:fantastic_4/human_torch/xor_flame_on.tx.json",
});

var utils = implement("fiskheroes:external/utils");
var boosters2;
var boots_booster = implement("tgheroes:external/sentinel_boost");
var overlay;
var fire_human;
var fire_human2;
var fire_human3;
var fire_human4;

var fire_human5;
var fire_human6;
var fire_human7;
var fire_human8;

var fire_human9;
var fire_human10;
var fire_human11;
var fire_human12;

function init(renderer) {
    parent.init(renderer);	

}

function initEffects(renderer) {
	
	
	overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "suit_lights");
	
	utils.bindParticles(renderer, "tgheroes:torch_flames").setCondition(entity => entity.getData("fiskheroes:flying"));
	
	boosters2 = boots_booster.create(renderer, "fiskheroes:orange_fire_layer_%s", true);
	
	utils.bindParticles(renderer, "tgheroes:phoenix_transform").setCondition(entity => entity.getData("tgheroes:dyn/flame_timer") > 0 && entity.getData("tgheroes:dyn/flame_timer") < 1 && entity.getData("fiskheroes:flying"));
	
	
    utils.bindParticles(renderer, "tgheroes:fire_aoe").setCondition(entity => entity.getData("tgheroes:dyn/fire_timer") > 0.8 && entity.getData("tgheroes:dyn/fire"));
    utils.bindParticles(renderer, "tgheroes:torch_nova").setCondition(entity => entity.getData("tgheroes:dyn/fire_timer") > 0.6 && entity.getData("tgheroes:dyn/fire"));



    utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:fire_beam", "body", 0xEE932B, [
        { "firstPerson": [-3.75, 3.0, -4.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "leftArm" },
        { "firstPerson": [3.75, 3.0, -6.0], "offset": [-0.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "rightArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "tgheroes:impact_flame_energy_projection"));

	var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:flames");
	
	fire_human = utils.createLines(renderer, beam, 0xff3700, [
        {"start": [0, -1.0, 0], "end": [0.0, 2.2, 0.0], "size": [8.0, 12.0]},
    ]);
    fire_human.setOffset(-1.0, 2.0, 0.0).setScale(4);
    fire_human.anchor.set("leftArm");
    fire_human.mirror = true;	
	fire_human2 = utils.createLines(renderer, beam, 0xff3700, [
    {"start": [0, -1.0, 0], "end": [0.0, 2.2, 0.0], "size": [8.0, 12.0]},
    ]);
    fire_human2.setOffset(1.0, 2.0, 0.0).setScale(4);
    fire_human2.anchor.set("rightArm");
    fire_human2.mirror = true;
	
	fire_human3 = utils.createLines(renderer, beam, 0xff3700, [
        {"start": [0, 2.2, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 12.0]},
    ]);
    fire_human3.setOffset(-1.0, 2.0, 0.0).setScale(4);
    fire_human3.anchor.set("leftArm");
    fire_human3.mirror = true;	
	fire_human4 = utils.createLines(renderer, beam, 0xff3700, [
    {"start": [0, 2.2, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 12.0]},
    ]);
    fire_human4.setOffset(1.0, 2.0, 0.0).setScale(4);
    fire_human4.anchor.set("rightArm");
    fire_human4.mirror = true;
	
    
	
	fire_human5 = utils.createLines(renderer, beam, 0xff3700, [
         {"start": [0, -1.0, 0], "end": [0.0, 2.2, 0.0], "size": [12.0, 10.0]},
    ]);
	fire_human5.setOffset(-1.0, 4.0, 0.0).setScale(4);
    fire_human5.anchor.set("leftLeg");
    fire_human5.mirror = true;	
	fire_human6 = utils.createLines(renderer, beam, 0xff3700, [
     {"start": [0, -1.0, 0], "end": [0.0, 2.2, 0.0], "size": [12.0, 10.0]},
    ]);
    fire_human6.setOffset(1.0, 4.0, 0.0).setScale(4);
    fire_human6.anchor.set("rightLeg");
    fire_human6.mirror = true;
	
	fire_human7 = utils.createLines(renderer, beam, 0xff3700, [
         {"start": [0, 2.2, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 12.0]},
    ]);
	fire_human7.setOffset(-1.0, 4.0, 0.0).setScale(4);
    fire_human7.anchor.set("leftLeg");
    fire_human7.mirror = true;	
	fire_human8 = utils.createLines(renderer, beam, 0xff3700, [
     {"start": [0, 2.2, 0], "end": [0.0, -1.0, 0.0], "size": [8.0, 12.0]},
    ]);
    fire_human8.setOffset(1.0, 4.0, 0.0).setScale(4);
    fire_human8.anchor.set("rightLeg");
    fire_human8.mirror = true;
	
	
	
	
	fire_human9 = utils.createLines(renderer, beam, 0xff3700, [
        {"start": [0, 0, 0], "end": [0.0, -2.0, 0.0], "size": [28.0, 28.0]},
    ]);
	fire_human9.setOffset(0.0, 0.0, 0.0).setScale(4);
    fire_human9.anchor.set("head");
	
	fire_human10 = utils.createLines(renderer, beam, 0xff3700, [
        {"start": [0, -2.0, 0], "end": [0.0, 0.0, 0.0], "size": [28.0, 28.0]},
    ]);
	fire_human10.setOffset(0.0, 0.0, 0.0).setScale(4);
    fire_human10.anchor.set("head");
	
	fire_human12 = utils.createLines(renderer, beam, 0xff3700, [
    {"start": [0, 0.0, 0], "end": [0.0, -1.2, 0.0], "size": [18.0, 34.0]},
    ]);
    fire_human12.setOffset(0.0, 12.0, 0.0).setScale(5);
    fire_human12.anchor.set("body");
	
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addFlightAnimation(renderer, "human_torch.FLIGHT", "fiskheroes:flight/propelled_hands.anim.json");
    utils.addHoverAnimation(renderer, "human_torch.HOVER", "fiskheroes:flight/idle/propelled_hands");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	
	addAnimationWithData(renderer, "wanda.PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");	

    addAnimationWithData(renderer, "human_torch.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
		
    addAnimation(renderer, "fire.ACTIVADO", "tgheroes:flame_on").setData((entity, data) => {
        var timer = entity.getInterpolatedData("tgheroes:dyn/flame_animation_timer")
        data.load(0, timer < 0.5 ? timer : 1 - timer)
        data.load(1, timer > 0.2 ? timer - 0.2 : 0)
        data.load(2, timer > 0.7 ? timer - 0.7 : 0)
    }).setCondition(entity => entity.getData("tgheroes:dyn/flame") && entity.getInterpolatedData("tgheroes:dyn/flame_animation_timer") != 1);

    addAnimationWithData(renderer, "fire.AOE", "tgheroes:nova_expl", "tgheroes:dyn/fire_timer").setCondition(entity => entity.getData("tgheroes:dyn/fire"));
}

function render(entity, renderLayer, isFirstPersonArm) {
	
	
	overlay.opacity = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") > 0);
	overlay.render();
	
	if (renderLayer == "CHESTPLATE") {
	fire_human.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human.render()
	fire_human2.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human2.render();
	
	fire_human3.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human3.render()
	fire_human4.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human4.render();
	
	
	fire_human5.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human5.render()
	fire_human6.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human6.render();
	
	fire_human7.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human7.render()
	fire_human8.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human8.render();
	
	
	fire_human9.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human9.render();
	
	fire_human10.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human10.render();
	
	fire_human12.progress = (entity.getInterpolatedData("tgheroes:dyn/flame_timer") == 1);
	fire_human12.render();
    	
	}

	boosters2.render(entity, renderLayer, isFirstPersonArm, false);

}

