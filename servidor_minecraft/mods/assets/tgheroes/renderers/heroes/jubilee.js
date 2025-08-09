extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/jubi/jubi_layer1",
    "layer2": "tgheroes:x_men/jubi/jubi_layer2",
	"slim_arm": "tgheroes:x_men/jubi/jubilee",
	"coat": "tgheroes:x_men/jubi/coat_jubi",
});

var alexarm;
var alexarm_l;
var utils = implement("fiskheroes:external/utils");
var magic;
var magic2;
var magic3;
var magic4;
var magic5;
var magic6;
var magic7;
var magic8;
var magic9;
var magic10;
var magic11;
var magic12;



function initEffects(renderer) {
	var model_coat = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat.texture.set("coat");
    model_coat.generateMirror();
    coat = renderer.createEffect("fiskheroes:model").setModel(model_coat);
    coat.anchor.set("rightLeg");
	coat.setOffset (-1.6, -12.0, 0.25);
	coat.setScale (1.0);
    coat.mirror = true;
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0x92f3ff, [
        { "firstPerson": [-4., 3.75, -11.0], "offset": [0.0, 9.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0x7a26c2, [
        { "firstPerson": [-4.5, 3.75, -3.0], "offset": [0.0, 9.0, 4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0xff9327, [
        { "firstPerson": [-4.5, 3.75, -5.0], "offset": [0.0, 9.0, 2.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0x93e395, [
        { "firstPerson": [-6.0, 3.75, -7.0], "offset": [-2.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0x83c5ff, [
        { "firstPerson": [-0.5, 3.75, -7.0], "offset": [4.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0xfff34e, [
        { "firstPerson": [-8.5, 3.75, -7.0], "offset": [-4.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0xfd80bb, [
        { "firstPerson": [-0.5, 3.75, -3.0], "offset": [4.0, 9.0, 4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:jubilee_beam", "rightArm", 0xeb1a1d, [
        { "firstPerson": [-8.5, 3.75, -11.0], "offset": [-4.0, 9.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));
	
	//BEAM
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:not_spin_beam", "rightArm", 0xeb1a1d, [
        { "firstPerson": [-8.5, 3.75, -11.0], "offset": [0.0, 9.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0x92f3ff, [
        { "firstPerson": [-4., 3.75, -11.0], "offset": [0.0, 9.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0x7a26c2, [
        { "firstPerson": [-4.5, 3.75, -3.0], "offset": [0.0, 9.0, 4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0xff9327, [
        { "firstPerson": [-4.5, 3.75, -5.0], "offset": [0.0, 9.0, 2.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0x93e395, [
        { "firstPerson": [-6.0, 3.75, -7.0], "offset": [-2.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0x83c5ff, [
        { "firstPerson": [-0.5, 3.75, -7.0], "offset": [4.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0xfff34e, [
        { "firstPerson": [-8.5, 3.75, -7.0], "offset": [-4.0, 9.0, 0.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:jubilee_beam", "rightArm", 0xfd80bb, [
        { "firstPerson": [-0.5, 3.75, -3.0], "offset": [4.0, 9.0, 4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_antimatter"));
	

	//GLOWING BEAM
	var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:chi_beam");
    magic = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, -1.0, 0], "end": [0.0, 2.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic.setOffset(-1.0, 2.0, 0.0).setScale(4.3);
    magic.anchor.set("leftArm");
    magic.mirror = true;	
	magic2 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, -1.0, 0], "end": [0.0, 2.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic2.setOffset(1.0, 2.0, 0.0).setScale(4.3);
    magic2.anchor.set("rightArm");
    magic2.mirror = true;
	magic3 = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, 0.0, 0], "end": [0.0, -1.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic3.setOffset(-1.0, 8.0, 0.0).setScale(4.3);
    magic3.anchor.set("leftArm");
    magic3.mirror = true;
	magic4 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, 0.0, 0], "end": [0.0, -1.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic4.setOffset(1.0, 8.0, 0.0).setScale(4.3);
    magic4.anchor.set("rightArm");
    magic4.mirror = true;
	
	magic5 = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, -1.0, 0], "end": [0.0, 2.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
	magic5.setOffset(-1.0, 4.0, 0.0).setScale(4.3);
    magic5.anchor.set("leftLeg");
    magic5.mirror = true;	
	magic6 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, -1.0, 0], "end": [0.0, 2.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic6.setOffset(1.0, 4.0, 0.0).setScale(4.3);
    magic6.anchor.set("rightLeg");
    magic6.mirror = true;
	magic7 = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, 0.0, 0], "end": [0.0, -1.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic7.setOffset(-1.0, 10.0, 0.0).setScale(4.3);
    magic7.anchor.set("leftLeg");
    magic7.mirror = true;
	magic8 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, 0.0, 0], "end": [0.0, -1.0, 0.0], "size": [3.0, 3.0, 3.0]},
    ]);
    magic8.setOffset(1.0, 10.0, 0.0).setScale(4.3);
    magic8.anchor.set("rightLeg");
    magic8.mirror = true;
	
	magic9 = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, 1.0, 0], "end": [0.0, -2.0, 0.0], "size": [6.0, 6.0, 3.0]},
    ]);
	magic9.setOffset(-1.0, 0.0, 0.0).setScale(4.3);
    magic9.anchor.set("head");
    magic9.mirror = true;	
	magic10 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, 1.0, 0], "end": [0.0, -2.0, 0.0], "size": [6.0, 6.0, 3.0]},
    ]);
    magic10.setOffset(1.0, 0.0, 0.0).setScale(4.3);
    magic10.anchor.set("head");
    magic10.mirror = true;
	
	magic11 = utils.createLines(renderer, beam, 0xdf73ff, [
        {"start": [0, 1.0, 0], "end": [0.0, -2.0, 0.0], "size": [4.0, 6.0, 3.0]},
    ]);	
    magic11.setOffset(-1.0, 8.0, 0.0).setScale(4.3);
    magic11.anchor.set("body");
    magic11.mirror = true;
	magic12 = utils.createLines(renderer, beam, 0xfb7efd, [
    {"start": [0, 1.0, 0], "end": [0.0, -2.0, 0.0], "size": [4.0, 6.0, 3.0]},
    ]);
    magic12.setOffset(1.0, 8.0, 0.0).setScale(4.3);
    magic12.anchor.set("body");
    magic12.mirror = true;
		
    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
	addAnimationWithData(renderer, "beam.AIMING", "fiskheroes:aiming", "fiskheroes:beam_shooting_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        chest.render();
    }
		coat.render();
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }
	
	if (renderLayer == "CHESTPLATE") {
	magic.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic.render()
	magic2.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic2.render();
	magic3.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic3.render();
	magic4.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic4.render();
	
	magic5.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic5.render()
	magic6.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic6.render();
	magic7.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic7.render();
	magic8.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic8.render();
	
	magic9.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic9.render();
	magic10.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic10.render();
    
	magic11.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic11.render();
	magic12.progress = (entity.getData('fiskheroes:beam_shooting') > 0);
	magic12.render();
    }
	
}
