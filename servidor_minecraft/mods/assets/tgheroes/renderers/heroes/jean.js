extend("fiskheroes:hero_basic");
loadTextures({
	"layer1": "tgheroes:x_men/jean_gray/jean_gray_layer1",
    "slim_arm": "tgheroes:x_men/jean_gray/jean_gray",

	"phoenix_arm": "tgheroes:x_men/jean_gray/phoenix",
	"phoenix": "tgheroes:x_men/jean_gray/phoenix_layer1",

    "dark_phoenix_arm": "tgheroes:x_men/jean_gray/dark_phoenix",
	"dark_phoenix": "tgheroes:x_men/jean_gray/dark_phoenix_layer1",
    
    "white_phoenix_arm": "tgheroes:x_men/jean_gray/white_phoenix",
	"white_phoenix": "tgheroes:x_men/jean_gray/white_phoenix_layer1",

	"cape": "tgheroes:blank",
	"cape2": "tgheroes:x_men/jean_gray/jean_hair",

	"ponytail": "tgheroes:x_men/jean_gray/jean_gray_hair_model",


	"coat_p": "tgheroes:blank",
	"coat_dp": "tgheroes:blank",
	"coat_wp": "tgheroes:blank",


	"wing_angel": "tgheroes:x_men/jean_gray/phoenix_wings",
	"bird": "tgheroes:x_men/jean_gray/phoenix_bird",
	"lights_eyes": "tgheroes:x_men/jean_gray/phoenix_light"
});

var chest;
var utils = implement("fiskheroes:external/utils");
var utils;
var alexarm;
var alexarm_l;
var capes = implement("fiskheroes:external/capes");
var cape;
var cape2;
var glow;

function init(renderer) {
	parent.init(renderer);
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm");
	renderer.showModel("LEGGINGS", "rightLeg", "leftLeg");
    renderer.setTexture((entity, renderLayer) => {
		if ( entity.getData("tgheroes:dyn/phoenix")) {
            return "phoenix";
        }
        else if ( entity.getData("tgheroes:dyn/dark_phoenix")) {
            return "dark_phoenix";
        }
        else if ( entity.getData("tgheroes:dyn/white_phoenix")) {
            return "white_phoenix";
        }
		return  "layer1";
    });
	renderer.setLights((entity, renderLayer) => {
        if (entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix") || entity.getData("tgheroes:dyn/dark_phoenix")) {
            return renderLayer == "HELMET" ? "lights_eyes" : "lights_eyes";
        }
        return renderLayer == "CHESTPLATE" ? null : null;
    });
}

