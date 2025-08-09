loadTextures({
    "book": "tgheroes:no_weapon_stuff/darkhold",
    "light": "tgheroes:no_weapon_stuff/darkhold_light",
});

var utils = implement("fisktag:external/utils");

var model;
var cancelAnimations = false;

function init(renderer) {
    var model = utils.createModel(renderer, "tgheroes:darkhold", "book", "light");
	
    renderer.setModel(model);
	
	model.bindAnimation("tgheroes:darkhold_levitate").setData((entity, data) => {
		
		if (cancelAnimations) {
            data.load(0);
            return;
        }
		
        data.load(!entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && 
		entity.getInterpolatedData("tgheroes:dyn/chaos_timer") || entity.getInterpolatedData("tgheroes:dyn/no_mutants") || entity.getInterpolatedData("tgheroes:dyn/stand"));
    });

	
	
	model.bindAnimation("tgheroes:darkhold_inventory").setData((entity, data) => {
		if (cancelAnimations) {
            data.load(0);
            return;
        }
        data.load(entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() );
    });

	
	model.bindAnimation("tgheroes:darkhold_idle").setData((entity, data) => {
		if (cancelAnimations) {
            data.load(0);
            return;
        }
        data.load(!entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && !entity.getInterpolatedData("tgheroes:dyn/chaos") 
		&& !entity.getInterpolatedData("tgheroes:dyn/stand") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants_timer") && entity.loop(100));
    });
	
	model.bindAnimation("tgheroes:darkhold_idle").setData((entity, data) => {
		if (cancelAnimations) {
            data.load(0);
            return;
        }
        data.load(!entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && entity.getInterpolatedData("tgheroes:dyn/chaos_timer") > 0.99 
		&& !entity.getInterpolatedData("tgheroes:dyn/stand") && !entity.getInterpolatedData("tgheroes:dyn/no_mutants_timer") && entity.loop(100));
    });
	
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        glProxy.rotate(-36.25, 0, 0, 1);
		glProxy.rotate(-90, 1, 0, 0);
        
		glProxy.translate(0.05, -1.0, 1.1);
        glProxy.scale(1.0);

    if (renderType === "EQUIPPED_FIRST_PERSON") {
		glProxy.translate(0.0, 0.0, 0.0);
    cancelAnimations = false;
		
		
    }
	else if (renderType === "INVENTORY" || renderType === "ENTITY") {
		glProxy.translate(0.0, 0.0, 0.0);
    cancelAnimations = false;
		
	
	}
    else if (renderType === "EQUIPPED_IN_SUIT") {
    cancelAnimations = false;
	
        
		glProxy.translate(0.0, 0.0, 0.0);
		
		
	}
}
