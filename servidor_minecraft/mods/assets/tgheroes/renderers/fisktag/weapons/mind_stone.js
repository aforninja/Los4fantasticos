loadTextures({
    "stone": "tgheroes:no_weapon_stuff/mind_stone"
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;


var model;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:infinity_stone", "stone", null);
    
    renderer.setModel(model);

}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        
         cancelAnimations = false;
    
    
        glProxy.rotate(0.25, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0.05, -0.7, -0.05);

        glProxy.scale(0.5);

       

}
