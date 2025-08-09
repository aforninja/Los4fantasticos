extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/storm/storm_layer1",
    "layer2": "tgheroes:x_men/storm/storm_layer2",
	"slim_arm": "tgheroes:x_men/storm/storm_slim",
	"shadowdome": "tgheroes:x_men/storm/cloud_storm",
    "cape": "tgheroes:x_men/storm/storm_cape",
    "hair": "tgheroes:blank",
    "hair_rivals": "tgheroes:blank",
	"lights_eyes": "tgheroes:x_men/storm/storm_eyes"
});

var capes = implement("fiskheroes:external/capes");
var cape;
var utils = implement("fiskheroes:external/utils");
var chest;
var thunder1;
var thunder2;
var thunder3;
var thunder4;
var thunder5;
var thunder6;
var thunder7;
var thunder8;

var tornado5;
var tornado6;
var tornado7;
var tornado8;
var tornado9;
var tornado10;

var alexarm;
var alexarm_l;

function init(renderer) {
	parent.init(renderer);
	renderer.setLights((entity, renderLayer) => {
        if (entity.getInterpolatedData("fiskheroes:energy_projection") || entity.getInterpolatedData("fiskheroes:beam_shooting") || entity.getInterpolatedData("fiskheroes:lightsout")) {
            return renderLayer == "HELMET" ? "lights_eyes" : "lights_eyes";
        }
        return renderLayer == "CHESTPLATE" ? null : null;
    });
}

