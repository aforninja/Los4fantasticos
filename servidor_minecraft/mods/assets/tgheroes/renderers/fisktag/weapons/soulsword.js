loadTextures({
    "soulsword": "tgheroes:melee/soulsword",
    "soul_light": "tgheroes:melee/soulsword_light",
    "darkchyld_soulsword": "tgheroes:melee/darkchyld_soulsword",
    "chyld_light": "tgheroes:melee/darkchyld_soulsword_light"
});

var utils = implement("fisktag:external/utils");

var cancelAnimations = false;


var model;
var model_darkchyld;
var railgun_charge = implement("fisktag:external/railgun_charge");

var lines;
function init(renderer) {
    model = utils.createModel(renderer, "tgheroes:soulsword", "soulsword", "soul_light");
    model_darkchyld = utils.createModel(renderer, "tgheroes:soulsword_darkchyld", "darkchyld_soulsword", "chyld_light");

    lines = railgun_charge.create(renderer, "tgheroes:soulsword_charge", 0xfee028, 1.0, 1.0, 30.0, [2, 2]);
    lines.setOffset(0, -16.5, 0);

    lines2 = railgun_charge.create(renderer, "tgheroes:soulsword_charge", 0xcc1b00, 2.0, 1.0, 35.0, [2, 2]);
    lines2.setOffset(0, -20.5, 0);


    model.bindAnimation("tgheroes:magik_guard").setData((entity, data) => {
		
		if (cancelAnimations) {
            data.load(0);
            return;
        }
		
        data.load((entity.getHeldItem().name() == "fisktag:weapon" && entity.getHeldItem().isWeapon()) && entity.as("PLAYER").isUsingItem());
    });

    model_darkchyld.bindAnimation("tgheroes:magik_guard").setData((entity, data) => {
		
		if (cancelAnimations) {
            data.load(0);
            return;
        }
		
        data.load((entity.getHeldItem().name() == "fisktag:weapon" && entity.getHeldItem().isWeapon()) && entity.as("PLAYER").isUsingItem());
    });

}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
        if(entity.getData("tgheroes:dyn/darkchild_timer") > 0){
             renderer.setModel(model_darkchyld);

             
        }
         else {
            renderer.setModel(model);
        }
         cancelAnimations = false;
    
    
        glProxy.rotate(0.25, 0, 0, 1);
		glProxy.rotate(0, 1, 0, 0);
        
		glProxy.translate(0.05, -1.6, -0.05);

        glProxy.scale(1.5);

        if (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON") {
            lines.render(entity.getData("fiskheroes:energy_charging") && !entity.getData("tgheroes:dyn/darkchild_timer") > 0);
        }

        if (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON") {
            lines2.render(entity.getData("fiskheroes:energy_charging") && entity.getData("tgheroes:dyn/darkchild_timer") > 0);
        }

}
