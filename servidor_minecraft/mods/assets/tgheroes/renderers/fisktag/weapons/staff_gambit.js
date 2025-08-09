loadTextures({
    "bo_staff": "tgheroes:melee/bo_staff"
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;


var model;
var railgun_charge = implement("fisktag:external/railgun_charge");

var lines;
function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:bo_staff", "bo_staff", null);

    lines = railgun_charge.create(renderer, "tgheroes:energy_charge", 0x9400d3, 1.0, 1.0, 35.0, [1.1, 1.1]);
    lines.setOffset(0, -7.0, 0);



}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        
            renderer.setModel(model);
        
         cancelAnimations = false;
    
    
        glProxy.rotate(0, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0.05, -0.8, -0.05);

        glProxy.scale(1.75);

        if (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON") {
            lines.render(entity.getData("fiskheroes:energy_charging") * 50);
        }


}