function initEffects(renderer) {
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	var model_hair = renderer.createResource("MODEL", "tgheroes:storm_hair");
    model_hair.texture.set("hair", null);
	model_hair.bindAnimation("tgheroes:storm_mohawk").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
	model_hair.bindAnimation("tgheroes:storm_mohawk2").setData((entity,data) => data.load(entity.getLookVector().y() < 0));
    hair = renderer.createEffect("fiskheroes:model").setModel(model_hair);
    hair.anchor.set("head");
	
	var model_hair_rivals = renderer.createResource("MODEL", "tgheroes:storm_rivals_hair");
    model_hair_rivals.texture.set("hair_rivals", null);
    hair_rivals = renderer.createEffect("fiskheroes:model").setModel(model_hair_rivals);
    hair_rivals.anchor.set("head");
	hair_rivals.setRotation(0.0, 180.0, 0.0);
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
	
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.width = 18;
	cape.effect.texture.set("cape");
	
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:storm_lighning","body", 0x80BFFF, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [4.0, 4.0] }
    ]);

	utils.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:lightning_cast", "rightArm", 0x80BFFF, [
        { "firstPerson": [-8.0, 4.5, -10.0], "offset": [-0.5, 9.0, 0.0], "size": [1.0, 1.0] }
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:wind_beam", "body", 0xffffff, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -12.0], "size": [20.0, 20.0],}
    ]);
	
	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
	
	var shazamt = renderer.createResource("BEAM_RENDERER", "tgheroes:shazamt");
	
	var tornado = renderer.createResource("BEAM_RENDERER", "tgheroes:tornado");
	
	thunder1 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder1.anchor.set("body");
    thunder1.setOffset(-100.0, 10.0, -150.0).setRotation(180.0, 0.0, 10.0).setScale(20.0, 15000.0, 20.0);
    thunder1.mirror = true;
	
	thunder2 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder2.anchor.set("body");
    thunder2.setOffset(50.0, -10.0, -100.0).setRotation(180.0, 0.0, -10.0).setScale(20.0, 15000.0, 20.0);
    thunder2.mirror = true;
	
	thunder3 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder3.anchor.set("body");
    thunder3.setOffset(-150.0, -10.0, 50.0).setRotation(180.0, 0.0, 10.0).setScale(20.0, 15000.0, 20.0);
    thunder3.mirror = true;
	
	thunder4 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder4.anchor.set("body");
    thunder4.setOffset(100.0, -10.0, -200.0).setRotation(180.0, 0.0, -10.0).setScale(20.0, 15000.0, 20.0);
    thunder4.mirror = true;
	
	thunder5 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder5.anchor.set("body");
    thunder5.setOffset(75.0, -10.0, 125.0).setRotation(180.0, 0.0, 10.0).setScale(20.0, 15000.0, 20.0);
    thunder5.mirror = true;
	
	thunder6 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder6.anchor.set("body");
    thunder6.setOffset(175.0, -10.0, -125.0).setRotation(180.0, 0.0, -10.0).setScale(20.0, 15000.0, 20.0);
    thunder6.mirror = true;
	
	thunder7 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder7.anchor.set("body");
    thunder7.setOffset(125.0, -10.0, -255.0).setRotation(180.0, 0.0, 10.0).setScale(20.0, 15000.0, 20.0);
    thunder7.mirror = true;
	
	thunder8 = utils.createLines(renderer, shazamt, 0x80BFFF, [
        {"start": [0, 0.5, 0], "end": [0.0, 0.7, 0.0], "size": [20.0, 20.0]},]);
    thunder8.anchor.set("body");
    thunder8.setOffset(225.0, -10.0, 45.0).setRotation(180.0, 0.0, -10.0).setScale(20.0, 15000.0, 20.0);
    thunder8.mirror = true;
	
	tornado5 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, -1.5, 0], "end": [0.0, 3.7, 0.0], "size": [30.0, 30.0]},]);
    tornado5.anchor.set("body");
    tornado5.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(20.0, 15.0, 20.0);
	
	tornado6 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 3.5, 0], "end": [0.0, 6.7, 0.0], "size": [35.0, 35.0]},]);
    tornado6.anchor.set("body");
    tornado6.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(22.0, 15.0, 22.0);
	
	tornado7 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 6.5, 0], "end": [0.0, 9.7, 0.0], "size": [40.0, 40.0]},]);
    tornado7.anchor.set("body");
    tornado7.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(24.0, 15.0, 24.0);
	
	tornado8 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 9.5, 0], "end": [0.0, 12.7, 0.0], "size": [45.0, 45.0]},]);
    tornado8.anchor.set("body");
    tornado8.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(26.0, 15.0, 26.0);
	
	tornado9 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 12.5, 0], "end": [0.0, 15.7, 0.0], "size": [50.0, 50.0]},]);
    tornado9.anchor.set("body");
    tornado9.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(28.0, 15.0, 28.0);
	
	tornado10 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 15.5, 0], "end": [0.0, 18.0, 0.0], "size": [55.0, 55.0]},]);
    tornado10.anchor.set("body");
    tornado10.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(30.0, 15.0, 30.0);
    
	
	
	var shadowdome = renderer.bindProperty("fiskheroes:shadowdome");
	shadowdome.texture.set("shadowdome");
	shadowdome.setShape(36, 36);
}
function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");	
	addAnimationWithData(renderer, "storm.WIND", "tgheroes:storm_wind_summon", "fiskheroes:energy_projection");
    utils.addFlightAnimation(renderer, "storm.FLIGHT", "fiskheroes:flight/default_arms_forward.anim.json");
    utils.addHoverAnimation(renderer, "storm.HOVER", "fiskheroes:flight/idle/neutral");
		
    addAnimation(renderer, "beter.CHARGED_BEAM", "fiskheroes:dual_aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    addAnimationWithData(renderer, "tornado.AOE", "tgheroes:spin_star", "tgheroes:dyn/tornado_timer").setCondition(entity => entity.getData("tgheroes:dyn/tornado"));
	
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
		
		hair.render();	
		
		hair_rivals.render();	
    }
	
		thunder1.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder1.render() 
		thunder2.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder2.render() 
		thunder3.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder3.render() 
		thunder4.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder4.render() 
		thunder5.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder5.render() 
		thunder6.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder6.render() 
		thunder7.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder7.render() 
		thunder8.opacity = entity.getData("fiskheroes:beam_shooting")
        thunder8.render() 
		
		tornado5.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado5.render() 
		tornado6.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado6.render() 
		tornado7.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado7.render() 		
		tornado8.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado8.render() 		
		tornado9.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado9.render() 		
		tornado10.opacity = entity.getData("tgheroes:dyn/tornado")
        tornado10.render() 
		
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
        chest.render();
    }
}
