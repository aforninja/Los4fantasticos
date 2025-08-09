extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/kitty/kitty_layer1",
    "slim_arm": "tgheroes:x_men/kitty/kitty",
    "layer2": "tgheroes:x_men/kitty/kitty",
	"hair": "tgheroes:x_men/kitty/kitty_ponytale",
});
var chest;
var utils = implement("fiskheroes:external/utils");
var alexarm;
var alexarm_l;
var vibration;

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
	
	var model_hair = renderer.createResource("MODEL", "tgheroes:ponytale");
    model_hair.texture.set("hair", null);
	model_hair.bindAnimation("tgheroes:ponytail").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    hair = renderer.createEffect("fiskheroes:model").setModel(model_hair);
    hair.anchor.set("head");
	

    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1.0).setYOffset(1);
	
	vibration = renderer.createEffect("fiskheroes:vibration");
	vibration.includeEffects(chest, alexarm, alexarm_l, hair);
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS") {
        alexarm.render();
        alexarm_l.render();
    }
		
	if (entity.getWornHelmet()) {
		hair.render();
    }
	
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        chest.render();
    }
	
	 if ((!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") && entity.getInterpolatedData("fiskheroes:invisibility_timer") > 0.1) {
        vibration.render();
    }
}