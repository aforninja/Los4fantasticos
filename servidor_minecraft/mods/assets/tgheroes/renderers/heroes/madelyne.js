extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/madelyne/madelyne_layer1",
    "layer2": "tgheroes:x_men/madelyne/madelyne_layer2",
	"slim_arm": "tgheroes:x_men/madelyne/madelyne_slim",
	"lights_eyes": "tgheroes:x_men/madelyne/magic_light",
	"cape": "tgheroes:x_men/madelyne/madelyne_cape_hair"
});

var chest;
var utils = implement("fiskheroes:external/utils");
var utils;
var mandalas = implement("tgheroes:external/tao_mandal_test");
var spell;
var spell2;
var shield;
var capes = implement("fiskheroes:external/capes");
var cape;
var alexarm;
var alexarm_l;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => {
        if (entity.getInterpolatedData("fiskheroes:spell_fraction") || entity.getInterpolatedData("fiskheroes:beam_charge") || entity.getInterpolatedData("fiskheroes:shield_blocking_timer")) {
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
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	
	var color = 0xff2400;
    var circle = renderer.createResource("SHAPE", "tgheroes:circles_ad");
    var star = renderer.createResource("SHAPE", "tgheroes:star_ad");
    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:lines");
    spell = renderer.createEffect("fiskheroes:lines").setShape(star).setRenderer(beam);
    spell.color.set(color);
    spell.setOffset(1.0, 10.0, 0.0).setScale(3.2);
    spell.anchor.set("rightArm");
    spell.mirror = true;
	
	spell2 = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
    spell2.color.set(color);
    spell2.setOffset(1.0, 10.0, 0.0).setScale(3.2);
    spell2.anchor.set("rightArm");
    spell2.mirror = true;

    var magic = renderer.bindProperty("fiskheroes:spellcasting");
    magic.colorGeneric.set(color);
    magic.colorEarthCrack.set(color);
    magic.colorAtmosphere.set(color);
    magic.colorWhip.set(color);
	
	shield = mandalas.create(renderer, 0xf80000, circle, star, beam);

	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);

	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [-0.5, -6.0, 0.0], "size": [1.0, 1.0] }
    ]);

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:telepatic_beam", "head", 0xffffff, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [0.5, -6.0, 0.0], "size": [2.0, 2.0],}
    ]);
	
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:not_spin_beam", "body", 0xf80000, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [2.0, 2.0], "anchor": "rightArm" }
    ]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.BLOCKING");
	addAnimationWithData(renderer, "magic.BEAM", "fiskheroes:aiming_fpcorr", "fiskheroes:beam_charge");
    addAnimationWithData(renderer, "magic.BLOCKING", "tgheroes:aiming_fpcorr2", "fiskheroes:shield_blocking_timer")
        .priority = -5; 
    addAnimationWithData(renderer, "psionic.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "psionic.BLAST", "tgheroes:psi_beam", "fiskheroes:energy_projection_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }
	shield.render(entity, isFirstPersonArm);
	
	if (renderLayer == "CHESTPLATE") {
        chest.render();
		cape.render(entity);
		spell.progress = entity.getInterpolatedData("fiskheroes:spell_fraction") || entity.getInterpolatedData("fiskheroes:beam_charge") || entity.getInterpolatedData("fiskheroes:shield_blocking_timer");
        spell.render();
		spell2.progress = entity.getInterpolatedData("fiskheroes:spell_fraction") || entity.getInterpolatedData("fiskheroes:beam_charge") || entity.getInterpolatedData("fiskheroes:shield_blocking_timer");
        spell2.render();

    }
}