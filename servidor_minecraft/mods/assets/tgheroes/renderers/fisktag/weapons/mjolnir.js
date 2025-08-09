loadTextures({
    "standart": "tgheroes:melee/mjolnir",
    "mcu": "tgheroes:melee/mjolnir_mcu",
    "herald": "tgheroes:melee/mjolnir_herald"
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;

var model;
var model_mcu; 
var model_herald;


function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:mjolnir", "standart", null);
    model_mcu = utils.createModel(renderer, "tgheroes:mjolnir", "mcu", null);
    model_herald = utils.createModel(renderer, "tgheroes:mjolnir", "herald", null);	
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/rivals"){
            renderer.setModel(model_mcu);
        } else if(entity.getWornChestplate().suitType() == "tgheroes:psylocke/original"){
            renderer.setModel(model_herald);
        }
         else {
            renderer.setModel(model);
        }
var cancelAnimations = false;
    
    
        glProxy.rotate(0.25, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0, -1, 0);

        glProxy.scale(1.5);



}
