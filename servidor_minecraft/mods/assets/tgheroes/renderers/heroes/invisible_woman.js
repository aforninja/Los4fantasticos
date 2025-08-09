extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:fantastic_4/invisible_woman/sue_layer1",
	"layer2": "tgheroes:fantastic_4/invisible_woman/sue_layer2",
	"slim_arm": "tgheroes:fantastic_4/invisible_woman/sue_slim",
	"cape": "tgheroes:fantastic_4/invisible_woman/sue_hair",
	"malice_shoulder": "tgheroes:blank",
	"malice_head": "tgheroes:blank",
});

function init(renderer) {
    parent.init(renderer);
	

}

var utils = implement("fiskheroes:external/utils");
var alexarm;
var alexarm_l;
var capes = implement("fiskheroes:external/capes");
var cape;
var chest;
var force_human;
var force_human2;

var force_human5;
var force_human6;

var force_human9;

var force_human12;

var force_beam;

function initEffects(renderer) {
	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	
	var model_malice_shoulder = renderer.createResource("MODEL", "tgheroes:malice_shoulder");
    model_malice_shoulder.texture.set("malice_shoulder");
    malice_shoulder = renderer.createEffect("fiskheroes:model").setModel(model_malice_shoulder);
    malice_shoulder.anchor.set("leftArm");
	malice_shoulder.setOffset (5.0, -2.05, 0.0);
    malice_shoulder.mirror = true;
	
	var model_malice_head = renderer.createResource("MODEL", "tgheroes:malice_hair");
    model_malice_head.texture.set("malice_head");
	model_malice_head.bindAnimation("tgheroes:malice_hair").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    malice_head = renderer.createEffect("fiskheroes:model").setModel(model_malice_head);
    malice_head.anchor.set("head");
	
	
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	
	var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0xFFFFFF);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
		forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") && entity.getInterpolatedData("tgheroes:dyn/invis_timer") * 0
		|| entity.getInterpolatedData("fiskheroes:shield_blocking_timer") && !entity.getInterpolatedData("tgheroes:dyn/invis_timer") * 0.25 ;
		return true;
    });
	
	
	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:no_beam", "leftLeg", 0xcceeff, [
        { "firstPerson": [0.0, 0.0, 0.0], "offset": [0.0, 0.0, 0.0], "size": [1.0, 1.0] }
    ]);
	

	renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
		var activate = entity.getInterpolatedData("tgheroes:dyn/invis_timer");
        return entity.getInterpolatedData("tgheroes:dyn/invis_timer") ? 1 - 0.995 * activate : entity.isAlive() ? 0.995 : 1;
    });

	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:sue_telekines");

	var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:iw_beam");
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam, "rightArm", 0xcceeff, [
        { "firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 9.0, 0.0], "size": [4.5, 4.5] }
    ]);
    
	force_human = utils.createLines(renderer, beam, 0xcceeff, [
        {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [12.0, 8.0]},
    ]);
    force_human.setOffset(-1.0, 2.0, 0.0).setScale(10);
    force_human.anchor.set("leftArm");
    force_human.mirror = true;	
	force_human2 = utils.createLines(renderer, beam, 0xcceeff, [
    {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [12.0, 8.0]},
    ]);
    force_human2.setOffset(1.0, 2.0, 0.0).setScale(10);
    force_human2.anchor.set("rightArm");
    force_human2.mirror = true;
	
    
	
	force_human5 = utils.createLines(renderer, beam, 0xcceeff, [
         {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [24.0, 16.0]},
    ]);
	force_human5.setOffset(-1.0, 4.0, 0.0).setScale(10);
    force_human5.anchor.set("leftLeg");
    force_human5.mirror = true;	
	force_human6 = utils.createLines(renderer, beam, 0xcceeff, [
     {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [24.0, 16.0]},
    ]);
    force_human6.setOffset(1.0, 4.0, 0.0).setScale(10);
    force_human6.anchor.set("rightLeg");
    force_human6.mirror = true;
	
	
	force_human9 = utils.createLines(renderer, beam, 0xcceeff, [
        {"start": [0, 0, 0], "end": [0.0, -1.0, 0.0], "size": [34.0, 34.0]},
    ]);
	force_human9.setOffset(0.0, 0.0, 0.0).setScale(10);
    force_human9.anchor.set("head");
	
	force_human12 = utils.createLines(renderer, beam, 0xcceeff, [
    {"start": [0, 0.0, 0], "end": [0.0, -1.2, 0.0], "size": [18.0, 34.0]},
    ]);
    force_human12.setOffset(0.0, 12.0, 0.0).setScale(10);
    force_human12.anchor.set("body");


	force_beam = utils.createLines(renderer, beam, 0xcceeff, [
        {"start": [0, 0.8, 0], "end": [0.0, -2.0, 0.0], "size": [64.0, 128.0, 0.01]},
    ]);
    force_beam.setOffset(-0.5, 18.0, 6.0).setScale(10.0);
    force_beam.anchor.set("head");

}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.BLOCKING");

	addAnimationWithData(renderer, "beter.AIMING", "fiskheroes:aiming_fpcorr", "fiskheroes:aiming_timer").priority = 1;
	

    addAnimation(renderer, "beter.CHARGED_BEAM", "tgheroes:invis_push").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 0.7, 1) : Math.max(charge * 5 - 4, 0)));
    });
		
	utils.addFlightAnimation(renderer, "storm.FLIGHT", "fiskheroes:flight/default_arms_forward.anim.json");
    utils.addHoverAnimation(renderer, "storm.HOVER", "fiskheroes:flight/idle/neutral");
	
    addAnimation(renderer, "basic.BLOCKING", "tgheroes:star_pose").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:shield_blocking_timer")));

   // addAnimationWithData(renderer, "basic.BLOCKING", "tgheroes:star_pose", "fiskheroes:shield_blocking_timer");
	
	
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }
	if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        chest.render();
    }
	
	if (renderLayer == "CHESTPLATE") {
	force_human.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human.render()
	force_human2.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human2.render();
	
	
	force_human5.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human5.render()
	force_human6.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human6.render();
	
	
	force_human9.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human9.render();
	
	force_human12.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	force_human12.render();
    	
	}
	
	var bs = entity.getInterpolatedData("fiskheroes:beam_shooting");
	
	force_beam.opacity = (entity.getInterpolatedData("fiskheroes:beam_charge") == 1);
	force_beam.setOffset(0, 8.0, (bs ? -500.0 * bs : -1));
	force_beam.render();
	
	if (entity.getWornHelmet()) {
		cape.render(entity);
		malice_head.render();
		
    }
	
	malice_shoulder.render();
}