extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/quicksilver/quicksilver_layer1",
	"layer2": "tgheroes:x_men/quicksilver/quicksilver_layer2"
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var speedster_powers = implement("tgheroes:external/speedster_utils");
var tornado5;
var tornado6;
var tornado7;
var tornado8;
var tornado9;
var tornado10;

var lightning5;
var lightning6;
var lightning7;
var lightning8;
var lightning9;
var lightning10;
function init(renderer) {
    parent.init(renderer);

}
function initEffects(renderer) {
    speedster.init(renderer, "tgheroes:quicksilver_trail");
	speedster_powers.init(renderer, "tgheroes:quicksilver_trail", utils);

	var tornado = renderer.createResource("BEAM_RENDERER", "tgheroes:tornado");
	var lightning = renderer.createResource("BEAM_RENDERER", "fiskheroes:lightning_cast");
	

	
	tornado5 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, -1.5, 0], "end": [0.0, 3.7, 0.0], "size": [30.0, 30.0]},]);
    tornado5.anchor.set("body");
    tornado5.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(20.0, 15.0, 20.0);
	
	tornado6 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 3.5, 0], "end": [0.0, 6.7, 0.0], "size": [35.0, 35.0]},]);
    tornado6.anchor.set("body");
    tornado6.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(22.0, 15.0, 22.0);
	
	tornado7 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 6.5, 0], "end": [0.0, 9.7, 0.0], "size": [40.0, 40.0]},]);
    tornado7.anchor.set("body");
    tornado7.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(24.0, 15.0, 24.0);
	
	tornado8 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 9.5, 0], "end": [0.0, 12.7, 0.0], "size": [45.0, 45.0]},]);
    tornado8.anchor.set("body");
    tornado8.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(26.0, 15.0, 26.0);
	
	tornado9 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 12.5, 0], "end": [0.0, 15.7, 0.0], "size": [50.0, 50.0]},]);
    tornado9.anchor.set("body");
    tornado9.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(28.0, 15.0, 28.0);
	
	tornado10 = utils.createLines(renderer, tornado, 0x21304F, [
        {"start": [0, 15.5, 0], "end": [0.0, 18.0, 0.0], "size": [55.0, 55.0]},]);
    tornado10.anchor.set("body");
    tornado10.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(30.0, 15.0, 30.0);


    lightning5 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, -1.5, 0], "end": [0.0, 3.7, 0.0], "size": [3.0, 3.0]},]);
    lightning5.anchor.set("body");
    lightning5.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(20.0, 15.0, 20.0);
	
	lightning6 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, 3.5, 0], "end": [0.0, 6.7, 0.0], "size": [3.0, 3.0]},]);
    lightning6.anchor.set("body");
    lightning6.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(22.0, 15.0, 22.0);
	
	lightning7 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, 6.5, 0], "end": [0.0, 9.7, 0.0], "size": [4.0, 4.0]},]);
    lightning7.anchor.set("body");
    lightning7.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(24.0, 15.0, 24.0);
	
	lightning8 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, 9.5, 0], "end": [0.0, 12.7, 0.0], "size": [4.0, 4.0]},]);
    lightning8.anchor.set("body");
    lightning8.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(26.0, 15.0, 26.0);
	
	lightning9 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, 12.5, 0], "end": [0.0, 15.7, 0.0], "size": [5.0, 5.0]},]);
    lightning9.anchor.set("body");
    lightning9.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(28.0, 15.0, 28.0);
	
	lightning10 = utils.createLines(renderer, lightning, 0x21304F, [
        {"start": [0, 15.5, 0], "end": [0.0, 18.0, 0.0], "size": [5.0, 5.0]},]);
    lightning10.anchor.set("body");
    lightning10.setOffset(0.0, 0.0, 0.0).setRotation(180.0, 0.0, 0.0).setScale(30.0, 15.0, 30.0);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
		
    addAnimationWithData(renderer, "tornado.AOE", "tgheroes:run", "tgheroes:dyn/speedtornado_timer").setCondition(entity => entity.getData("tgheroes:dyn/speedtornado"));
    addAnimationWithData(renderer, "spin.ULT", "tgheroes:spin_all", "tgheroes:dyn/speedtornado_timer").setCondition(entity => entity.getData("tgheroes:dyn/speedtornado"));
	
}

function render(entity, renderLayer, isFirstPersonArm) {


		
		tornado5.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado5.render() 
		tornado6.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado6.render() 
		tornado7.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado7.render() 		
		tornado8.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado8.render() 		
		tornado9.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado9.render() 		
		tornado10.opacity = entity.getData("tgheroes:dyn/speedtornado")
        tornado10.render()
		
		
		lightning5.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning5.render() 
		lightning6.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning6.render() 
		lightning7.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning7.render() 		
		lightning8.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning8.render() 		
		lightning9.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning9.render() 		
		lightning10.opacity = entity.getData("tgheroes:dyn/speedtornado")
        lightning10.render()

}

