loadTextures({
    "standart": "tgheroes:melee/psylocke_sword",
    "rivals": "tgheroes:melee/psylocke_sword_rivals",
    "blood": "tgheroes:melee/psylocke_sword_blood",
    "original": "tgheroes:melee/psylocke_original_sword",
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;


var model;
var model_rivals;
var model_blood;
var model_original;
var model_blank;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:psylocke_katana", "standart", null);
    model_rivals = utils.createModel(renderer, "tgheroes:psylocke_katana", "rivals", null);
    model_blood = utils.createModel(renderer, "tgheroes:psylocke_katana", "blood", null);	
    model_original = utils.createModel(renderer, "tgheroes:psylocke_katana", "original", null);	
    model_blank = utils.createModel(renderer, "tgheroes:psylocke_katana", null, null);	


    model.bindAnimation("tgheroes:psy_ult_1").setData((entity, data) => {
		if (cancelAnimations) {
            data.load(0);
            return;
        }
        data.load(!entity.getWornChestplate().nbt().getTagList("Equipment").getCompoundTag(0).isEmpty() && entity.getInterpolatedData("tgheroes:dyn/stand"));
    });
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        if(entity.getInterpolatedData("tgheroes:dyn/invis_timer")){
             renderer.setModel(model_blank);
        }
        else if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/blood"){
            renderer.setModel(model_blood);
        } else if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/rivals"){
            renderer.setModel(model_rivals);
        } else if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/original"){
            renderer.setModel(model_original);
        }
         else {
            renderer.setModel(model);
        }
var cancelAnimations = false;
    
    
        glProxy.rotate(0.25, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0, -0.85, -0.05);

        glProxy.scale(0.7);



}
