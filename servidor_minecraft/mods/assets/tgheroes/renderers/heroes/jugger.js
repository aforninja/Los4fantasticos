extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:blank",
	"stand": "tgheroes:x_men/jugger/jugger",
	"big": "tgheroes:x_men/jugger/juggernout"
});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
		if (entity.as("DISPLAY").isStatic()) {
            return "stand";
        }
        return "layer1";
    });

    renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET");
}


function initEffects(renderer) {
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer"); 
	
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.isSprinting();
        return true;
    });
    shake.intensity = 0.95;
    
    var model_jugger_body = renderer.createResource("MODEL", "tgheroes:jugger_body");
    model_jugger_body.texture.set("big");
    jugger_body = renderer.createEffect("fiskheroes:model").setModel(model_jugger_body);
    jugger_body.anchor.set("body");
	jugger_body.setOffset(0, 7, 0);
	jugger_body.setScale(0.75); 

    var model_jugger_rightArm = renderer.createResource("MODEL", "tgheroes:jugger_rightarm");
    model_jugger_rightArm.texture.set("big");
    jugger_rightArm = renderer.createEffect("fiskheroes:model").setModel(model_jugger_rightArm);
    jugger_rightArm.anchor.set("leftArm");
	jugger_rightArm.setOffset(8, 7, 0);
	jugger_rightArm.setScale(0.75);  

    var model_jugger_leftArm = renderer.createResource("MODEL", "tgheroes:jugger_leftarm");
    model_jugger_leftArm.texture.set("big");
    jugger_leftArm = renderer.createEffect("fiskheroes:model").setModel(model_jugger_leftArm);
    jugger_leftArm.anchor.set("rightArm");
	jugger_leftArm.setOffset(-8, 7, 0);
	jugger_leftArm.setScale(0.75); 
	
	var model_jugger_rightLeg = renderer.createResource("MODEL", "tgheroes:jugger_rightleg");
    model_jugger_rightLeg.texture.set("big");
    jugger_rightLeg = renderer.createEffect("fiskheroes:model").setModel(model_jugger_rightLeg);
    jugger_rightLeg.anchor.set("rightLeg");
	jugger_rightLeg.setOffset(-2, -5, 0);
	jugger_rightLeg.setScale(0.75);  

    var model_jugger_leftLeg = renderer.createResource("MODEL", "tgheroes:jugger_leflleg");
    model_jugger_leftLeg.texture.set("big");
    jugger_leftLeg = renderer.createEffect("fiskheroes:model").setModel(model_jugger_leftLeg);
    jugger_leftLeg.anchor.set("leftLeg");
	jugger_leftLeg.setOffset(2, -5, 0);
	jugger_leftLeg.setScale(0.75); 
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	 renderer.removeCustomAnimation("basic.BLOCKING");
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	addAnimation(renderer, "jugger.RAM", "fiskheroes:speedster_sprint").setData((entity, data) => data.load(entity.isSprinting() && entity.isOnGround()));
	addAnimation(renderer, "jugger.WALK", "tgheroes:big_walk").setData((entity, data) => data.load(entity.exists()));
}

function render(entity, renderLayer, isFirstPersonArm) {
	
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE", "HELMET", "LEGGINGS", "BOOTS" && !entity.as("DISPLAY").isStatic()) {
		jugger_rightArm.render();
		jugger_leftArm.render();
		jugger_body.render();
		jugger_leftLeg.render();
		jugger_rightLeg.render();
    }
}