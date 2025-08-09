extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:fantastic_4/galactus/galactus_layer1",
	"layer2": "tgheroes:fantastic_4/galactus/galactus_layer2",
	"helmet": "tgheroes:fantastic_4/galactus/galan_helmet"
});

var utils = implement("fiskheroes:external/utils");
var magic1;
var magic2;
var magic3;
var magic4;
var magic5;
var magic6;
var glow;

function initEffects(renderer) {
    var model_galan_helmet = renderer.createResource("MODEL", "tgheroes:galan_helmet");
    model_galan_helmet.texture.set("helmet");
    model_galan_helmet.generateMirror();
    galan_helmet = renderer.createEffect("fiskheroes:model").setModel(model_galan_helmet);
    galan_helmet.anchor.set("head");
    galan_helmet.setOffset(0.0, -21.0, 0.0);


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:doom_magic", "body", 0x9400d3, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [4.0, 4.0], "anchor": "rightArm" }
    ]);



    //SHIELD

    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:iw_beam");
    magic1 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [16.0, 16.0]},
    ]);
    magic1.setOffset(-1.0, 2.0, 0.0).setScale(10.0);
    magic1.anchor.set("leftArm");
	magic2 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [16.0, 16.0]},
    ]);
    magic2.setOffset(1.0, 2.0, 0.0).setScale(10.0);
    magic2.anchor.set("rightArm");
	
    
	
	
	magic3 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [24.0, 16.0]},
    ]);
    magic3.setOffset(0.0, 4.0, 0.0).setScale(10.0);
    magic3.anchor.set("rightLeg");
	magic4 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, -0.5, 0], "end": [0.0, 0.8, 0.0], "size": [24.0, 16.0]},
    ]);
    magic4.setOffset(0.0, 4.0, 0.0).setScale(10.0);
    magic4.anchor.set("leftLeg");
	
	
	magic5 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, 0, 0], "end": [0.0, -1.9, 0.0], "size": [36.0, 36.0]},
    ]);
    magic5.setOffset(0.0, 2.0, 0.0).setScale(10);
    magic5.anchor.set("head");
	
	
	magic6 = utils.createLines(renderer, beam, 0x9400d3, [
        {"start": [0, 0.5, 0], "end": [0.0, -1.0, 0.0], "size": [18.0, 34.0]},
    ]);	
    magic6.setOffset(0.0, 8.0, 0.0).setScale(10.0);
    magic6.anchor.set("body");
	
    //BLACK HOLE
    var black_hole_aoe = renderer.bindProperty("fiskheroes:forcefield");
    black_hole_aoe.color.set(0x9400d3);
    black_hole_aoe.setShape(36, 18).setOffset(0.0, 0.0, -10.0);
    black_hole_aoe.setCondition(entity => {
		black_hole_aoe.opacity = (entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") && entity.getData("tgheroes:dyn/black_hole")) * 0.7;
        black_hole_aoe.setScale (entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") ? 4.0 * entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") : 0.2);
		return true;
    });

    var black_hole_aoe2 = renderer.bindProperty("fiskheroes:forcefield");
    black_hole_aoe2.color.set(0xFFFFFF);
    black_hole_aoe2.setShape(36, 18).setOffset(0.0, 0.0, -10.0);
    black_hole_aoe2.setCondition(entity => {
		black_hole_aoe2.opacity = (entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") && entity.getData("tgheroes:dyn/black_hole")) * 1.0;
        black_hole_aoe2.setScale (entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") ? 3.0 * entity.getInterpolatedData("tgheroes:dyn/black_hole_timer") : 0.15);
		return true;
    });


    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.includeEffects(galan_helmet);
    glow.color.set(0x9400d3);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);	
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	renderer.removeCustomAnimation("basic.BLOCKING");

    addAnimation(renderer, "beter.CHARGED_BEAM", "fiskheroes:aiming_fpcorr").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    addAnimationWithData(renderer, "hole.AOE", "tgheroes:galactus_black_hole", "tgheroes:dyn/black_hole_timer").setCondition(entity => entity.getData("tgheroes:dyn/black_hole"));
    utils.addFlightAnimationWithLanding(renderer, "iron_man.FLIGHT", "fiskheroes:flight/iron_man.anim.json");
    utils.addHoverAnimation(renderer, "iron_man.HOVER", "fiskheroes:flight/idle/iron_man");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "HELMET") {
            galan_helmet.render();
        }	


        if (renderLayer == "CHESTPLATE" && entity.getInterpolatedData("tgheroes:dyn/field_timer") > 0) {
            magic1.render();
            magic2.render();
            magic3.render();
            magic4.render();          
            magic5.render();
            magic6.render();
            
            }

    glow.opacity = entity.getInterpolatedData("fiskheroes:teleport_timer");
    glow.render();
}
