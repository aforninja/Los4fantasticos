extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/sabretooth/sabretooth_layer1",
    "layer2": "tgheroes:x_men/sabretooth/sabretooth_layer2",
    "claws": "tgheroes:x_men/sabretooth/claws"
});

var utils = implement("fiskheroes:external/utils");
function init(renderer) {
    parent.init(renderer);

}
function initEffects(renderer) {
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
    var model_claws = renderer.createResource("MODEL", "tgheroes:claws");
    model_claws.texture.set("claws");
    model_claws.generateMirror();
    claws = renderer.createEffect("fiskheroes:model").setModel(model_claws);
    claws.anchor.set("leftArm");
    claws.setScale(0.25);
    claws.mirror = true;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);	
	utils.addFlightAnimation(renderer, "x_23.CRAWL", "tgheroes:wall_crawl");
	addAnimationWithData(renderer, "two.PUNCH", "tgheroes:shue_arm_left_punch").setData((entity,data) => data.load(entity.getData("fiskheroes:blade_timer") > 0.3 && entity.isPunching())).priority = 5;			
	utils.addAnimationEvent(renderer, "CEILING_CRAWL", "fiskheroes:crawl_ceiling");	
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        if (entity.getData("fiskheroes:blade_timer") > 0.4) {
            var blade_anchor = claws.anchor.set("leftArm");
            var blade_offSet = claws.setOffset(4.8, 15.5, 0.0);
            var blade_rot = claws.setRotation(0, 0, 0);
            
            claws.anchor = blade_anchor, blade_offSet, blade_rot;
            claws.render();
        }
        else {
            var back_anchor = claws.anchor.set("body");
            var back_offSet = claws.setOffset(5.0, 14.0, 0.0);
            var back_rot = claws.setRotation(0, 0, 0);

            claws.anchor = back_anchor, back_offSet, back_rot;
            claws.render();
        
         }		
	}
}
