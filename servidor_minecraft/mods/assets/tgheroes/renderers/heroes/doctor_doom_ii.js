extend("tgheroes:doctor_doom");
loadTextures({
    "layer1": "tgheroes:fantastic_4/doom/infamous_iron_man_hooded",
	"cape": "tgheroes:fantastic_4/doom/infamous_iron_man_cape",
	"lights": "tgheroes:fantastic_4/doom/ii_lights",
	"blank": "tgheroes:blank",
    "tp_ii": "tgheroes:fantastic_4/doom/doom_tp_ii.tx.json",
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var cape;
var iron_man_boosters = implement("fiskheroes:external/iron_man_boosters");
var boosters;
var helmet;
var mandalas = implement("tgheroes:external/tao_mandal_test");
var spell;
var shield;
var aoe_charge;
var speedster_powers = implement("tgheroes:external/doom_hurt");
function init(renderer) {
    parent.init(renderer);	
	renderer.setTexture((entity, renderLayer) => {
            var timer = entity.getInterpolatedData("tgheroes:dyn/teleport");
            return timer < 0.01 ? "layer1" : timer < 0.7 && entity.getInterpolatedData("fiskheroes:teleport_timer") > 0 ? "tp_ii" : timer < 0.7 && entity.getInterpolatedData("fiskheroes:teleport_timer") == 0 ? "tp_ii" : "blank";
    });
	renderer.setLights((entity, renderLayer) => {
		if (entity.exists() && !entity.getInterpolatedData("tgheroes:dyn/teleport")) {
			return renderLayer == "LEGGINGS" ? "lights" : "lights";
		}
		return renderLayer == "CHESTPLATE" ? null : null;
	});
}

function initEffects(renderer) {
	
	utils.bindCloud(renderer, "fiskheroes:telekinesis", "tgheroes:doom_ii_telekinesis");
	
	
	renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return entity.getInterpolatedData("tgheroes:dyn/teleport") > 0 ? 0.999  : 1;
    });
	
	helmet = renderer.createEffect("fiskheroes:model");
    helmet.setModel(utils.createModel(renderer, "tgheroes:supreme_cloak", "ears"));
    helmet.anchor.set("head");
	helmet.setScale(1.0);
	
	speedster_powers.init(renderer, "tgheroes:lightning_infamous");

	var color = 0x2FCB68;
	var color2 = 0x2FCB68;
	var color3 = 0x003D19;
	
    var circle = renderer.createResource("SHAPE", "tgheroes:circles_ad");
    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:doom_magic");
    var beam2 = renderer.createResource("BEAM_RENDERER", "tgheroes:lines");
    var beam3 = renderer.createResource("BEAM_RENDERER", "tgheroes:doom_tp");
    var beam4 = renderer.createResource("BEAM_RENDERER", "tgheroes:doom_darkhold");
	var beam1 = renderer.createResource("BEAM_RENDERER", "tgheroes:doom_booster");
	var triangle = renderer.createResource("SHAPE", "tgheroes:triangle_glyph");
	
	spell = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam2);
    spell.color.set(color);
    spell.setOffset(1.0, 8.0, 0.0).setScale(4.2);
    spell.anchor.set("rightArm");
    spell.mirror = true;
	
	spell_2 = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam2);
    spell_2.color.set(0xff242a);
    spell_2.setOffset(1.0, 8.0, 0.0).setScale(4.2);
    spell_2.anchor.set("rightArm");
    spell_2.mirror = true;

    var magic = renderer.bindProperty("fiskheroes:spellcasting");
    magic.colorGeneric.set(color);
    magic.colorEarthCrack.set(color);
    magic.colorAtmosphere.set(color);
    magic.colorWhip.set(color);
	
	shield = mandalas.create(renderer, color, circle, triangle, beam2);
	
	tp_beam = utils.createLines(renderer, beam3, color, [
        {"start": [0, -1.0, 0], "end": [0.0, -0.8, 0.0], "size": [32.0, 32.0, 32.0]},
    ]);
    tp_beam.setOffset(0.0, 0.0, 0.0).setScale(10.0);
    tp_beam.anchor.set("body");
		
	utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:doom_beam", "body", color2, [
        {"firstPerson": [4.5, 3.75, -7.0], "offset": [0.5, 12.0, 0.0], "size": [1.0, 1.0], "anchor": "leftArm" },
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [-0.5, 12.0, 0.0], "size": [1.0, 1.0], "anchor": "rightArm" }
    ]);
		
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam, "rightArm", color, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 0 && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam, "leftArm", color, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 1 && entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "body", color, [
		{ "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [4.0, 4.0]}
    ]).setCondition(entity => entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	//DARKHOLD
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam4, "rightArm", 0xff242a, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 0 && !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", beam4, "leftArm", 0xff242a, [
        {"firstPerson": [-4.5, 3.75, -7.0], "offset": [0.0, 0.0, 0.0], "size": [2.0, 2.0] }
    ]).setCondition(entity => entity.getData("tgheroes:dyn/aim_int") == 1 && !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	utils.bindBeam(renderer, "fiskheroes:energy_projection", beam4, "body", 0xff242a, [
		{ "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [4.0, 4.0]}
    ]).setCondition(entity => !entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty());
	
	aoe_charge = utils.createLines(renderer, "fiskheroes:lightning_cast", color2, [
        {"start": [-2.0, 2.0, -3.0], "end": [2.0, 2.0, -3.0], "size": [2.0, 2.0, 2.0]},
    ]);
    aoe_charge.setOffset(0.0, 0.0, 0.0).setScale(2.0);
    aoe_charge.anchor.set("body");
	
	var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(color3);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(2.0);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.01 && entity.getData("tgheroes:dyn/spell_heal");
        return true;
    });
	
	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.8;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.7;
    physics.flareElasticity = 5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");

	boosters = iron_man_boosters.create(renderer, "tgheroes:green_fire_layer_0", true);
	initEquipped(renderer);	
	
}

function initEquipped(renderer) {

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.75, "offset": [11.0, -4.0, 8.0], "rotation": [0.0, 0.0, 36.25] }
    ]).slotIndex = 0;
	
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "CHESTPLATE" && !entity.getInterpolatedData("tgheroes:dyn/teleport")) {
			
		cape.render(entity);
	}
	
	helmet.render();	
	
	if(entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty()){
	spell.progress = entity.getInterpolatedData("fiskheroes:spell_fraction") || entity.getData("fiskheroes:aiming");
    spell.render();
	}
	if(!entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty()){
	spell_2.progress = entity.getInterpolatedData("fiskheroes:spell_fraction") || entity.getData("fiskheroes:aiming");
    spell_2.render();
	}
	
	if (entity.getWornChestplate().suitType() == "tgheroes:doctor_doom/ii") {
            boosters.render(entity, renderLayer, isFirstPersonArm, true);
        }
	
	if (entity.getData ("tgheroes:dyn/spell_basic")) {
	shield.render(entity, isFirstPersonArm);
	}
	
	var bs = entity.getInterpolatedData("tgheroes:dyn/teleport");
	
	tp_beam.opacity = (entity.getInterpolatedData("tgheroes:dyn/teleport") > 0);
	tp_beam.setOffset(0, (bs ? 40.0 * bs : -40), 0);
	tp_beam.render();

	if (entity.getInterpolatedData("tgheroes:dyn/electric_timer") < 0.19 && entity.getData("tgheroes:dyn/electric")){
	aoe_charge.opacity = (entity.getInterpolatedData("tgheroes:dyn/electric_timer") > 0.05);
	aoe_charge.render();
	}
}