function initEffects(renderer) {
	var model_wings = renderer.createResource("MODEL", "tgheroes:wings_angel");
	model_wings.bindAnimation("tgheroes:wings_slow_flap").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && !entity.isSprinting() && entity.loop(35)));
	model_wings.bindAnimation("tgheroes:wings_fast_flop").setData((entity,data) => data.load(entity.getInterpolatedData('fiskheroes:flight_timer')
    && entity.isSprinting() && entity.loop(20)));
	model_wings.bindAnimation("tgheroes:wings_off").setData((entity,data) => data.load(!entity.getInterpolatedData('fiskheroes:flight_timer')));
    model_wings.texture.set("wing_angel");
    wings = renderer.createEffect("fiskheroes:model").setModel(model_wings);
    wings.anchor.set("body");
	wings.setOffset(0.0, 0.0, 1.0);
	
	var model_bird = renderer.createResource("MODEL", "tgheroes:phoenix");
    model_bird.texture.set(null, "bird");
    bird = renderer.createEffect("fiskheroes:model").setModel(model_bird);
    bird.anchor.set("body");
	bird.setOffset (32.0, 0.0, 5.0);

   

    var model_coat_p = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat_p.texture.set("coat_p");
    model_coat_p.generateMirror();
    coat_p = renderer.createEffect("fiskheroes:model").setModel(model_coat_p);
    coat_p.anchor.set("rightLeg");
	coat_p.setOffset (-1.8, -13.0, 0.25);
	coat_p.setScale (1.05);
    coat_p.mirror = true;

    var model_coat_dp = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat_dp.texture.set("coat_dp");
    model_coat_dp.generateMirror();
    coat_dp = renderer.createEffect("fiskheroes:model").setModel(model_coat_dp);
    coat_dp.anchor.set("rightLeg");
	coat_dp.setOffset (-1.8, -13.0, 0.25);
	coat_dp.setScale (1.05);
    coat_dp.mirror = true;

    var model_coat_wp = renderer.createResource("MODEL", "tgheroes:coat");
    model_coat_wp.texture.set("coat_wp");
    model_coat_wp.generateMirror();
    coat_wp = renderer.createEffect("fiskheroes:model").setModel(model_coat_wp);
    coat_wp.anchor.set("rightLeg");
	coat_wp.setOffset (-1.8, -13.0, 0.25);
	coat_wp.setScale (1.05);
    coat_wp.mirror = true;

   

    var model_hair = renderer.createResource("MODEL", "tgheroes:jean_gray_hair_model");
    model_hair.texture.set("ponytail", null);
	model_hair.bindAnimation("tgheroes:jean_tail").setData((entity,data) => data.load(entity.getLookVector().y() > 0));
    hair = renderer.createEffect("fiskheroes:model").setModel(model_hair);
    hair.anchor.set("head");
	
    utils.bindParticles(renderer, "tgheroes:phoenix_transform").setCondition(entity => entity.getData("tgheroes:dyn/phoenix_timer") !=0 && entity.getData("tgheroes:dyn/phoenix_timer") < 1
	|| entity.getData("tgheroes:dyn/dark_phoenix_timer") !=0 && entity.getData("tgheroes:dyn/dark_phoenix_timer") < 1
    || entity.getData("tgheroes:dyn/white_phoenix_timer") !=0 && entity.getData("tgheroes:dyn/white_phoenix_timer") < 1 
    || entity.getData("fiskheroes:flight_timer") !=0 && entity.getData("fiskheroes:flight_timer") < 1);
	
    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0xffffff);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.5);
    forcefield.setCondition(entity => {
		forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.05;
		return true;
    });


    //JEAN ULT START

    var jean_aoe = renderer.bindProperty("fiskheroes:forcefield");
    jean_aoe.color.set(0x09d1d1);
    jean_aoe.setShape(36, 18).setOffset(0.0, -10.0, 0.0);
    jean_aoe.setCondition(entity => {
		jean_aoe.opacity = (entity.getInterpolatedData("tgheroes:dyn/jean_timer") && entity.getData("tgheroes:dyn/jean")) * 0.3;
        jean_aoe.setScale (entity.getInterpolatedData("tgheroes:dyn/jean_timer") ? 4.0 * entity.getInterpolatedData("tgheroes:dyn/jean_timer") : 0.2);
		return true;
    });

    var jean_aoe2 = renderer.bindProperty("fiskheroes:forcefield");
    jean_aoe2.color.set(0xD9017A);
    jean_aoe2.setShape(36, 18).setOffset(0.0, -10.0, 0.0);
    jean_aoe2.setCondition(entity => {
		jean_aoe2.opacity = (entity.getInterpolatedData("tgheroes:dyn/jean_timer") && entity.getData("tgheroes:dyn/jean")) * 0.3;
        jean_aoe2.setScale (entity.getInterpolatedData("tgheroes:dyn/jean_timer") ? 3.0 * entity.getInterpolatedData("tgheroes:dyn/jean_timer") : 0.15);
		return true;
    });

    var jean_aoe3 = renderer.bindProperty("fiskheroes:forcefield");
    jean_aoe3.color.set(0x0c0bc9 );
    jean_aoe3.setShape(36, 18).setOffset(0.0, -10.0, 0.0);
    jean_aoe3.setCondition(entity => {
		jean_aoe3.opacity = (entity.getInterpolatedData("tgheroes:dyn/jean_timer") && entity.getData("tgheroes:dyn/jean")) * 0.3;
        jean_aoe3.setScale (entity.getInterpolatedData("tgheroes:dyn/jean_timer") ? 2.5 * entity.getInterpolatedData("tgheroes:dyn/jean_timer") : 0.1);
		return true;
    });

    var jean_aoe4 = renderer.bindProperty("fiskheroes:forcefield");
    jean_aoe4.color.set(0xff007f);
    jean_aoe4.setShape(36, 18).setOffset(0.0, -10.0, 0.0);
    jean_aoe4.setCondition(entity => {
		jean_aoe4.opacity = (entity.getInterpolatedData("tgheroes:dyn/jean_timer") && entity.getData("tgheroes:dyn/jean")) * 0.3;
        jean_aoe4.setScale (entity.getInterpolatedData("tgheroes:dyn/jean_timer") ? 2.0 * entity.getInterpolatedData("tgheroes:dyn/jean_timer") : 0.05);
		return true;
    });

   

    //JEAN ULT END

    //PHOENIX ULT START

    utils.bindParticles(renderer, "tgheroes:fire_aoe").setCondition(entity => entity.getData("tgheroes:dyn/phoenix_flame_timer") > 0.8 && entity.getData("tgheroes:dyn/phoenix_flame"));
    utils.bindParticles(renderer, "tgheroes:torch_nova").setCondition(entity => entity.getData("tgheroes:dyn/phoenix_flame_timer") > 0.6 && entity.getData("tgheroes:dyn/phoenix_flame"));

    //PHOENIX ULT END

    //DARK PHOENIX

        //TERROR

            utils.bindParticles(renderer, "tgheroes:terror").setCondition(entity => entity.getData("tgheroes:dyn/terror_timer") > 0 && entity.getData("tgheroes:dyn/terror"));


             var circle = renderer.createResource("SHAPE", "tgheroes:circles_ad");
             var beam = renderer.createResource("BEAM_RENDERER", "tgheroes:lines");

             ult = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
             ult.color.set(0xe8c751);
             ult.setOffset(0.0, 18.0, 0.0).setScale(100.0);
             ult.anchor.ignoreAnchor(true);

        //OBLIVION BURST

        utils.bindParticles(renderer, "tgheroes:phoenix_fire_aoe").setCondition(entity => entity.getData("tgheroes:dyn/oblivion_timer") > 0.8 && entity.getData("tgheroes:dyn/oblivion"));
        utils.bindParticles(renderer, "tgheroes:torch_nova").setCondition(entity => entity.getData("tgheroes:dyn/oblivion_timer") > 0.6 && entity.getData("tgheroes:dyn/oblivion"));

    //WHITE PHOENIX

        //SONG OF COSMOS

        utils.bindParticles(renderer, "tgheroes:cosmos_song").setCondition(entity => entity.getData("tgheroes:dyn/cosmos_song_timer") > 0.8 && entity.getData("tgheroes:dyn/cosmos_song"));

        //RADIANT REBIRTH

        utils.bindParticles(renderer, "tgheroes:radiant_rebirth").setCondition(entity => entity.getData("tgheroes:dyn/healing_timer") > 0.8 && entity.getData("tgheroes:dyn/healing"));

        //CROWN OF REBIRTH 

             ult2 = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
             ult2.color.set(0xFFEDB5);
             ult2.setOffset(0.0, -10.0, 0.0).setScale(6.0);
             ult2.anchor.set("head");


	var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;
	
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
	
	cape2 = capes.createGlider(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape2.effect.texture.set("cape2");
	
	utils.setOpacityWithData(renderer, 0.999, 0.999, "fiskheroes:intangibility_timer");
	 
	alexarm = renderer.createEffect("fiskheroes:model");
    alexarm.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "slim_arm", null));
    alexarm.anchor.set("rightArm");
	alexarm.setOffset (-6.0, -2.05, 0.0);

    alexarm_l = renderer.createEffect("fiskheroes:model");
    alexarm_l.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "slim_arm", null));
    alexarm_l.anchor.set("leftArm");
	alexarm_l.setOffset (5.0, -2.05, 0.0);
	
	alexarm_p = renderer.createEffect("fiskheroes:model");
    alexarm_p.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "phoenix_arm", null));
    alexarm_p.anchor.set("rightArm");
	alexarm_p.setOffset (-6.0, -2.05, 0.0);

    alexarm_l_p = renderer.createEffect("fiskheroes:model");
    alexarm_l_p.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "phoenix_arm", null));
    alexarm_l_p.anchor.set("leftArm");
	alexarm_l_p.setOffset (5.0, -2.05, 0.0);

    alexarm_dp = renderer.createEffect("fiskheroes:model");
    alexarm_dp.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "dark_phoenix_arm", null));
    alexarm_dp.anchor.set("rightArm");
	alexarm_dp.setOffset (-6.0, -2.05, 0.0);

    alexarm_l_dp = renderer.createEffect("fiskheroes:model");
    alexarm_l_dp.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "dark_phoenix_arm", null));
    alexarm_l_dp.anchor.set("leftArm");
	alexarm_l_dp.setOffset (5.0, -2.05, 0.0);

    alexarm_wp = renderer.createEffect("fiskheroes:model");
    alexarm_wp.setModel(utils.createModel(renderer, "tgheroes:alex_arm_r", "white_phoenix_arm", null));
    alexarm_wp.anchor.set("rightArm");
	alexarm_wp.setOffset (-6.0, -2.05, 0.0);

    alexarm_l_wp = renderer.createEffect("fiskheroes:model");
    alexarm_l_wp.setModel(utils.createModel(renderer, "tgheroes:alex_arm_l", "white_phoenix_arm", null));
    alexarm_l_wp.anchor.set("leftArm");
	alexarm_l_wp.setOffset (5.0, -2.05, 0.0);
	
	utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "tgheroes:telepatic_beam", "head", 0xff3d9b, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [-0.5, -6.0, 0.0], "size": [1.0, 1.0] }
    ]);

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "tgheroes:telepatic_beam", "head", 0xff3d9b, [
        { "firstPerson": [0.0, -6.15, 0.0], "offset": [-0.5, -6.0, 0.0], "size": [1.0, 1.0] }
    ]);

	chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);


	utils.bindBeam(renderer, "fiskheroes:energy_projection", "tgheroes:phoenix_beam", "body", 0xe8c751, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [0.5, 12.0, 0.0], "size": [2.0, 2.0], "anchor": "leftArm" },
        { "firstPerson": [3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [2.0, 2.0], "anchor": "rightArm" }
    ]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
	renderer.removeCustomAnimation("basic.ENERGY_PROJ");
	renderer.removeCustomAnimation("basic.AIMING");
	renderer.removeCustomAnimation("basic.BLOCKING");
	renderer.removeCustomAnimation("basic.CHARGED_BEAM");  
	utils.addFlightAnimation(renderer, "wings.FLIGHT", "fiskheroes:flight/propelled_hands.anim.json");
    utils.addHoverAnimation(renderer, "wings.HOVER", "fiskheroes:flight/idle/propelled_hands");
    addAnimationWithData(renderer, "psionic.BEAM", "tgheroes:psi_blast", "fiskheroes:beam_shooting_timer");
	addAnimationWithData(renderer, "psionic.BLOCKING", "tgheroes:psi_blast", "fiskheroes:shield_blocking_timer");    
    addAnimationWithData(renderer, "psionic.AIMING", "tgheroes:psi_blast", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "psionic.BLAST", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
	if (renderLayer == "CHESTPLATE") {
		if (entity.getData("fiskheroes:flight_timer") > 0.9) {
            wings.render();
        }
    
    }
	
	if( entity.getData("tgheroes:dyn/phoenix_timer") !=0 && entity.getData("tgheroes:dyn/phoenix_timer") < 1 
        || entity.getData("tgheroes:dyn/dark_phoenix_timer") !=0 && entity.getData("tgheroes:dyn/dark_phoenix_timer") < 1 
        || entity.getData("tgheroes:dyn/white_phoenix_timer") !=0 && entity.getData("tgheroes:dyn/white_phoenix_timer") < 1 
        || entity.getData("tgheroes:dyn/phoenix_flame_timer") > 0.6 && entity.getData("tgheroes:dyn/phoenix_flame")
        || entity.getData("tgheroes:dyn/oblivion_timer") > 0.6 && entity.getData("tgheroes:dyn/oblivion")
        || entity.getData("tgheroes:dyn/cosmos_song_timer") > 0.6 && entity.getData("tgheroes:dyn/cosmos_song") 
        || entity.getData("tgheroes:dyn/healing_timer") > 0.6 && entity.getData("tgheroes:dyn/healing") ){
		bird.render();
	}
	
    if (entity.getWornHelmet() && !entity.getData("tgheroes:dyn/phoenix") && !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/dark_phoenix")) {
		hair.render();
    }

	
	if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        chest.render();
    }
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && !entity.getInterpolatedData("tgheroes:dyn/phoenix") 
        && !entity.getInterpolatedData("tgheroes:dyn/dark_phoenix") && !entity.getInterpolatedData("tgheroes:dyn/white_phoenix")) {
        alexarm.render();
        alexarm_l.render();
    }
	
	if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/phoenix")) {
        alexarm_p.render();
        alexarm_l_p.render();
    }

    if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/dark_phoenix")) {
        alexarm_dp.render();
        alexarm_l_dp.render();
    }

    if (renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS" && entity.getInterpolatedData("tgheroes:dyn/white_phoenix")) {
        alexarm_wp.render();
        alexarm_l_wp.render();
    }

	if (entity.getInterpolatedData("tgheroes:dyn/phoenix")) {
        coat_p.render();
    }

    if (entity.getInterpolatedData("tgheroes:dyn/dark_phoenix")) {
        coat_dp.render();
    }

    if (entity.getInterpolatedData("tgheroes:dyn/white_phoenix")) {
        coat_wp.render();
    }
	
	if (!isFirstPersonArm && !entity.getData("tgheroes:dyn/phoenix") || !entity.getData("tgheroes:dyn/white_phoenix") || !entity.getData("tgheroes:dyn/dark_phoenix") && renderLayer == "CHESTPLATE") {
			cape.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}
	if (!isFirstPersonArm && entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix") || entity.getData("tgheroes:dyn/dark_phoenix") && renderLayer == "CHESTPLATE") {
			cape2.render(entity, entity.getInterpolatedData("fiskheroes:wing_animation_timer"));
		}


        if(!isFirstPersonArm && renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS"){
            ult.progress =entity.getInterpolatedData("tgheroes:dyn/terror");
            ult.render();
            } 
            
            if(!isFirstPersonArm && renderLayer == "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS"){
                ult2.progress =entity.getInterpolatedData("tgheroes:dyn/crown");
                ult2.render();
                } 
}