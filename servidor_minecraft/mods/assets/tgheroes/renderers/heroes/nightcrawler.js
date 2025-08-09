extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/nightcrawler/nightcrawler_layer1",
	"layer2": "tgheroes:x_men/nightcrawler/nightcrawler_layer2",
	"tail": "tgheroes:x_men/nightcrawler/tail_nightcrawler",
	"tail2": "tgheroes:x_men/nightcrawler/tail_segmetn"
});

var utils = implement("fiskheroes:external/utils");

function initEffects(renderer) {
	night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.firstPersonOnly = false;
	
	var model_tail = renderer.createResource("MODEL", "tgheroes:tail_nightcrawler");
    model_tail.texture.set("tail");
	model_tail.bindAnimation("tgheroes:tail_walk").setData((entity,data) => data.load(entity.getData("fiskheroes:moving") && entity.loop(40)));
    tail = renderer.createEffect("fiskheroes:model").setModel(model_tail);
    tail.anchor.set("body");
	tail.setOffset (0.0, -1.0, -2.0);
	
	utils.bindCloud(renderer, "fiskheroes:teleportation", "tgheroes:nightcrawler_teleport");
	
	var tails = utils.createModel(renderer, "tgheroes:nightcrawler_tail", "tail2");
	var tip = utils.createModel(renderer, "tgheroes:nightcrawler_speart", "tail2");
	var tentacles = renderer.bindProperty("fiskheroes:tentacles").setTentacles([
        { "offset": [16.0, -10.0, -6.0], "direction": [5.0, 0.0, -1.0] }
    ]);
    tentacles.anchor.set("body");
    tentacles.setSegmentModel(tails);
	tentacles.setHeadModel(tip);
    tentacles.segmentLength = 2.0;
    tentacles.segments = 80;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE" && !entity.getInterpolatedData("fiskheroes:tentacle_extend_timer")) {
        tail.render();
    }
}