extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/psylocke/psylocke_layer1",
	"slim_arm": "tgheroes:x_men/psylocke/psylocke",
	"cape": "tgheroes:x_men/psylocke/psylocke_hair",
	"hair": "tgheroes:blank",
	"hair2": "tgheroes:blank",
	"beret": "tgheroes:blank",
    "scabbard": "tgheroes:x_men/psylocke/psy_sheath",
});
var utils = implement("fiskheroes:external/utils");
var chest;
var eyes = implement("tgheroes:external/psy_eyes");
var eye;
var scabbard;
var scabbard_blood;
var scabbard_rivals;
var capes = implement("fiskheroes:external/capes");
var cape;
var ult;
var alexarm;
var alexarm_l;
var psy_run = implement("tgheroes:external/psy_invisibil");
var spell;

function initEffects(renderer) {
	var eye_shape = renderer.createResource("SHAPE", "tgheroes:eye");
	var psy_shape = renderer.createResource("SHAPE", "tgheroes:psy_glyph");
    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:lines");
    var beam2 = renderer.createResource("BEAM_RENDERER", "tgheroes:not_spin_beam");
    var circle = renderer.createResource("SHAPE", "tgheroes:circles_ad");

	
	renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
		var activate = entity.getInterpolatedData("tgheroes:dyn/invis_timer");
        return entity.getInterpolatedData("tgheroes:dyn/invis_timer") ? 1 - 0.995 * activate : entity.isAlive() ? 0.995 : 1;
    });
	 
    spell = renderer.createEffect("fiskheroes:lines").setShape(psy_shape).setRenderer(beam2);
    spell.color.set(0xd60068);
    spell.setOffset(-2.0, 4.0, 0.0).setScale(0.75, 1.05, 0.5).setRotation (-90.0, 0.0, -90.0);
    spell.anchor.set("rightArm");
    spell.mirror = true;

    ult = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
    ult.color.set(0xd60068);
    ult.setOffset(0.0, 18.0, 0.0).setScale(100.0);
    ult.anchor.ignoreAnchor(true);

	psy_run.init(renderer, "tgheroes:psy_invis");


	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");

    var model_hair = renderer.createResource("MODEL", "tgheroes:psy_ponytail");
    model_hair.texture.set("hair", null);
	model_hair.bindAnimation("tgheroes:psy_ponytail").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    hair = renderer.createEffect("fiskheroes:model").setModel(model_hair);
    hair.anchor.set("head");

    var model_hair2 = renderer.createResource("MODEL", "tgheroes:psy_hair");
    model_hair2.texture.set("hair2", null);
    hair2 = renderer.createEffect("fiskheroes:model").setModel(model_hair2);
    hair2.setOffset(0.0, 0.0, -0.3);
    hair2.anchor.set("head");

    var model_beret = renderer.createResource("MODEL", "tgheroes:blood_beret");
    model_beret.texture.set("beret", null);
	model_beret.bindAnimation("tgheroes:braid").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    beret = renderer.createEffect("fiskheroes:model").setModel(model_beret);
    beret.anchor.set("head");
	
    scabbard = renderer.createEffect("fiskheroes:model");
    scabbard.setModel(utils.createModel(renderer, "tgheroes:psy_sheath", "scabbard"));
    scabbard.anchor.set("body");
	scabbard.setScale(0.4);
    scabbard.setOffset(-3.0, 8.0, 3.0);
    scabbard.setRotation(0.0, 0.0, -25.0);

    scabbard_original = renderer.createEffect("fiskheroes:model");
    scabbard_original.setModel(utils.createModel(renderer, "tgheroes:psy_sheath", "scabbard"));
    scabbard_original.anchor.set("body");
	scabbard_original.setScale(0.4);
    scabbard_original.setOffset(-3.0, 8.0, 3.0);
    scabbard_original.setRotation(0.0, 0.0, -25.0);

    scabbard_rivals = renderer.createEffect("fiskheroes:model");
    scabbard_rivals.setModel(utils.createModel(renderer, "tgheroes:psy_rivals_sheath", "scabbard"));
    scabbard_rivals.anchor.set("body");
	scabbard_rivals.setScale(0.4);
    scabbard_rivals.setOffset(-3.0, 8.0, 2.5);
    scabbard_rivals.setRotation(0.0, 0.0, -25.0);

    scabbard_blood = renderer.createEffect("fiskheroes:model");
    scabbard_blood.setModel(utils.createModel(renderer, "tgheroes:psy_blood_sheath", "scabbard"));
    scabbard_blood.anchor.set("body");
	scabbard_blood.setScale(0.4);
    scabbard_blood.setOffset(-2.5, 8.0, 3.0);
    scabbard_blood.setRotation(0.0, 0.0, -24.5);

	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:not_spin_beam", "head", 0xd60068, [
        {"firstPerson": [4.5, 3.75, 2.0], "offset": [2.5, 12.0, -3.0], "size": [0.5, 0.5], "anchor": "leftArm" },
        {"firstPerson": [-4.5, 3.75, 2.0], "offset": [-2.5, 12.0, -3.0], "size": [0.5, 0.5], "anchor": "rightArm" }
    ]);

    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:not_spin_beam", "head", 0xd60068, [
        {"firstPerson": [4.5, 3.75, -2.0], "offset": [2.5, 12.0, 0.0], "size": [0.5, 0.5], "anchor": "leftArm" },
        {"firstPerson": [-4.5, 3.75, -2.0], "offset": [-2.5, 12.0, 0.0], "size": [0.5, 0.5], "anchor": "rightArm" }
    ]);

    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:not_spin_beam", "head", 0xd60068, [
        {"firstPerson": [8.5, 3.75, -7.0], "offset": [-6.5, 12.0, 2.0], "size": [0.5, 0.5], "anchor": "leftArm" },
        {"firstPerson": [-8.5, 3.75, -7.0], "offset": [6.5, 12.0, 2.0], "size": [0.5, 0.5], "anchor": "rightArm" }
    ]);

    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:not_spin_beam", "head", 0xd60068, [
        {"firstPerson": [-8.5, 3.75, -7.0], "offset": [6.5, 12.0, 2.0], "size": [0.5, 0.5], "anchor": "leftArm" },
        {"firstPerson": [4.5, 3.75, -7.0], "offset": [-6.5, 12.0, 2.0], "size": [0.5, 0.5], "anchor": "rightArm" }
    ]);
	
	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	
    renderer.bindProperty("fiskheroes:equipped_item").setItems([
    { "anchor": "body", "scale": 0.535, "offset": [-3.0, -4.8, 3.0], "rotation": [-155.0, 90.0, 0.0] }
    ]).slotIndex = 0;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.AIMING");

    //addAnimationWithData(renderer, "psy.STAND", "tgheroes:psy_ult_2", "tgheroes:dyn/stand");	

    addAnimationWithData(renderer, "psy.DASH", "tgheroes:psy_dodge").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/dodge_timer") > 0));
    }).setCondition(entity => entity.getData("tgheroes:dyn/dodge"));

	addAnimationWithData(renderer, "psy.AIMING", "tgheroes:dual_aiming_fpcorr", "fiskheroes:aiming");	
	addAnimation(renderer, "wolverine.JUMP", "tgheroes:psy_leap").setData((entity, data) => data.load(entity.getInterpolatedData("tgheroes:dyn/jump_timer"))).setCondition(entity => !entity.isOnGround());


    addAnimationWithData(renderer, "psy.AOE1", "tgheroes:psy_ult_1").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.1) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.15) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE2", "tgheroes:psy_ult_2").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.15) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.25) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE3", "tgheroes:psy_ult_3").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.25) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.3) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE4", "tgheroes:psy_ult_4").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.3) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.4) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE5", "tgheroes:psy_ult_5").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.4) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.5) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE6", "tgheroes:psy_ult_1").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.5) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.6) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE7", "tgheroes:psy_ult_2").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.6) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.7) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE8", "tgheroes:psy_ult_3").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.7) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.8) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE9", "tgheroes:psy_ult_4").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.8) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 0.9) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));

    addAnimationWithData(renderer, "psy.AOE10", "tgheroes:psy_ult_5").setData((entity, data) => {
        data.load((entity.getInterpolatedData("tgheroes:dyn/psy_timer") > 0.9) && (entity.getInterpolatedData("tgheroes:dyn/psy_timer") < 1.0) );
    }).setCondition(entity => entity.getData("tgheroes:dyn/psy"));
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }

    if(renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS"){
        spell.progress = entity.getData("fiskheroes:aiming");
        spell.render();
        }
    
     if(renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS"){
       ult.progress =entity.getInterpolatedData("tgheroes:dyn/psy");
       ult.render();
       }
	
	
    if (renderLayer == "CHESTPLATE") {
        
        if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/rivals"){
            scabbard_rivals.render();
        } 
        if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/blood"){
            scabbard_blood.render();
        } 
        if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/original"){
            scabbard_original.render();
        } 
        if (entity.getWornChestplate().suitType() == "tgheroes:psylocke") {
            scabbard.render();
        }
        if (!entity.getInterpolatedData("tgheroes:dyn/psy")) {
           chest.render();
        }
		
    }
	

    if (entity.getWornHelmet()) {
        cape.render(entity);
		hair.render();
		hair2.render();
		beret.render();
    }
	
}