extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/magik/magik_layer1",
	"child_body":"tgheroes:x_men/magik/darkchyld",
	"slim_arm": "tgheroes:x_men/magik/magik",
	"horn": "tgheroes:x_men/magik/magik_horns",
	"cape": "tgheroes:x_men/magik/magik_hair",
	"big": "tgheroes:x_men/magik/darkchyld_model",
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var cape;
var chest;
var alexarm;
var alexarm_l;
var helmet;
var helmet2;

var mandalas = implement("tgheroes:external/tao_mandal_test");
var spell;
var spell2;

var transforming5

function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
		if (!entity.getData("tgheroes:dyn/darkchild_timer") > 0) {
            return "layer1";
        }
        return "child_body";
    });
}

function initEffects(renderer) {
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l_dif", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	
	helmet = renderer.createEffect("fiskheroes:model");
    helmet.setModel(utils.createModel(renderer, "tgheroes:magik_horn", "horn"));
    helmet.anchor.set("head");
	
	helmet2 = renderer.createEffect("fiskheroes:model");
    helmet2.setModel(utils.createModel(renderer, "tgheroes:magik_horn", "horn"));
    helmet2.anchor.set("head");
	helmet2.setOffset (0.0, 4.0, 0.0);
	
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	

    var color = 0xff2400;
    var circle = renderer.createResource("SHAPE", "tgheroes:circles_ad");
    var star = renderer.createResource("SHAPE", "tgheroes:star");
    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:lines");
    spell = renderer.createEffect("fiskheroes:lines").setShape(star).setRenderer(beam);
    spell.color.set(color);
    spell.setOffset(0.0, 10.0, 0.0).setScale(3.2);
    spell.anchor.set("leftArm");

    spell2 = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
    spell2.color.set(color);
    spell2.setOffset(0.0, 10.0, 0.0).setScale(3.2);
    spell2.anchor.set("leftArm");
	
	utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "tgheroes:not_spin_beam", "rightArm", 0xfee028, [
        { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [0.5, 10.0] }
    ]).setCondition(entity => !entity.getData("tgheroes:dyn/darkchild_timer") > 0);

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "tgheroes:not_spin_beam", "rightArm", 0xcc1b00, [
        { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [1.0, 10.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/darkchild_timer") > 0);
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:not_spin_beam", "rightArm", 0xfee028, [
        { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [0.5, 0.5] }
    ]);
	

	//darkchyld
	var model_darkchyld_head = renderer.createResource("MODEL", "tgheroes:darkchyld_hair");
    model_darkchyld_head.texture.set("big");
	model_darkchyld_head.bindAnimation("tgheroes:darkchild_hair").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    darkchyld_head = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_head);
    darkchyld_head.anchor.set("head");
	darkchyld_head.setOffset(0, 0, 0);
	
    var model_darkchyld_body = renderer.createResource("MODEL", "tgheroes:darkchyld_body");
    model_darkchyld_body.texture.set("big");
	model_darkchyld_body.bindAnimation("tgheroes:darkchyld_tail_idle").setData((entity,data) => data.load(entity.exists()&& entity.loop(150)));
    darkchyld_body = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_body);
    darkchyld_body.anchor.set("body");
	darkchyld_body.setOffset(0, 0, 0);
	
    var model_darkchyld_rightArm = renderer.createResource("MODEL", "tgheroes:darkchyld_right_arm");
    model_darkchyld_rightArm.texture.set("big");
    darkchyld_rightArm = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_rightArm);
    darkchyld_rightArm.anchor.set("rightArm");
	darkchyld_rightArm.setOffset(-5, -2, 0);

    var model_darkchyld_leftArm = renderer.createResource("MODEL", "tgheroes:darkchyld_left_arm");
    model_darkchyld_leftArm.texture.set("big");
    darkchyld_leftArm = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_leftArm);
    darkchyld_leftArm.anchor.set("leftArm");
	darkchyld_leftArm.setOffset(5, -2, 0);
	
	var model_darkchyld_rightLeg = renderer.createResource("MODEL", "tgheroes:darkchyld_right_leg");
    model_darkchyld_rightLeg.texture.set("big");
    darkchyld_rightLeg = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_rightLeg);
    darkchyld_rightLeg.anchor.set("leftLeg");
	darkchyld_rightLeg.setOffset(2, -12.0, 0);

    var model_darkchyld_leftLeg = renderer.createResource("MODEL", "tgheroes:darkchyld_left_leg");
    model_darkchyld_leftLeg.texture.set("big");
    darkchyld_leftLeg = renderer.createEffect("fiskheroes:model").setModel(model_darkchyld_leftLeg);
    darkchyld_leftLeg.anchor.set("rightLeg");
	darkchyld_leftLeg.setOffset(-2, -12.0, 0);
	
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:fire_beam", "body", 0xEE932B, [
        { "firstPerson": [3.75, 3.0, -4.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "leftArm" },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "tgheroes:impact_flame_energy_projection")).setCondition(entity => !entity.getData("tgheroes:dyn/darkchild"));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:dark_fire_beam", "body", 0x9F1313, [
        { "firstPerson": [3.75, 3.0, -4.0], "offset": [0.5, 12.0, 0.0], "size": [3.0, 3.0], "anchor": "leftArm" },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "tgheroes:impact_flame_energy_projection")).setCondition(entity => entity.getData("tgheroes:dyn/darkchild"));


	var transforming = renderer.createResource("BEAM_RENDERER", "tgheroes:magik_charge");

    transforming5 = utils.createLines(renderer, transforming, 0x9F1313, [
        {"start": [0, -2.5, 0], "end": [0, 4.0, 0], "size": [1.75, 1.75]},]);
    transforming5.anchor.ignoreAnchor(true);
    transforming5.setOffset(0.0, 0.0, 0.0).setRotation(-180.0, 180.0, 0.0).setScale(20.0, 10.0, 20.0);

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.BLOCKING");

	addAnimationWithData(renderer, "magic.BEAM", "tgheroes:aiming_fpcorr_left", "fiskheroes:beam_charge");

    
	addAnimationWithData(renderer, "madik.DASH", "tgheroes:psy_dodge").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/dodge_timer") > 0));
    }).setCondition(entity => entity.getData("tgheroes:dyn/dodge"));

    
    addAnimationWithData(renderer, "fire.ACTIVADO", "tgheroes:behold_darkchyld", "tgheroes:dyn/darkchild_timer");

    addAnimationWithData(renderer, "soulswrod.GUARD", "tgheroes:magik_guard").setData((entity, data) => {
        data.load((entity.getHeldItem().name() == "fisktag:weapon" && entity.getHeldItem().isWeapon()) && entity.as("PLAYER").isUsingItem());
    });


    
}

function render(entity, renderLayer, isFirstPersonArm) {
	var darkChildTimer = entity.getInterpolatedData("tgheroes:dyn/darkchild_timer")
	
    if (entity.getData("tgheroes:dyn/darkchild_timer") > 0) {
		darkchyld_rightArm.render();
		darkchyld_leftArm.render();
		darkchyld_body.render();
		darkchyld_head.render();
		darkchyld_leftLeg.render();
		darkchyld_rightLeg.render();
    }
	
    if (renderLayer == "CHESTPLATE") {
		spell.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        spell.render();

        spell2.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        spell2.render();

    }

    transforming5.progress = entity.getInterpolatedData("tgheroes:dyn/darkchild_timer") > 0 && entity.getInterpolatedData("tgheroes:dyn/darkchild_timer") < 1
    transforming5.render()
    

	if (!entity.getData("tgheroes:dyn/darkchild_timer") > 0 ) {
        alexarm.render();
        alexarm_l.render();
	
    }

	if (!entity.getData("tgheroes:dyn/darkchild_timer") > 0 && entity.getWornHelmet()) {
		cape.render(entity);
		helmet.render();
		helmet2.render();
	}
	
	chest.render();

}