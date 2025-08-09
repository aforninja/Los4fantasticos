loadTextures({
    "standart": "tgheroes:melee/finka_nkvd"
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;


var model;

function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:finka_nkvd", "standart", null);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
            renderer.setModel(model);

var cancelAnimations = false;
    
    
        glProxy.rotate(0.25, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0, -1.4, -0.1);

        glProxy.scale(1.2);



}
