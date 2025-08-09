extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "tgheroes:x_men/deadpool/deadpool",
    "tp": "tgheroes:x_men/deadpool/pool_tp.tx.json",
    "blank": "tgheroes:blank",
	"scabbard": "tgheroes:x_men/deadpool/deadpool_xmen_scabbard",
    "katana": "tgheroes:x_men/deadpool/deadpool_xmen_katana",
    "gun": "tgheroes:x_men/deadpool/desert_eagle",
	"gun2": "tgheroes:blank",
	"katana2": "tgheroes:blank"
});

var utils = implement("fiskheroes:external/utils");
var scabbard;
var tp_beam; 

function init(renderer) {
    parent.init(renderer);	
	renderer.setTexture((entity, renderLayer) => {
            var timer = entity.getInterpolatedData("tgheroes:dyn/teleport");
            return timer < 0.01 ? "layer1" : timer < 0.7 && entity.getInterpolatedData("fiskheroes:teleport_timer") > 0 ? 
            "tp" : timer < 0.7 && entity.getInterpolatedData("fiskheroes:teleport_timer") == 0 ? "tp" : "blank";
    });
}

function initEffects(renderer) {

    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return entity.getInterpolatedData("tgheroes:dyn/teleport") > 0 ? 0.999  : 1;
    });

	scabbard = renderer.createEffect("fiskheroes:model");
    scabbard.setModel(utils.createModel(renderer, "fiskheroes:deadpool_scabbard", "scabbard"));
    scabbard.anchor.set("body");
		
	var livery = renderer.bindProperty("fiskheroes:livery");
    livery.weaponType = "KATANA";
    livery.texture.set("katana", "katana2");
	
	var livery2 = renderer.bindProperty("fiskheroes:livery");
    livery2.weaponType = "DESERT_EAGLE";
    livery2.texture.set("gun", "gun2");

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.535, "offset": [-3.05, 0.52, 3.0], "rotation": [-148.0, 90.0, 0.0] },
        { "anchor": "body", "scale": 0.535, "offset": [3.05, 0.52, 3.0], "rotation": [-148.0, -90.0, 0.0] }
    ]).setCondition(entity => !entity.getInterpolatedData("tgheroes:dyn/teleport") > 0).slotIndex = 0;
    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "rightLeg", "scale": 0.7, "offset": [-2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] },
        { "anchor": "leftLeg", "scale": 0.7, "offset": [2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] }
    ]).setCondition(entity => !entity.getInterpolatedData("tgheroes:dyn/teleport") > 0).slotIndex = 1;

    var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:pool_tp");

    

    tp_beam = utils.createLines(renderer, beam, 0xFF6900, [
        {"start": [0, -1.0, 0.5], "end": [0.0, 2.5, 0.49], "size": [80.0, 1.0, 0.0]},
    ]);
    tp_beam.setOffset(0.0, 0.0, 0.0).setScale(10.0);
    tp_beam.anchor.set("body");

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	
	addAnimationWithData(renderer, "pool.LAND", "tgheroes:deadpool_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;
	
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!entity.getInterpolatedData("tgheroes:dyn/teleport") > 0) {
        scabbard.render();
    }

	var bs = entity.getInterpolatedData("tgheroes:dyn/teleport");
	
	tp_beam.opacity = (entity.getInterpolatedData("tgheroes:dyn/teleport") > 0);
	tp_beam.setOffset(0, 0, (bs ? -15.0 * bs : 10));
	tp_beam.render();
}
